"use client";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProductSearch({
  value,
  onChange,
}: ProductSearchProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="product-search"
        className="sr-only"
      >
        Search products
      </label>

      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        className="w-full rounded-md border px-4 py-3 outline-none focus:ring-2"
      />
    </div>
  );
}