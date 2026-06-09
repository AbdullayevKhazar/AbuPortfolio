import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { apiClient, API_ENDPOINTS } from "../lib/api";
import {
  clearAdminAuth,
  getAdminAuth,
  saveAdminAuth,
} from "../utils/adminAuth";

interface RequireAdminProps {
  children: React.ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const [status, setStatus] = useState<"checking" | "allowed" | "denied">(
    "checking",
  );

  useEffect(() => {
    const auth = getAdminAuth();
    if (
      !auth?.accessToken ||
      !["admin", "superadmin"].includes(auth.user.role)
    ) {
      setStatus("denied");
      return;
    }

    apiClient
      .get<{ user: typeof auth.user }>(API_ENDPOINTS.auth.me)
      .then(({ data }) => {
        if (!["admin", "superadmin"].includes(data.user.role)) {
          throw new Error("Admin access is required");
        }
        saveAdminAuth({ ...auth, user: data.user });
        setStatus("allowed");
      })
      .catch(() => {
        clearAdminAuth();
        setStatus("denied");
      });
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-7 animate-spin" aria-label="Checking session" />
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default RequireAdmin;
