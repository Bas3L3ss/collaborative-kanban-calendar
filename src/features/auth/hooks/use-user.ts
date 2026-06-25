// features/auth/hooks/use-user.ts

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import { me } from "@/services/auth/auth.service";

const fiveMins = 1000 * 60 * 5;

export function useUser() {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ["me"],
    queryFn: me,
    enabled: !!token,
    staleTime: fiveMins,
    retry: false,
  });
}
