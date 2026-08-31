export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Product image skeleton */}
        <div className="aspect-[3/4] animate-pulse rounded-lg bg-gray-200" />

        {/* Product information skeleton */}
        <div className="flex flex-col justify-center">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 h-7 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="mt-10 h-12 w-full animate-pulse rounded-md bg-gray-200" />
        </div>
      </div>
    </main>
  );
}