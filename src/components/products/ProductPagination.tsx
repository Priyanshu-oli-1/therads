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
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {/* First */}
      <button
        type="button"
        disabled={page === 1}
        onClick={() => {
          onPageChange(1);
        }}
        className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        First
      </button>

      {/* Previous */}
      <button
        type="button"
        disabled={page === 1}
        onClick={() => {
          onPageChange(page - 1);
        }}
        className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from(
          { length: totalPages },
          (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => {
                  onPageChange(pageNumber);
                }}
                className={`rounded-md border px-3 py-2 text-sm font-medium ${
                  page === pageNumber
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          },
        )}
      </div>

      {/* Next */}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => {
          onPageChange(page + 1);
        }}
        className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

      {/* Last */}
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => {
          onPageChange(totalPages);
        }}
        className="rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
}