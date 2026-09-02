"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "James K.",
    role: "Traveler",
    image: "/images/reviews/image copy.png",
    review:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah M.",
    role: "Designer",
    image: "/images/reviews/image copy.png",
    review:
      "I was looking for something beautiful and comfortable. The quality was amazing and the delivery was very fast.",
    rating: 5,
  },
  {
    id: 3,
    name: "John W.",
    role: "Entrepreneur",
    image: "/images/reviews/image copy.png",
    review:
      "The product looks even better in person. Excellent quality, great service and a very smooth shopping experience.",
    rating: 5,
  },
  {
    id: 4,
    name: "Emma R.",
    role: "Fashion Lover",
    image: "/images/reviews/image copy.png",
    review:
      "Absolutely loved my purchase. The design, quality and packaging were all perfect. I will definitely shop again.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const previousSlide = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const nextSlide = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  };

const getIndex = (offset: number) => {
  return (
    (activeIndex + offset + testimonials.length) %
    testimonials.length
  );
};

  const active = testimonials[activeIndex];
  const previous = testimonials[getIndex(-1)];
  const next = testimonials[getIndex(1)];

  return (
    <section className="w-full bg-[#fafafa] py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* ================= HEADER ================= */}

        <div className="text-center">
          <h2 className="font-serif text-5xl font-semibold text-gray-800">
            This Is What Our Customers Say
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-s leading-5 text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Scelerisque duis.
          </p>
        </div>

        {/* ================= TESTIMONIAL CAROUSEL ================= */}

        <div className="relative mx-auto mt-12 flex h-[260px] max-w-[1000px] items-center justify-center">

          {/* Previous Card */}

          <div className="absolute left-0 z-10 hidden h-[150px] w-[250px] overflow-hidden rounded-md bg-white shadow-sm lg:block">
            <div className="flex h-full items-center justify-center p-5">
              <div className="relative h-[100px] w-[100px] shrink-0">
                <Image
                  src={previous.image}
                  alt={previous.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Active Card */}

          <div className="relative z-20 flex h-[180px] w-full max-w-[380px] items-center rounded-md bg-white p-6 shadow-lg sm:max-w-[600px]">

            {/* User Image */}

            <div className="relative h-[130px] w-[130px] shrink-0">
              <div className="absolute -left-2 -top-2 h-[130px] w-[130px] bg-[#deded8]" />

              <div className="relative h-full w-full">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Review */}

            <div className="ml-8 min-w-0 flex-1">

              <p className="text-[13px] leading-4 text-gray-600">
                "{active.review}"
              </p>

              {/* Stars */}

              <div className="mt-4 flex gap-0.5 text-sm text-orange-400">
                {Array.from({ length: active.rating }).map((_, index) => (
                  <span key={index}>★</span>
                ))}
              </div>

              {/* Divider */}

              <div className="mt-3 h-px w-28 bg-gray-400" />

              {/* Name */}

              <h3 className="mt-2 font-serif text-2xl text-gray-800">
                {active.name}
              </h3>

              <p className="mt-1 text-[10px] text-gray-500">
                {active.role}
              </p>

            </div>
          </div>

          {/* Next Card */}

          <div className="absolute right-0 z-10 hidden h-[150px] w-[250px] overflow-hidden rounded-md bg-white shadow-sm lg:block">
            <div className="flex h-full items-center justify-center p-5">
              <div className="relative h-[100px] w-[100px] shrink-0">
                <Image
                  src={next.image}
                  alt={next.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="mt-8 flex items-center justify-center gap-3">

          {/* Previous */}

          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-md transition hover:bg-black hover:text-white"
          >
            ←
          </button>

          {/* Next */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-md transition hover:bg-black hover:text-white"
          >
            →
          </button>

        </div>

        {/* ================= DOTS ================= */}

        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
              className={`h-2 w-2 rounded-full transition ${
                activeIndex === index
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}