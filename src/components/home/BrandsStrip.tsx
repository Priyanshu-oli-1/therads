// components/home/BrandsStrip.tsx
import Image from "next/image";

const BRANDS = [
  { name: "Chanel", src: "/images/hero/brands/image.png" },
  { name: "Louis Vuitton", src: "/images/hero/brands/image copy.png" },
  { name: "Prada", src: "/images/hero/brands/image copy 3.png" },
  { name: "Calvin Klein", src: "/images/hero/brands/image copy 4.png" },
  { name: "Denim", src: "/images/hero/brands/image copy 2.png" },
];

export default function BrandsStrip() {
  return (
    <section className="border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-3 md:grid-cols-5 md:items-center md:justify-between md:gap-6 md:px-8 lg:px-16">
        {BRANDS.map((brand) => (
          <div key={brand.name} className="flex items-center justify-center">
            <Image
              src={brand.src}
              alt={brand.name}
              width={120}
              height={32}
              className="h-auto max-h-8 w-auto max-w-[90px] object-contain opacity-80 sm:max-w-[110px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}