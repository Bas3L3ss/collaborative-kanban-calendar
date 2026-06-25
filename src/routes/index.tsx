import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "@/layouts/app-layout";
import { AuthLayout } from "@/layouts/auth-layout";
import { ROUTES } from "@/routes/route-paths";
import { ProtectedRoute } from "./protected-route";
import { PublicRoute } from "./public-route";

const DashboardPage = lazy(() =>
  import("@/pages/dashboard-page").then((m) => ({ default: m.DashboardPage })),
);
const BoardPage = lazy(() =>
  import("@/pages/board-page").then((m) => ({ default: m.BoardPage })),
);
const CalendarPage = lazy(() =>
  import("@/pages/calendar-page").then((m) => ({ default: m.CalendarPage })),
);
const NotificationsPage = lazy(() =>
  import("@/pages/notifications-page").then((m) => ({
    default: m.NotificationsPage,
  })),
);
const ActivityPage = lazy(() =>
  import("@/pages/activity-page").then((m) => ({ default: m.ActivityPage })),
);
const SettingsPage = lazy(() =>
  import("@/pages/settings-page").then((m) => ({ default: m.SettingsPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/login-page").then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import("@/pages/register-page").then((m) => ({ default: m.RegisterPage })),
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.BOARD} element={<BoardPage />} />
          <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
          <Route path={ROUTES.ACTIVITY} element={<ActivityPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}
