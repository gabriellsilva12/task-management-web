type ButtonProps = {
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  type = "button",
  children,
  className: moreStyle,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        moreStyle
          ? moreStyle
          : `
             mt-2 w-full cursor-pointer rounded-lg bg-neutral-900
             px-4 py-2.5 text-sm font-medium text-white
             transition-all duration-150
             hover:bg-neutral-800
             active:scale-[0.98] active:bg-neutral-950
             focus-visible:outline-none focus-visible:ring-4
             focus-visible:ring-neutral-900/10
             disabled:cursor-not-allowed disabled:opacity-50
           `
      }
    >
      {children}
    </button>
  );
}
