"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-lg border p-10 text-center">
        <h1 className="text-2xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-500">
          We couldn't load the products right now.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}