"use client";

type GiftWrapProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export default function GiftWrap({
  enabled,
  onChange,
}: GiftWrapProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-gray-600">
      <span>Gift wrap</span>

      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 cursor-pointer accent-black"
        />
        <span>₹10.00</span>
      </span>
    </label>
  );
}