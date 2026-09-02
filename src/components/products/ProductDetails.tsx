import Link from "next/link";

import type { Product } from "@/types/product";

import ProductGallery from "./ProductGallery";
import ProductPurchase from "./ProductPurchase";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  return (
    <section className="w-full bg-white">
      {/* Keep the product page aligned with the main site container. */}
      <div className="mx-auto w-full max-w-7xl px-6 py-8 md:px-8 md:py-12 lg:py-8">
        
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs text-gray-500"
        >
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="transition hover:text-black"
            >
              Home
            </Link>

            <span>›</span>

            <Link
              href="/products"
              className="transition hover:text-black"
            >
              Fashion
            </Link>

            <span>›</span>

            <span className="text-gray-700">
              {product.name}
            </span>
          </div>
        </nav>

        {/* Product gallery + information */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:gap-14 xl:gap-20">

          {/* =====================================================
              LEFT — PRODUCT GALLERY
          ====================================================== */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* =====================================================
              RIGHT — PRODUCT INFORMATION
          ====================================================== */}
          <div className="lg:pt-1">

            {/* Brand */}
            <p className="font-serif text-sm text-gray-500">
              THREADS
            </p>

            {/* Product name */}
            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-[42px] lg:leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <span
                className="text-sm tracking-[0.15em] text-black"
                aria-label="Product rating"
              >
                ★★★★★
              </span>

              <span className="text-xs text-gray-500">
                (3)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-semibold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {/* Visual sale price from the Figma design. */}
              <span className="text-sm text-gray-400 line-through">
                ₹{Math.round(product.price * 1.5).toLocaleString("en-IN")}
              </span>

              <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                Save 33%
              </span>
            </div>

            {/* Viewing indicator */}
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>

              <span>
                24 people are viewing this right now
              </span>
            </div>

            {/* Sale countdown — presentation layer for now. */}
            <div className="mt-7 border border-red-200 bg-red-50 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-serif text-sm font-semibold text-red-500">
                  Hurry up! Sale ends in:
                </p>

                <div className="font-mono text-sm font-semibold tracking-widest text-red-500">
                  00 : 05 : 59 : 47
                </div>
              </div>
            </div>

            {/* Stock indicator */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Only{" "}
                  <span className="font-semibold">
                    9
                  </span>{" "}
                  item(s) left in stock!
                </p>
              </div>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[12%] rounded-full bg-red-500" />
              </div>
            </div>

            {/* Purchase section */}
            <ProductPurchase product={product} />

            {/* Product actions */}
            <div className="mt-8 flex items-center gap-7 border-b border-gray-200 pb-5">
              <button
                type="button"
                className="flex items-center gap-2 text-xs text-gray-700 transition hover:text-black"
              >
                <span className="text-base">↕</span>
                Compare
              </button>

              <button
                type="button"
                className="flex items-center gap-2 text-xs text-gray-700 transition hover:text-black"
              >
                <span className="text-base">?</span>
                Ask a question
              </button>

              <button
                type="button"
                className="flex items-center gap-2 text-xs text-gray-700 transition hover:text-black"
              >
                <span className="text-base">♧</span>
                Share
              </button>
            </div>

            {/* Delivery information */}
            <div className="space-y-4 pt-6">
              <div className="flex gap-3">
                <span
                  className="mt-0.5 text-sm"
                  aria-hidden="true"
                >
                  ▣
                </span>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    Estimated Delivery:
                  </span>{" "}
                  Jul 30 - Aug 03
                </p>
              </div>

              <div className="flex gap-3">
                <span
                  className="mt-0.5 text-sm"
                  aria-hidden="true"
                >
                  ♧
                </span>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    Free Shipping & Returns:
                  </span>{" "}
                  On all orders over ₹5,000
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="mt-8 border-t border-gray-100 pt-5">
              <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                Category
              </p>

              <Link
                href={`/products?category=${encodeURIComponent(
                  product.category
                )}`}
                className="mt-2 inline-block text-sm font-medium text-gray-800 transition hover:text-black"
              >
                {product.category}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}