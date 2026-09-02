"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// const productTags = [ 
//   {
//     name: "Flat Cap",
//     position: "left-[58%] top-[5%]",
//   },
//   {
//     name: "Suspender",
//     position: "left-[18%] top-[30%]",
//   },
//   {
//     name: "Hugo Boss",
//     position: "left-[47%] top-[40%]",
//   },
//   {
//     name: "Hugo Boss",
//     position: "left-[8%] top-[62%]",
//   },
//   {
//     name: "Santoni",
//     position: "left-[60%] top-[82%]",
//   },
// ];

const sizes = ["S", "M", "L", "XL"];

const benefits = [
  {
    title: "High Quality",
    description: "crafted from top materials",
    icon: "✧",
  },
  {
    title: "Warranty Protection",
    description: "Over 2 years",
    icon: "♙",
  },
  {
    title: "Free Shipping",
    description: "Order over 150 $",
    icon: "□",
  },
  {
    title: "24 / 7 Support",
    description: "Dedicated customer support",
    icon: "◉",
  },
];

export default function FeaturedCollection() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  return (
    <section className="w-full bg-white">
      {/* ================= FEATURED COLLECTION ================= */}

      <div className="mx-auto max-w-[1400px]">
        <div className="relative grid min-h-[500px] grid-cols-1 overflow-hidden lg:grid-cols-2">

          {/* ================= LEFT IMAGE ================= */}

          <div className="relative min-h-[500px] overflow-hidden bg-[#f7f7f7]">

            {/* Model Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/main/image copy 2.png"
                alt="Peaky Blinders collection"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Product Tags */}

          </div>

          {/* ================= RIGHT CONTENT ================= */}

          <div
            className="
              relative
              flex
              min-h-[500px]
              items-center
              bg-[#e7e6e6]
              px-8
              py-14
              lg:-ml-24
              lg:px-24
            "
            style={{
              clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="ml-auto w-full max-w-[600px]">

              {/* Collection */}

              <p className="text-xs text-gray-500">
                Women Collection
              </p>

              {/* Title */}

              <h2 className="mt-3 font-serif text-4xl font-semibold text-gray-800">
                Peaky Blinders
              </h2>

              {/* Description */}

              <div className="mt-5">
                <h3 className="text-[16px] font-semibold uppercase underline">
                  Description
                </h3>

                <p className="mt-3 max-w-[430px] text-xs leading-5 text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Scelerisque duis ultrices sollicitudin aliquam sem.
                  Scelerisque duis ultrices sollicitudin. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.
                </p>
              </div>

              {/* Size */}

              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  Size:
                </span>

                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-7 min-w-7 items-center justify-center rounded px-2 text-[10px] font-medium transition ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 hover:bg-black hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}

              <p className="mt-6 text-lg font-semibold text-gray-900">
                $100.00
              </p>

              {/* Buy Now */}

              <Link
                href="/checkout"
                className="mt-5 inline-flex rounded-md bg-black px-12 py-3 text-xs font-medium text-white shadow-md transition hover:bg-gray-800"
              >
                Buy Now
              </Link>

              {/* Selected Tag */}

              {activeTag && (
                <p className="mt-4 text-xs text-gray-500">
                  Selected:{" "}
                  <span className="font-medium text-black">
                    {activeTag}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= BENEFITS ================= */}

        <div className="grid grid-cols-1 border-t bg-white sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex items-center justify-center gap-4 px-6 py-7"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl">
                {benefit.icon}
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-800">
                  {benefit.title}
                </h3>

                <p className="mt-1 text-[10px] text-gray-500">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}