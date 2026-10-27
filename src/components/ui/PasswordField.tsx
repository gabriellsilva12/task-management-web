
import { useState } from "react";

type PasswordFieldProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

function PasswordField({
  id = "password",
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  autoComplete = "current-password",
  required = true,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-white"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          className="auth-input pr-12 text-base"
        />

        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-white/50 transition-colors hover:text-lime-cream focus-visible:outline-2 focus-visible:outline-lime-cream"
        >
          {showPassword ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="m3 3 18 18" />
              <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
              <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 8.3 4.5 9 7-.3 1.1-1.1 2.4-2.2 3.5" />
              <path d="M6.2 6.2C3.9 7.6 2.4 10 2 12c.7 2.5 4 7 10 7 1.1 0 2.1-.2 3-.5" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
