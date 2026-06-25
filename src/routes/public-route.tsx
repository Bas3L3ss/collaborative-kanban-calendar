import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./route-paths";

export function PublicRoute() {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
