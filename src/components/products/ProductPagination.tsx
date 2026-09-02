"use client";

type ProductPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ProductPagination({
  page,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  // Don't show pagination when there is only one page.
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="mt-14 flex items-center justify-center gap-5"
      aria-label="Product pagination"
    >
      {/* Previous page */}
      <button
        type="button"
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="text-xs text-gray-400 transition hover:text-black disabled:pointer-events-none disabled:opacity-30"
        aria-label="Previous page"
      >
        ←
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-3">
        {Array.from(
          { length: totalPages },
          (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() =>
                  onPageChange(pageNumber)
                }
                aria-current={
                  page === pageNumber
                    ? "page"
                    : undefined
                }
                className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-[9px] ${
                  page === pageNumber
                    ? "bg-gray-100 font-medium text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {pageNumber}
              </button>
            );
          }
        )}
      </div>

      {/* Next page */}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
        className="text-xs text-gray-400 transition hover:text-black disabled:pointer-events-none disabled:opacity-30"
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}