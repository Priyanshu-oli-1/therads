type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}