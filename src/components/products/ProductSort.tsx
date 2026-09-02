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
    <label className="flex items-center">
      <span className="sr-only">
        Sort products
      </span>

      <select
        id="product-sort"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="min-w-[105px] cursor-pointer appearance-none bg-transparent text-[10px] font-medium text-gray-800 outline-none"
        aria-label="Sort products"
      >
        <option value="">
          Best selling
        </option>

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
    </label>
  );
}