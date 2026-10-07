type FormFieldProps = {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

function FormField({
  label,
  type,
  value,
  placeholder,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-neutral-300 mb-1">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="
                w-full rounded-lg border border-neutral-200 bg-white
                px-3.5 py-2.5 pr-10 text-sm text-neutral-900
                placeholder:text-neutral-400
                transition-colors
                focus:border-neutral-900 focus:outline-none
                focus:ring-4 focus:ring-neutral-900/5
              "
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormField;
