import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import FormField from "./FormField.js";
import Button from "./Button.js";

type AuthFormProps = {
  mode: "login" | "register";
};

function AuthForm({ mode }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = mode === "login" ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`http://localhost:3000/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setResult(`Status ${response.status}\n` + JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Erro: " + String(error));
    }
  }

  function toggleMode() {
    navigate(mode === "login" ? "/register" : "/login");
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-200">
          {mode === "register" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-1.5 text-sm text-neutral-300">
          {mode === "register" ? "Start your journey in seconds" : "Sign in to continue"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "register" && (
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

        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Your password"
          password={true}
        />

        <Button type="submit">
          {mode === "register" ? "Create account" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-400">
        {mode === "register" ? "Already have an account? " : "Don't have an account? "}
        <Button
          type="button"
          onClick={toggleMode}
          className="font-medium text-blue-200 underline-offset-4 transition-colors hover:underline cursor-pointer"
        >
          {mode === "register" ? "Sign in" : "Sign up"}
        </Button>
      </p>

      <pre className="mt-6 whitespace-pre-wrap text-xs text-neutral-400">{result}</pre>
    </div>
  );
}

export default AuthForm;