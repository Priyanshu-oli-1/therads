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
    <div className="flex items-center border">
      <button
        onClick={onDecrease}
        className="px-3 py-2"
      >
        -
      </button>

      <span className="px-3">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="px-3 py-2"
      >
        +
      </button>
    </div>
  );
}