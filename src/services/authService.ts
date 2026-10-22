const API_URL = "http://localhost:3000";

async function request(path: string, body: unknown) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Erro ${response.status}`);
  }

  return data;
}

function login(email: string, password: string) {
  return request("/auth/login", { email, password }); ///
}

function register(name: string, email: string, password: string) {
  return request("/auth/register", { name, email, password });
}

export default { login, register}