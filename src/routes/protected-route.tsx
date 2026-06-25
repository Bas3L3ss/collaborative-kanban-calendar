import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const token = useAuthStore((s) => s.accessToken);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
