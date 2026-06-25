import axios from "axios";
import { useAuthStore } from "@/store/auth-store";
import { refresh } from "@/services/auth/auth.service";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let queue: any[] = [];

function processQueue(token: string | null) {
  queue.forEach((p) => {
    if (token) p.resolve(token);
    else p.reject();
  });

  queue = [];
}

// Request interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      });
    }

    isRefreshing = true;

    try {
      const res = await refresh();

      useAuthStore.getState().setAccessToken(res.accessToken);

      processQueue(res.accessToken);

      original.headers.Authorization = `Bearer ${res.accessToken}`;

      return api(original);
    } catch (err) {
      processQueue(null);
      useAuthStore.getState().clearAccessToken();

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
