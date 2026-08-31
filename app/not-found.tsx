import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-gray-500">
          404
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Page Not Found
        </h1>

        <p className="mt-4 text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}