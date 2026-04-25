export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AdminAuthState {
  accessToken: string;
  refreshToken: string;
  user: AdminUser;
}

const ADMIN_AUTH_STORAGE_KEY = "abu_admin_auth";

export const saveAdminAuth = (auth: AdminAuthState) => {
  localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const getAdminAuth = (): AdminAuthState | null => {
  const rawAuth = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
  if (!rawAuth) return null;

  try {
    return JSON.parse(rawAuth) as AdminAuthState;
  } catch {
    return null;
  }
};

export const clearAdminAuth = () => {
  localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
};

export const isAdminAuthenticated = () => {
  const auth = getAdminAuth();
  return Boolean(auth?.accessToken && auth.user?.role === "admin");
};
