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
    <section className="max-w-7xl mx-auto flex items-center justify-between px-16 py-10 border-t border-gray-100">
      {BRANDS.map((brand) => (
        <Image
          key={brand.name}
          src={brand.src}
          alt={brand.name}
          width={120}
          height={32}
          className="opacity-80"
        />
      ))}
    </section>
  );
}