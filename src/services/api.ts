import { getAuthToken } from "../utils/storage";

export const API_URL = import.meta.env.VITE_API_URL;

export async function request(path: string, method = "GET", body?: object) {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro na requisição");
  }

  return data;
}