"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BackToTop from "./BackToTop";
import ProductPagination from "./ProductPagination";
import type { Product } from "@/types/product";
import ProductsCard from "./ProductsCard";
import ProductSort from "./ProductSort";
import ProductSearch from "./ProductSearch";
import ProductCategoryFilter from "./ProductCategoryFilter";

type ProductListProps = {
  products: Product[];
  initialSearch?: string;
  initialCategory?: string;
  initialSort?: string;
  initialPage?: number;
  initialItemsPerPage?: number;
};

export default function ProductList({
  products,
  initialSearch = "",
  initialCategory = "",
  initialSort = "",
  initialPage = 1,
  initialItemsPerPage = 4,
}: ProductListProps) {
  const [sort, setSort] = useState(initialSort);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(Math.max(1, initialPage));
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const productsPerPage = itemsPerPage;

  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

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
  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
    setCategory(searchParams.get("category") ?? "");
    setSort(searchParams.get("sort") ?? "");

    const urlPage = Number(searchParams.get("page") ?? "1");

    setPage(Math.max(1, urlPage));

    const urlLimit = Number(searchParams.get("limit") ?? "4");

    if ([4, 8, 12].includes(urlLimit)) {
      setItemsPerPage(urlLimit);
    } else {
      setItemsPerPage(4);
    }
  }, [searchParams]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
    setPage(1);
    setItemsPerPage(4);

    router.replace(pathname);
  };

  const filteredAndSortedProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm);

      const matchesCategory =
        !category || product.category.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [products, search, category, sort]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage,
  );

  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));

  useEffect(() => {
    const maximumPage = Math.max(totalPages, 1);

    if (page > maximumPage) {
      setPage(maximumPage);

      updateUrl({
        page: maximumPage === 1 ? "" : String(maximumPage),
      });
    }
  }, [page, totalPages]);

  const startIndex = (safePage - 1) * productsPerPage;

  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const startProduct =
    filteredAndSortedProducts.length === 0 ? 0 : startIndex + 1;

  const endProduct = Math.min(
    startIndex + productsPerPage,
    filteredAndSortedProducts.length,
  );

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <ProductSearch
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);

            updateUrl({
              search: value,
              page: "",
            });
          }}
        />

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium">Items per page:</span>

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
              className="rounded-md border px-3 py-2"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </label>

          <ProductCategoryFilter
            value={category}
            categories={categories}
            onChange={(value) => {
              setCategory(value);
              setPage(1);

              updateUrl({
                category: value,
                page: "",
              });
            }}
          />

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

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {(search || category || sort) && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium">Active filters:</span>

          {search && (
            <span className="rounded-full border px-3 py-1">
              Search: {search}
            </span>
          )}

          {category && (
            <span className="rounded-full border px-3 py-1">
              Category: {category}
            </span>
          )}

          {sort && (
            <span className="rounded-full border px-3 py-1">Sort: {sort}</span>
          )}
        </div>
      )}

      {filteredAndSortedProducts.length > 0 && (
        <div className="mb-6 text-sm text-gray-500">
          Showing {startProduct}–{endProduct} of{" "}
          {filteredAndSortedProducts.length} products
        </div>
      )}

      {filteredAndSortedProducts.length === 0 ? (
        <div className="py-16 text-center">
          <h2 className="text-xl font-semibold">No products found</h2>

          <p className="mt-2 text-gray-500">
            Try changing your search or category.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>

          <ProductPagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              setPage(newPage);

              updateUrl({
                page: newPage === 1 ? "" : String(newPage),
              });
            }}
          />
          <div className="mt-6 flex justify-center">
            <BackToTop />
          </div>
        </>
      )}
    </>
  );
}
