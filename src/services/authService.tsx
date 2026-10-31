import { API_URL } from "./api";

type AuthCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = AuthCredentials & {
  name: string;
};

export async function loginUser(credentials: AuthCredentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data.message || data.error || `Request failed (${response.status})`;

    throw new Error(message);
  }
  return data;
}

export async function registerUser(credentials: RegisterCredentials) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data.message || data.error || `Request failed (${response.status})`;

    throw new Error(message);
  }

  return data;
}
