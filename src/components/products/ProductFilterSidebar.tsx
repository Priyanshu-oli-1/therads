"use client";

type ProductFilterSidebarProps = {
  search: string;
  category: string;
  price: string;

  categories: string[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onClear: () => void;
};

// Sizes shown in the Figma design.
const sizes = ["S", "M", "L", "XL"];

// Visual color palette from the reference design.
const colors = [
  "#ff6b6b",
  "#ff9f43",
  "#feca57",
  "#48dbfb",
  "#1dd1a1",
  "#54a0ff",
  "#5f27cd",
  "#ff6bcb",
  "#00d2d3",
  "#576574",
  "#341f97",
  "#ff7979",
];

// Existing price filtering is connected to ProductList.
const priceRanges = [
  {
    label: "₹0–₹1,000",
    value: "0-1000",
  },
  {
    label: "₹1,000–₹2,000",
    value: "1000-2000",
  },
  {
    label: "₹2,000–₹3,000",
    value: "2000-3000",
  },
  {
    label: "₹3,000–₹5,000",
    value: "3000-5000",
  },
  {
    label: "₹5,000–₹10,000",
    value: "5000-10000",
  },
];

export default function ProductFilterSidebar({
  search,
  category,
  price,
  categories,
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  onClear,
}: ProductFilterSidebarProps) {
  return (
    <aside className="w-full shrink-0 lg:w-[220px]">
      {/* Keep the filter panel visible while scrolling on desktop. */}
      <div className="lg:sticky lg:top-8">

        {/* =====================================================
            FILTER HEADER
        ====================================================== */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-gray-900">
            Filters
          </h2>

          {/* Show Clear only when a filter is currently active. */}
          {(search || category || price) && (
            <button
              type="button"
              onClick={onClear}
              className="text-[11px] font-medium text-gray-400 underline underline-offset-4 transition hover:text-black"
            >
              Clear
            </button>
          )}
        </div>

        {/* =====================================================
            SEARCH
        ====================================================== */}
        <div className="mt-3">
          <label
            htmlFor="store-search"
            className="text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <div className="relative mt-2 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black">
            <input
              id="store-search"
              type="search"
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search products"
              className="w-full border-0 border-b border-gray-300 bg-transparent py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black"
            />
          </div>
        </div>

        {/* =====================================================
            SIZE
        ====================================================== */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">
            Size
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                className="flex h-9 min-w-9 items-center justify-center border border-gray-200 bg-white px-2.5 text-xs font-medium text-gray-600 transition hover:border-black hover:text-black"
                aria-label={`Filter by size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            COLORS
        ====================================================== */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">
            Colors
          </h3>

          <div className="mt-3 grid grid-cols-8 gap-x-3 gap-y-3">
            {colors.map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="h-6 w-6 rounded-full ring-1 ring-gray-200 ring-offset-1"
                style={{
                  backgroundColor: color,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* =====================================================
            PRICE
        ====================================================== */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">
            Prices
          </h3>

          <div className="mt-3 space-y-2">
            {priceRanges.map((range) => {
              const isActive = price === range.value;

              return (
                <button
                  key={range.value}
                  type="button"
                  onClick={() =>
                    onPriceChange(
                      isActive ? "" : range.value
                    )
                  }
                  className={`block text-left text-xs transition ${
                    isActive
                      ? "font-semibold text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            BRANDS
        ====================================================== */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Brands
            </h3>

            {/* Visual collapse indicator from the reference design. */}
            <span
              className="text-sm leading-none text-gray-400"
              aria-hidden="true"
            >
              ⌃
            </span>
          </div>

          <div className="mt-3 space-y-1.5 text-xs leading-5 text-gray-500">
            <p>
              Minimo&nbsp;&nbsp;&nbsp; Retroile  &nbsp;&nbsp;  Brook
            </p>

            <p>
              Levi&apos;s&nbsp;&nbsp;&nbsp; Vagabond&nbsp;&nbsp;&nbsp; Abby
            </p>
          </div>
        </div>

        {/* =====================================================
            COLLECTIONS
        ====================================================== */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Collections
            </h3>

            {/* Visual collapse indicator from the reference design. */}
            <span
              className="text-sm leading-none text-gray-400"
              aria-hidden="true"
            >
              ⌃
            </span>
          </div>

          <div className="mt-3 space-y-2">
            {/* All products */}
            <button
              type="button"
              onClick={() => onCategoryChange("")}
              className={`block text-left text-sm transition ${
                !category
                  ? "font-medium text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              All products
            </button>

            {/* Existing categories are displayed as collections. */}
            {categories.slice(0, 5).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onCategoryChange(item)}
                className={`block max-w-full truncate text-left text-sm transition ${
                  category === item
                    ? "font-medium text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            TAGS
        ====================================================== */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">
            Tags
          </h3>

          <div className="mt-3 text-sm leading-6 text-gray-500">
            <p>
              Fashion&nbsp;&nbsp;&nbsp; Hats&nbsp;&nbsp;&nbsp; Sandal
            </p>

            <p>
              Belt&nbsp;&nbsp;&nbsp; Bags&nbsp;&nbsp;&nbsp; Sneaker
            </p>

            <p>
              Denim&nbsp;&nbsp;&nbsp; Minimal&nbsp;&nbsp;&nbsp; Vagabond
            </p>

            <p>
              Sunglasses&nbsp;&nbsp;&nbsp; Beachwear
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}