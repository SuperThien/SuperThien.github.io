import { api } from "./axios";

export type AuthUser = {
  id: string;
  username: string;
  roles: string[];
  fullName?: string;
};

export const authApi = {
  register: (payload: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
  }) => api.post("/auth/register", payload), // 201

  login: (payload: {
    username: string;
    password: string;
    remember?: boolean;
  }) => api.post<{ user: AuthUser }>("/auth/login", payload), // 200 + { user }

  logout: () => api.post("/auth/logout"), // 204
};
