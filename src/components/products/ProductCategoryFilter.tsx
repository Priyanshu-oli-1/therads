"use client";

type ProductCategoryFilterProps = {
  value: string;
  categories: string[];
  onChange: (value: string) => void;
};

export default function ProductCategoryFilter({
  value,
  categories,
  onChange,
}: ProductCategoryFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="product-category"
        className="text-sm font-medium"
      >
        Category
      </label>

      <select
        id="product-category"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border px-3 py-2 text-sm"
      >
        <option value="">All</option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}