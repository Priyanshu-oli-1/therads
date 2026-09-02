"use client";

type CartQuantityProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function CartQuantity({
  quantity,
  onDecrease,
  onIncrease,
}: CartQuantityProps) {
  return (
    <div className="flex h-10 w-24 items-center justify-between overflow-hidden rounded-md border border-gray-300 bg-white">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-full w-8 items-center justify-center text-lg text-gray-500 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span className="text-sm font-medium text-gray-700">
        {String(quantity).padStart(2, "0")}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="flex h-full w-8 items-center justify-center text-lg text-gray-500 transition hover:text-black"
      >
        +
      </button>
    </div>
  );
}