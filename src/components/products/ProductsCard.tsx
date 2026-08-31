import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div>
        {/* Product Image */}
        <div className=" relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Information */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <h2 className="mt-1 text-base font-medium">
            {product.name}
          </h2>

          <p className="mt-2 text-base font-semibold">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Link>
  );
}