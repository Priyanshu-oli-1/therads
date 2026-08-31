export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <div className="h-10 w-40 animate-pulse rounded-md bg-gray-200" />

        <div className="mt-4 h-5 w-80 animate-pulse rounded-md bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border"
          >
            <div className="aspect-3/4 animate-pulse bg-gray-200" />

            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}