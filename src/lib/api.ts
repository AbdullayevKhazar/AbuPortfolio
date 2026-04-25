export const API_BASE_URL = "https://api.xab.net.az/api";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
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
    create: `${API_BASE_URL}/education`,
    delete: (id: string) => `${API_BASE_URL}/education/${id}`,
  },
  works: {
    list: `${API_BASE_URL}/my-works`,
    getById: (id: string) => `${API_BASE_URL}/my-works/${id}`,
    add: `${API_BASE_URL}/my-works/add-work`,
    update: (id: string) => `${API_BASE_URL}/my-works/${id}`,
    delete: (id: string) => `${API_BASE_URL}/my-works/${id}`,
  },
} as const;
