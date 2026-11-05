export function getAuthToken(): string | null {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser).token ?? null;
  } catch {
    return null;
  }
}