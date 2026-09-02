// components/home/Hero.tsx
import Image from "next/image";
import { ShoppingCart, ArrowUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-6 md:px-16 py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left image */}
          <div className="relative h-[320px] md:h-[520px] rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/images/hero/image.png"
              alt="Men's collection"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Center column */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[100px] md:h-[140px] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="/images/hero/image3.png"
                alt="Featured models"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center py-2">
              <h1 className="font-serif text-3xl md:text-5xl font-semibold text-gray-900 leading-none tracking-wide">
                ULTIMATE
              </h1>
              <h2
                className="font-serif text-6xl md:text-7xl font-bold leading-[0.9] tracking-wide"
                style={{
                  WebkitTextStroke: "1.5px #1a1a1a",
                  color: "transparent",
                }}
              >
                SALE
              </h2>
              <p className="text-xs tracking-widest text-gray-500 mt-3">
                NEW COLLECTION
              </p>
              <button className="mt-4 bg-black text-white text-xs font-semibold tracking-wide px-8 py-3.5 rounded-md hover:opacity-85 transition-opacity">
                SHOP NOW
              </button>
            </div>

            <div className="relative h-[110px] md:h-[130px] rounded-lg overflow-hidden bg-pink-100">
              <Image
                src="/images/hero/image4.png"
                alt="New collection"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right image */}
          <div className="relative h-[320px] md:h-[520px] rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/images/hero/image2.png"
              alt="Men's fashion"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Floating cart + scroll-to-top buttons */}
        <div className="hidden md:flex flex-col items-center gap-3 absolute bottom-6 right-16">
          <button
            className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-md hover:opacity-85 transition-opacity"
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:border-black transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}