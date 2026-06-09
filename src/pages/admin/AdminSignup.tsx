import { type FormEvent, useState } from "react";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";
import { isAdminAuthenticated, saveAdminAuth } from "../../utils/adminAuth";

interface SignupResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

const AdminSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    signupKey: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await apiClient.post<SignupResponse>(
        API_ENDPOINTS.auth.signup,
        {
          username: form.username,
          email: form.email,
          password: form.password,
          signupKey: form.signupKey,
        },
      );
      saveAdminAuth(data);
      navigate("/admin", { replace: true });
    } catch (signupError) {
      setError(getApiErrorMessage(signupError, "Account creation failed."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 md:p-8">
        <div className="mb-6 flex size-11 items-center justify-center rounded-xl bg-blue-600 text-white">
          <UserPlus className="size-5" />
        </div>
        <h1 className="text-2xl font-bold">Create admin account</h1>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          The private signup key is required to create an administrator.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-1 text-sm font-medium">
            Username
            <input
              value={form.username}
              onChange={(event) =>
                setForm({ ...form, username: event.target.value })
              }
              minLength={3}
              maxLength={40}
              required
              autoComplete="username"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block space-y-1 text-sm font-medium">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              required
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block space-y-1 text-sm font-medium">
            Password
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                minLength={8}
                required
                autoComplete="new-password"
                className="w-full rounded-md border border-input bg-background px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </label>

          <label className="block space-y-1 text-sm font-medium">
            Confirm password
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(event) =>
                setForm({ ...form, confirmPassword: event.target.value })
              }
              minLength={8}
              required
              autoComplete="new-password"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="block space-y-1 text-sm font-medium">
            Admin signup key
            <input
              type="password"
              value={form.signupKey}
              onChange={(event) =>
                setForm({ ...form, signupKey: event.target.value })
              }
              required
              autoComplete="off"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-600 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Creating...
              </span>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <Link
          to="/admin/login"
          className="mt-5 inline-block text-sm text-blue-600 hover:underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default AdminSignup;
