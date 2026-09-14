// components/home/Hero.tsx

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid min-h-[calc(100vh-88px)] grid-cols-1 items-stretch gap-4 py-8 md:grid-cols-3 lg:gap-5">
          {/* Left image */}
          <div className="group relative h-[420px] overflow-hidden bg-gray-100 sm:h-[500px] md:h-full md:min-h-[540px] lg:min-h-[620px]">
            <Image
              src="/images/hero/image.png"
              alt="Men's collection"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-[9px] font-medium tracking-[0.25em] text-white drop-shadow">
                MEN'S COLLECTION
              </p>
            </div>
          </div>

          {/* Center column */}
          <div className="flex h-full min-h-[520px] flex-col gap-4 md:min-h-[540px] lg:min-h-[620px]">
            <div className="group relative h-[140px] overflow-hidden  bg-gray-100 sm:h-[170px] md:h-[170px] lg:h-[190px]">
              <Image
                src="/images/hero/image3.png"
                alt="Featured models"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-white px-4 py-8 text-center">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-100" />

              <p className="relative mb-3 text-[9px] font-medium tracking-[0.35em] text-gray-400">
                FASCO
              </p>

              <h1 className="relative font-serif text-4xl font-semibold leading-none tracking-wide text-gray-900 sm:text-5xl lg:text-6xl">
                ULTIMATE
              </h1>

              <h2
                className="relative mt-1 font-serif text-6xl font-bold leading-[0.82] tracking-wide sm:text-7xl lg:text-8xl"
                style={{
                  WebkitTextStroke: "1.5px #1a1a1a",
                  color: "transparent",
                }}
              >
                SALE
              </h2>

              <p className="relative mt-5 text-[9px] font-medium tracking-[0.35em] text-gray-500 sm:text-[10px]">
                NEW COLLECTION
              </p>

              <Link
                href="/products"
                className="relative mt-6 inline-flex h-[42px] min-w-[140px] items-center justify-center rounded-md bg-black px-8 text-[10px] font-semibold tracking-[0.12em] text-white transition duration-300 hover:bg-gray-800"
              >
                SHOP NOW
              </Link>
            </div>

            <div className="group relative h-[110px] overflow-hidden rounded-lg bg-pink-100 sm:h-[140px] md:h-[140px] lg:h-[155px]">
              <Image
                src="/images/hero/image4.png"
                alt="New collection"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right image */}
          <div className="group relative h-[420px] overflow-hidden rounded-lg bg-gray-100 sm:h-[500px] md:h-full md:min-h-[540px] lg:min-h-[620px]">
            <Image
              src="/images/hero/image2.png"
              alt="Men's fashion"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5">
              <p className="text-[9px] font-medium tracking-[0.25em] text-white drop-shadow">
                NEW ARRIVALS
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
