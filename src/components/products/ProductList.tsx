"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Product } from "@/types/product";

import ProductPagination from "./ProductPagination";
import ProductsCard from "./ProductsCard";
import ProductSort from "./ProductSort";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductViewToggle from "./ProductViewToggle";

type ProductListProps = {
  products: Product[];
  total: number;

  initialSearch?: string;
  initialCategory?: string;
  initialSort?: string;
  initialPrice?: string;

  initialPage?: number;
  initialItemsPerPage?: number;
};

const allowedLimits = [4, 8, 12];

type ViewMode = "grid-3" | "grid-4";

export default function ProductList({
  products,
  total,

  initialSearch = "",
  initialCategory = "",
  initialSort = "",
  initialPrice = "",

  initialPage = 1,
  initialItemsPerPage = 4,
}: ProductListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Current Store controls.
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [price, setPrice] = useState(initialPrice);

  // Pagination state.
  const [page, setPage] = useState(Math.max(1, initialPage));

  const [itemsPerPage, setItemsPerPage] = useState(
    allowedLimits.includes(initialItemsPerPage) ? initialItemsPerPage : 4,
  );

  // Grid layout state.
  const [view, setView] = useState<ViewMode>("grid-3");

  // Prevent an API request on every search keystroke.
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Get unique categories from the products currently available from the API.
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  // Update the URL without reloading the page.
  const updateUrl = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  // Keep React state synchronized with the URL.
  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setCategory(searchParams.get("category") ?? "");
    setSort(searchParams.get("sort") ?? "");
    setPrice(searchParams.get("price") ?? "");

    const urlPage = Number(searchParams.get("page") ?? "1");

    setPage(Number.isFinite(urlPage) ? Math.max(1, urlPage) : 1);

    const urlLimit = Number(searchParams.get("limit") ?? "4");

    setItemsPerPage(allowedLimits.includes(urlLimit) ? urlLimit : 4);
  }, [searchParams]);

  // Reset every Store filter.
  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
    setPrice("");
    setPage(1);
    setItemsPerPage(4);

    router.replace(pathname);
  };

  // Filtering/search/sorting are handled by the API.
  // Only pagination is handled here over the limited fetched result.
  const filteredAndSortedProducts = products;

  const totalPages = Math.ceil(total / itemsPerPage);

  const safePage = Math.min(
    Math.max(page, 1),
    Math.max(totalPages, 1),
  );

  const startIndex = (safePage - 1) * itemsPerPage;

  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const startProduct =
    filteredAndSortedProducts.length === 0
      ? 0
      : startIndex + 1;

  const endProduct =
    filteredAndSortedProducts.length === 0
      ? 0
      : Math.min(
          startIndex + itemsPerPage,
          filteredAndSortedProducts.length,
        );

  // Prevent an invalid page after filtering.
  useEffect(() => {
    const maximumPage = Math.max(totalPages, 1);

    if (page > maximumPage) {
      setPage(maximumPage);

      updateUrl({
        page: maximumPage === 1 ? "" : String(maximumPage),
      });
    }
  }, [page, totalPages]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-14">
      {/* --------------------------------
          LEFT: FILTER SIDEBAR
      -------------------------------- */}
      <ProductFilterSidebar
        search={search}
        category={category}
        price={price}
        categories={categories}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);

          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }

          searchTimeoutRef.current = setTimeout(() => {
            updateUrl({
              search: value,
              page: "",
            });
          }, 350);
        }}
        onCategoryChange={(value) => {
          setCategory(value);
          setPage(1);

          updateUrl({
            category: value,
            page: "",
          });
        }}
        onPriceChange={(value) => {
          setPrice(value);
          setPage(1);

          updateUrl({
            price: value,
            page: "",
          });
        }}
        onClear={clearFilters}
      />

      {/* --------------------------------
          RIGHT: PRODUCTS
      -------------------------------- */}
      <section className="min-w-0 flex-1">
        {/* Top toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-gray-500 md:text-sm">
              Sort by
            </span>

            <ProductSort
              value={sort}
              onChange={(value) => {
                setSort(value);
                setPage(1);

                updateUrl({
                  sort: value,
                  page: "",
                });
              }}
            />
          </div>

          {/* View + items controls */}
          <div className="flex items-center gap-4">
            {/* Items per page */}
            <label className="flex items-center gap-2 text-[10px] text-gray-500 md:text-sm">
              <span>Items</span>

              <select
                value={itemsPerPage}
                onChange={(event) => {
                  const newLimit = Number(event.target.value);

                  setItemsPerPage(newLimit);
                  setPage(1);

                  updateUrl({
                    limit: String(newLimit),
                    page: "",
                  });
                }}
                className="cursor-pointer border-b border-gray-300 bg-transparent py-1 text-[10px] text-gray-700 outline-none"
              >
                {allowedLimits.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit}
                  </option>
                ))}
              </select>
            </label>

            {/* Grid layout */}
            <ProductViewToggle value={view} onChange={setView} />
          </div>
        </div>

        {/* Result count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-[9px] text-gray-400">
            {filteredAndSortedProducts.length === 0
              ? "No products"
              : `Showing ${startProduct}–${endProduct} of ${total}`}
          </p>

          {(search || category || price || sort) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[9px] text-gray-500 underline underline-offset-4 hover:text-black"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Empty state */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="font-serif text-2xl font-semibold">
              No products found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* Product grid */}
            <div
              className={`grid gap-x-5 gap-y-10 ${
                view === "grid-3"
                  ? "grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {paginatedProducts.map((product) => (
                <ProductsCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <ProductPagination
              page={safePage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setPage(newPage);

                updateUrl({
                  page: newPage === 1 ? "" : String(newPage),
                });

                // Return the user to the top of the Store.
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            />
          </>
        )}
      </section>
    </div>
  );
}
