"use client";

type QuantitySelectorProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export default function QuantitySelector({
  quantity,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex h-11 w-full items-center justify-between border border-gray-200 sm:w-[118px]">
      {/* Decrease quantity */}
      <button
        type="button"
        onClick={() =>
          onChange(Math.max(1, quantity - 1))
        }
        aria-label="Decrease quantity"
        className="flex h-full w-10 items-center justify-center text-gray-600 transition hover:text-black"
      >
        −
      </button>

      {/* Current quantity */}
      <span className="text-sm font-medium text-gray-900">
        {quantity}
      </span>

      {/* Increase quantity */}
      <button
        type="button"
        onClick={() =>
          onChange(quantity + 1)
        }
        aria-label="Increase quantity"
        className="flex h-full w-10 items-center justify-center text-gray-600 transition hover:text-black"
      >
        +
      </button>
    </div>
  );
}