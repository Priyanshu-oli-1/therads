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
      {/* Size heading */}
      <h2 className="text-sm font-semibold text-gray-900">
        Size
        {selectedSize && (
          <span className="font-normal">
            : {selectedSize}
          </span>
        )}
      </h2>

      {/* Size buttons */}
      <div className="mt-3 flex flex-wrap gap-2.5">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              aria-pressed={isSelected}
              className={`flex h-10 min-w-11 items-center justify-center border px-4 text-sm font-medium transition ${
                isSelected
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-800 hover:border-black"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}