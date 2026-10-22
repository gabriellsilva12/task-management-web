import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type FormFieldProps = {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  error?: string;
  password?: boolean;
};

function FormField({
  password = false,
  label,
  type,
  value,
  placeholder,
  onChange,
  error,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col">
      <label className="text-sm text-neutral-300 mb-1">{label}</label>

      {!password && (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className={`
                  w-full rounded-lg border border-neutral-200 bg-white
                  px-3.5 py-2.5 pr-10 text-sm text-neutral-900
                  placeholder:text-neutral-400
                  transition-colors
                  focus:border-neutral-900 focus:outline-none
                  focus:ring-4 focus:ring-neutral-900/5 relative
                  ${error ? "border-red-500" : "border-neutral-200"}`}
          placeholder={placeholder}
        />
      )}

      {password === true && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={(e) => onChange(e.target.value)}
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
                hover:bg-neutral-100 hover:text-neutral-700 cursor-pointer
              "
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
      )}

      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default FormField;
