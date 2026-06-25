import type { LoginDto, RegisterDto } from "@/features/auth/types";
import { currentUser } from "@/mock-data";
import type {
  LoginResponse,
  MeResponse,
  RefreshResponse,
  RegisterResponse,
} from "./types";
import { randomWait } from "@/utils/wait";

export async function login(data: LoginDto): Promise<LoginResponse> {
  // const res: LoginResponse = await api.post("/auth/login", data);
  const res: LoginResponse = { accessToken: "jwt_token" };
  await randomWait();
  return res;
}

export async function register(data: RegisterDto): Promise<RegisterResponse> {
  // const res = await api.post("/auth/register", data);
  const res: RegisterResponse = { accessToken: "jwt_token" };
  await randomWait();
  return res;
}

export async function me(): Promise<MeResponse> {
  // const res = await api.get("/auth/me");
  const res: MeResponse = { user: currentUser };
  await randomWait();
  return res;
}

export async function refresh(): Promise<RefreshResponse> {
  // const res = await api.post("/auth/refresh");
  const res: RefreshResponse = { accessToken: "jwt_token" };
  await randomWait();
  return res;
}

export async function logout() {
  // await api.post("/auth/logout");
  await randomWait();
}
