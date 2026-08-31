"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold">
              Something went wrong
            </h1>

            <p className="mt-4 text-gray-500">
              An unexpected error occurred. Please try again.
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
      </body>
    </html>
  );
}