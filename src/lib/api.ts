import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  clearAdminAuth,
  getAdminAuth,
  saveAdminAuth,
} from "../utils/adminAuth";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.xab.net.az/api";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    signup: `${API_BASE_URL}/auth/register`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    me: `${API_BASE_URL}/auth/me`,
  },
  contact: {
    create: `${API_BASE_URL}/contact`,
  },
  skills: {
    list: `${API_BASE_URL}/skills`,
    getById: (id: string) => `${API_BASE_URL}/skills/${id}`,
    add: `${API_BASE_URL}/skills/add-skill`,
    update: (id: string) => `${API_BASE_URL}/skills/update/${id}`,
    delete: (id: string) => `${API_BASE_URL}/skills/delete/${id}`,
  },
  experience: {
    list: `${API_BASE_URL}/experience`,
    getById: (id: string) => `${API_BASE_URL}/experience/${id}`,
    create: `${API_BASE_URL}/experience`,
    update: (id: string) => `${API_BASE_URL}/experience/${id}`,
    delete: (id: string) => `${API_BASE_URL}/experience/${id}`,
  },
  education: {
    list: `${API_BASE_URL}/education`,
    getById: (id: string) => `${API_BASE_URL}/education/${id}`,
    create: `${API_BASE_URL}/education`,
    update: (id: string) => `${API_BASE_URL}/education/${id}`,
    delete: (id: string) => `${API_BASE_URL}/education/${id}`,
  },
  works: {
    list: `${API_BASE_URL}/my-works`,
    featured: `${API_BASE_URL}/my-works?featured=true&limit=6`,
    getById: (id: string) => `${API_BASE_URL}/my-works/${id}`,
    add: `${API_BASE_URL}/my-works/add-work`,
    update: (id: string) => `${API_BASE_URL}/my-works/${id}`,
    delete: (id: string) => `${API_BASE_URL}/my-works/${id}`,
  },
} as const;

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const auth = getAdminAuth();
  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

let refreshRequest: Promise<string> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetryableRequest | undefined;
    const auth = getAdminAuth();
    const isAuthRequest =
      request?.url === API_ENDPOINTS.auth.login ||
      request?.url === API_ENDPOINTS.auth.signup ||
      request?.url === API_ENDPOINTS.auth.refresh;

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retry ||
      !auth?.refreshToken ||
      isAuthRequest
    ) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      refreshRequest ??= axios
        .post<{ accessToken: string }>(API_ENDPOINTS.auth.refresh, {
          refreshToken: auth.refreshToken,
        })
        .then((response) => response.data.accessToken)
        .finally(() => {
          refreshRequest = null;
        });

      const accessToken = await refreshRequest;
      saveAdminAuth({ ...auth, accessToken });
      request.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(request);
    } catch (refreshError) {
      clearAdminAuth();
      if (window.location.pathname.startsWith("/admin")) {
        window.location.assign("/admin/login");
      }
      return Promise.reject(refreshError);
    }
  },
);

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback;
  }

  return fallback;
};
