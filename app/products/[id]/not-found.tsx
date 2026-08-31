import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 text-center">
      <h1 className="text-4xl font-bold">
        Product Not Found
      </h1>

      <p className="mt-4 text-gray-600">
        Sorry, we couldn't find the product you're looking for.
      </p>

      <Link
        href="/products"
        className="mt-8 inline-flex rounded-md border px-5 py-2 text-sm font-medium hover:bg-gray-100"
      >
        Back to Shop
      </Link>
    </main>
  );
}