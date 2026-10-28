import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { validatePassword } from "../../utils/validatePassword";

type PasswordFieldProps = {
  mode?: boolean;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  onChange?: (password: string) => void;
  onValidityChange?: (isValid: boolean) => void;
};

function PasswordField({
  mode = false,
  id = "password",
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  autoComplete = "current-password",
  required = true,
  onChange,
  onValidityChange,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const hasStartedTyping = passwordValue.length > 0;

  const rules = [
    {
      label: "Must be between 8 and 64 characters",
      valid: passwordValue.length >= 8 && passwordValue.length <= 64,
    },
    {
      label: "Cannot contain spaces",
      valid: !/\s/.test(passwordValue),
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(passwordValue),
    },
    {
      label: "At least one lowercase letter",
      valid: /[a-z]/.test(passwordValue),
    },
    {
      label: "At least one number",
      valid: /[0-9]/.test(passwordValue),
    },
    {
      label: "At least one special character",
      valid: /[^A-Za-z0-9]/.test(passwordValue),
    },
  ];

  function handlePasswordChange(value: string) {
    setPasswordValue(value);
    onChange?.(value);
    onValidityChange?.(validatePassword(value));
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>

      {mode && (
        <ul
          id={`${id}-requirements`}
          className="list-disc list-inside space-y-2"
        >
          {rules.map((rule) => (
            <li
              key={rule.label}
              className={
                !hasStartedTyping
                  ? "text-white/50"
                  : rule.valid
                    ? "text-lime-cream"
                    : "text-red-400"
              }
            >
              {rule.label}
            </li>
          ))}
        </ul>
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={passwordValue}
          onChange={(event) => handlePasswordChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={hasStartedTyping && !validatePassword(passwordValue)}
          aria-describedby={mode ? `${id}-requirements` : undefined}
          className="auth-input w-full pr-14 text-base"
        />

        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-white/60 transition-colors hover:text-lime-cream focus-visible:outline-2 focus-visible:outline-lime-cream"
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
