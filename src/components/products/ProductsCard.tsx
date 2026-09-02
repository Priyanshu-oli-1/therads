import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductsCard({
  product,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-xl transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 shadow-sm ring-1 ring-gray-100 transition-shadow duration-300 group-hover:shadow-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="
            (max-width: 639px) 50vw,
            (max-width: 1023px) 33vw,
            25vw
          "
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="pt-3">
        <h2 className="text-sm font-medium leading-5 text-gray-900 sm:text-base">
          {product.name}
        </h2>

        <p className="mt-1 text-sm text-gray-700">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        {/* Figma-style color indicators.
            These remain visual until product color data is added. */}
        <div
          className="mt-2 flex items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="h-2.5 w-2.5 rounded-full border border-gray-400 bg-white" />

          <span className="h-2.5 w-2.5 rounded-full bg-black" />

          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
        </div>
      </div>
    </Link>
  );
}