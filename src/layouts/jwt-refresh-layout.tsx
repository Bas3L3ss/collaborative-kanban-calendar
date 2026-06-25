import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { me, refresh } from "@/services/auth/auth.service";
import { PageLoader } from "@/App";
import { queryClient } from "@/api/query-client";

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const res = await refresh();
        setAccessToken(res.accessToken);

        const user = await me();

        queryClient.setQueryData(["me"], user);
      } catch {
        // not logged in → fine
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [setAccessToken]);

  if (loading) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
