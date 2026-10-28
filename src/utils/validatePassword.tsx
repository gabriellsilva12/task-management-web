export function validatePassword(password: string): boolean {
  const rules = [
    password.length >= 8 && password.length <= 64,
    !/\s/.test(password),
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  return rules.every(Boolean);
}
