import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/adminAuth";

interface RequireAdminProps {
  children: React.ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default RequireAdmin;
