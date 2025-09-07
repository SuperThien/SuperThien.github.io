import axios from "axios";

const BASE = import.meta.env.VITE_API ?? "http://localhost:3000";
export const http = axios.create({
  baseURL: `${BASE}/api`,
  withCredentials: false,
});
