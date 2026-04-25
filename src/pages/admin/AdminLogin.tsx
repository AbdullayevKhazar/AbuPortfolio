import { type FormEvent, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  clearAdminAuth,
  isAdminAuthenticated,
  saveAdminAuth,
} from "../../utils/adminAuth";
import { API_ENDPOINTS } from "../../lib/api";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post<LoginResponse>(API_ENDPOINTS.auth.login, {
        email,
        password,
      });

      if (response.data.user.role !== "admin") {
        clearAdminAuth();
        navigate("/404", { replace: true });
        return;
      }

      saveAdminAuth({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
      });

      navigate("/admin", { replace: true });
    } catch {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-background text-foreground">
      <div className="w-full max-w-md rounded-xl border border-border p-6 md:p-8 bg-card">
        <h1 className="text-2xl font-bold mb-1">Admin Login</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Login to access the admin panel.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link
          to="/"
          className="inline-block mt-5 text-sm underline underline-offset-4"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
