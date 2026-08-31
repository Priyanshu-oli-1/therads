"use client";

type SizeSelectorProps = {
  selectedSize: string;
  onChange: (size: string) => void;
};

const sizes = ["S", "M", "L", "XL"];

export default function SizeSelector({
  selectedSize,
  onChange,
}: SizeSelectorProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold">
        Select Size
      </h2>

      <div className="mt-3 flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            aria-pressed={selectedSize === size}
            className={`rounded-md border px-5 py-2 text-sm font-medium ${
              selectedSize === size
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {selectedSize
          ? `Selected size: ${selectedSize}`
          : "Please select a size."}
      </p>
    </div>
  );
}