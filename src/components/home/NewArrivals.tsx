"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = [
  "Men's Fashion",
  "Women's Fashion",
  "Women Accessories",
  "Men Accessories",
  "Discount Deals",
];

const products = [
  {
    id: 1,
    name: "Shiny Dress",
    category: "Women's Fashion",
    image: "/images/newArrivals/img1.png",
    price: 95.5,
    rating: 5,
  },
  {
    id: 2,
    name: "Long Dress",
    category: "Women's Fashion",
    image: "/images/newArrivals/img2.png",
    price: 95.5,
    rating: 5,
  },
  {
    id: 3,
    name: "Full Sweater",
    category: "Women's Fashion",
    image: "/images/newArrivals/img3.png",
    price: 95.5,
    rating: 5,
  },
  {
    id: 4,
    name: "White Dress",
    category: "Women's Fashion",
    image: "/images/newArrivals/img4.png",
    price: 95.5,
    rating: 5,
  },
  {
    id: 5,
    name: "Colorful Dress",
    category: "Women's Fashion",
    image: "/images/newArrivals/img5.png",
    price: 95.5,
    rating: 5,
  },
  {
    id: 6,
    name: "White Shirt",
    category: "Men's Fashion",
    image: "/images/newArrivals/img6.png",
    price: 95.5,
    rating: 5,
  },
];

export default function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState("Women's Fashion");

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory,
  );

  return (
    <section id="new-arrivals" className="w-full min-h-screen bg-white py-20 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center">
          <h2 className="font-serif text-5xl font-semibold text-gray-900">
            New Arrivals
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-s leading-5 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* ================= CATEGORY TABS ================= */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-md px-6 py-3 text-xs transition-all ${
                  isActive
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-[220px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Information */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex text-sm text-orange-400">
                    {Array.from({ length: product.rating }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                </div>

                <p className="mt-1 text-[10px] text-gray-400">AI Karom</p>

                <p className="mt-4 text-[10px] text-gray-500">
                  (4.1k) Customer Reviews
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">
                    ${product.price.toFixed(2)}
                  </span>

                  <span className="text-[9px] text-red-400">
                    Almost Sold Out
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500">
              No products available in this category.
            </p>
          </div>
        )}

        {/* ================= VIEW MORE ================= */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="rounded-md bg-black px-10 py-3 text-xs font-medium text-white shadow-lg transition hover:bg-gray-800"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}