import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
