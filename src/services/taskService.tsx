import { API_URL } from "./api";

type AuthCredentials = {
  title: string;
  description: string;
};

export async function getTasks() {
  try {
    const storedUser = localStorage.getItem("user");

    let authData;

    if (storedUser) {
      authData = JSON.parse(storedUser);
    }

    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
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
  } catch (error) {
    console.log(error);
  }
}

export async function createTask(credentials: AuthCredentials) {
  const storedUser = localStorage.getItem("user");

  let authData;

  if (storedUser) {
    authData = JSON.parse(storedUser);
  }

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.token}`,
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
