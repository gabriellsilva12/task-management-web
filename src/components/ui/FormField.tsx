type FormFieldProps = {
  id: string;
  label: string;
  name: string;
  type: "text" | "email";
  placeholder: string;
  autoComplete?: string;
};

export default function FormField({
  id,
  name,
  label,
  placeholder,
  type,
  autoComplete,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="auth-input text-base"
      />
    </div>
  );
}
