import type { User } from "@/features/auth/types";

export type LoginResponse = {
  accessToken: string;
};

export type RegisterResponse = {
  accessToken: string;
};

export type RefreshResponse = {
  accessToken: string;
};

export type MeResponse = {
  user: User;
};
