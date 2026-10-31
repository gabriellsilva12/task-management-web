import { Link, useNavigate } from "react-router-dom";
import FormField from "../ui/FormField";
import PasswordField from "../ui/PasswordField";
import Button from "../ui/Button";
import { loginUser, registerUser } from "../../services/authService";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      if (isRegister) {
        await registerUser({ name, email, password });

        setSuccess("Account created successfully!");
      } else {
        const res = await loginUser({ email, password });

        localStorage.setItem("user", JSON.stringify(res));

        console.log(res);

        setSuccess("Login successful!");
        navigate("/tasks");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="background-gradient-radial flex items-center justify-center px-3 py-6 sm:px-6 sm:py-10">
      <section
        className={`auth-card auth-card--${mode} w-full max-w-md overflow-hidden rounded-2xl`}
      >
        <header className="px-4 pt-7 pb-6 text-center sm:px-6 sm:pt-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-cream/20 bg-black/60">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-lime-cream"
              aria-hidden="true"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            To-Do List
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {isRegister
              ? "Create your account and get organized."
              : "Organize your tasks. Focus on what matters."}
          </p>
        </header>

        <div className="mx-4 flex rounded-full border border-white/10 bg-black/50 p-1 sm:mx-6">
          <Link
            to="/login"
            aria-current={mode === "login" ? "page" : undefined}
            className={`min-w-0 flex-1 rounded-full px-2 py-3 text-center text-sm font-semibold transition-all duration-200 sm:px-4 ${
              mode === "login"
                ? "bg-lime-cream text-black shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Login
          </Link>

          <Link
            to="/register"
            aria-current={mode === "register" ? "page" : undefined}
            className={`min-w-0 flex-1 rounded-full px-2 py-3 text-center text-sm font-semibold transition-all duration-200 sm:px-4 ${
              mode === "register"
                ? "bg-lime-cream text-black shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Create account
          </Link>
        </div>
        <div
          key={mode}
          className={`auth-form-content auth-form-content--${mode}`}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-4 pt-7 pb-7 sm:px-6 sm:pb-8"
          >
            {error && (
              <p className="text-center text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {success && (
              <p className="text-center text-sm text-lime-300" role="status">
                {success}
              </p>
            )}

            {isRegister && (
              <FormField
                id="name"
                name="name"
                label="Name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
              />
            )}

            <FormField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />

            <PasswordField
              mode={isRegister}
              autoComplete={isRegister ? "new-password" : "current-password"}
            />

            <Button
              type="submit"
              className="auth-submit w-full flex justify-center"
              disabled={loading ? true : false}
            >
              {loading ? (
                <LoaderCircle className="animate-spin duration-1000" />
              ) : isRegister ? (
                "Create account →"
              ) : (
                "Sign in →"
              )}
            </Button>

            <p className="text-center text-xs leading-relaxed text-white/50">
              {isRegister
                ? "Start building better habits, one task at a time."
                : "One task at a time. One step closer to your goals."}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AuthForm;
