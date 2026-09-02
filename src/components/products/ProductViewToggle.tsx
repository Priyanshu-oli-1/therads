"use client";

type ProductViewToggleProps = {
  value: "grid-3" | "grid-4";
  onChange: (
    value: "grid-3" | "grid-4"
  ) => void;
};

export default function ProductViewToggle({
  value,
  onChange,
}: ProductViewToggleProps) {
  return (
    <div className="flex items-center gap-1">

      {/* Three-column layout */}
      <button
        type="button"
        onClick={() =>
          onChange("grid-3")
        }
        aria-label="Three column product view"
        aria-pressed={value === "grid-3"}
        className={`flex h-7 w-7 items-center justify-center border transition ${
          value === "grid-3"
            ? "bg-gray-100 text-black"
            : "text-gray-400 hover:bg-gray-50"
        }`}
      >
        <span className="grid grid-cols-2 gap-[2px]">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <i
              key={index}
              className="h-1.5 w-1.5 bg-current"
            />
          ))}
        </span>
      </button>

      {/* Four-column layout */}
      <button
        type="button"
        onClick={() =>
          onChange("grid-4")
        }
        aria-label="Four column product view"
        aria-pressed={value === "grid-4"}
        className={`flex h-7 w-7 items-center justify-center border transition ${
          value === "grid-4"
            ? "bg-gray-100 text-black"
            : "text-gray-400 hover:bg-gray-50"
        }`}
      >
        <span className="grid grid-cols-3 gap-[2px]">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <i
              key={index}
              className="h-1.5 w-1.5 bg-current"
            />
          ))}
        </span>
      </button>
    </div>
  );
}