import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./route-paths";

export function ProtectedRoute() {
  const isAuthenticated = true; // Zustand/Auth Context later

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
