import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/auth/auth.service";

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
