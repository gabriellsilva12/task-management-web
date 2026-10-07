import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import FormField from "../ui/FormField";

type AuthFormProps = {
  mode: "login" | "register";
};

function AuthForm({ mode }: AuthFormProps) {
  const [authMode, setAuthMode] = useState(mode);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload =
      authMode === "login" ? { email, password } : { name, email, password };
    console.log(authMode === "login" ? "Logging in:" : "Registering:", payload);
  }

  function toggleAuthMode() {
    setAuthMode((m) => (m === "register" ? "login" : "register"));
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
          {authMode === "register" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-1.5 text-sm text-neutral-300">
          {authMode === "register"
            ? "Start your journey in seconds"
            : "Sign in to continue"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {authMode === "register" && (
          <FormField
            label="Name"
            type="text"
            value={name}
            onChange={setName}
            placeholder="John Doe"
          />
        )}

        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-300">
              Password
            </label>
            {authMode === "login" && (
              <button
                type="button"
                className="text-xs text-neutral-500 transition-colors hover:text-neutral-100"
              >
                Forgot?
              </button>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
              className="
                w-full rounded-lg border border-neutral-200 bg-white
                px-3.5 py-2.5 pr-10 text-sm text-neutral-900
                placeholder:text-neutral-400
                transition-colors
                focus:border-neutral-900 focus:outline-none
                focus:ring-4 focus:ring-neutral-900/5
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                flex h-7 w-7 items-center justify-center rounded-md
                text-neutral-400 transition-colors
                hover:bg-neutral-100 hover:text-neutral-700
              "
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            mt-2 w-full cursor-pointer rounded-lg bg-neutral-900
            px-4 py-2.5 text-sm font-medium text-white
            transition-all duration-150
            hover:bg-neutral-800
            active:scale-[0.98] active:bg-neutral-950
            focus-visible:outline-none focus-visible:ring-4
            focus-visible:ring-neutral-900/10
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {authMode === "register" ? "Create account" : "Sign in"}
        </button>
      </form>

      {/* Toggle */}
      <p className="mt-6 text-center text-sm text-neutral-400">
        {authMode === "register"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={toggleAuthMode}
          className="font-medium text-blue-200 underline-offset-4 transition-colors hover:underline cursor-pointer"
        >
          {authMode === "register" ? "Sign in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;