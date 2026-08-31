"use client";

type ProductSortProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProductSort({
  value,
  onChange,
}: ProductSortProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="product-sort"
        className="text-sm font-medium"
      >
        Sort by
      </label>

      <select
        id="product-sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border px-3 py-2 text-sm"
      >
        <option value="">Default</option>
        <option value="price-asc">
          Price: Low to High
        </option>
        <option value="price-desc">
          Price: High to Low
        </option>
        <option value="name-asc">
          Name: A to Z
        </option>
        <option value="name-desc">
          Name: Z to A
        </option>
      </select>
    </div>
  );
}