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
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() =>
          onChange(Math.max(1, quantity - 1))
        }
        aria-label="Decrease quantity"
        className="border px-3 py-1"
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        type="button"
        onClick={() =>
          onChange(quantity + 1)
        }
        aria-label="Increase quantity"
        className="border px-3 py-1"
      >
        +
      </button>
    </div>
  );
}