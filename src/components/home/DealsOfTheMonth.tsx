"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const deals = [
  {
    image: "/images/deals/image.png",
    alt: "Woman wearing black dress",
    sale: "Limited Time",
    discount: "50% OFF",
  },
  {
    image: "/images/deals/image copy.png",
    alt: "Woman wearing blue dress",
    sale: "Limited Time",
    discount: "40% OFF",
  },
  {
    image: "/images/deals/image copy 2.png",
    alt: "Woman wearing fashion outfit",
    sale: "Limited Time",
    discount: "35% OFF",
  },
];

export default function DealsOfTheMonth() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === deals.length - 1 ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? deals.length - 1 : current - 1
    );
  };

  return (
    <section className="w-full bg-[#fafafa] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex min-h-[500px] items-center gap-8 overflow-hidden">
          {/* ================= LEFT CONTENT ================= */}
          <div className="w-[30%] shrink-0">
            <h2 className="text-5xl font-semibold tracking-tight">
              Deals Of The Month
            </h2>

            <p className="mt-4 max-w-[280px] text-xs leading-6 text-gray-400">
              Get ready for our biggest deals of the month. Discover stylish
              fashion pieces at special prices for a limited time.
            </p>

            {/* Buy Now */}
           <Link href={"/products"}>
            <button
              type="button"
              className="mt-7 bg-black px-9 py-3 text-[11px] font-medium text-white transition hover:bg-gray-800 rounded-2xl"
            >
              Buy Now
            </button>
           </Link>

            {/* Countdown */}
            <div className="mt-7">
              <p className="text-sm font-medium">
                Hurry, Before It's Too Late!
              </p>

              <div className="mt-3 flex gap-3  ">
                {/* Days */}
                <div className="text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-sm shadow-sm">
                    02
                  </div>
                  <span className="mt-1 block text-[9px] text-gray-500">
                    Days
                  </span>
                </div>

                {/* Hours */}
                <div className="text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-sm shadow-sm">
                    12
                  </div>
                  <span className="mt-1 block text-[9px] text-gray-500">
                    Hr
                  </span>
                </div>

                {/* Minutes */}
                <div className="text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-sm shadow-sm">
                    35
                  </div>
                  <span className="mt-1 block text-[9px] text-gray-500">
                    Mins
                  </span>
                </div>

                {/* Seconds */}
                <div className="text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-sm shadow-sm">
                    30
                  </div>
                  <span className="mt-1 block text-[9px] text-gray-500">
                    Sec
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-end gap-2 mr-4">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous deal"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-sm transition hover:bg-gray-100"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next deal"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-sm transition hover:bg-gray-100"
              >
                →
              </button>
            </div>
          </div>

          {/* ================= RIGHT PRODUCTS ================= */}
          <div className="relative flex min-w-0 flex-1 items-center gap-3">
            {/* Main Card */}
            <div className="relative h-[470px] w-[45%] shrink-0 overflow-hidden bg-gray-100">
              <Image
                src={deals[activeSlide].image}
                alt={deals[activeSlide].alt}
                fill
                priority
                className="object-cover"
              />

              {/* Sale Information */}
              {deals[activeSlide].sale && (
                <div className="absolute bottom-4 left-4 bg-white px-5 py-4">
                  <p className="text-[9px] text-gray-500">
                    {deals[activeSlide].sale}
                  </p>

                  <p className="mt-1 text-lg font-medium">
                    {deals[activeSlide].discount}
                  </p>
                </div>
              )}
            </div>

            {/* Second Image */}
            <div className="relative h-[400px] w-[30%] shrink-0 overflow-hidden bg-gray-100">
              <Image
                src={deals[(activeSlide + 1) % deals.length].image}
                alt={deals[(activeSlide + 1) % deals.length].alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Third Image */}
            <div className="relative h-[400px] w-[30%] shrink-0 overflow-hidden bg-gray-100">
              <Image
                src={deals[(activeSlide + 2) % deals.length].image}
                alt={deals[(activeSlide + 2) % deals.length].alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ================= SLIDER INDICATORS ================= */}
        <div className="mt-2 flex justify-center gap-2">
          {deals.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to deal ${index + 1}`}
              className={`h-2 w-2 rounded-full transition ${
                activeSlide === index ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}