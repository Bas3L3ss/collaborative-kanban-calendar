import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./route-paths";
import { useAuthStore } from "@/store/auth-store";

export function PublicRoute() {
  const token = useAuthStore((s) => s.accessToken);

  if (token) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
