"use client";

import Image from "next/image";

import type { Product } from "@/types/product";

import { useCart } from "./cartContext";
import CartQuantity from "./CartQuantity";

type CartItemProps = {
  product: Product;
  quantity: number;
  size: string;
};

export default function CartItem({
  product,
  quantity,
  size,
}: CartItemProps) {
  const {
    removeFromCart,
    updateQuantity,
  } = useCart();

  // Calculate this item's total
  const itemTotal = product.price * quantity;

  return (
    <div className="grid grid-cols-[minmax(0,1.4fr)_90px_100px_100px] items-start border-t border-gray-200 py-4">
      <div className="flex gap-4 flex-col">
        <div className="relative h-[110px] w-[88px] shrink-0 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="88px"
            className="object-cover"
          />
        </div>

        <div className="pt-1 ">
          <h2 className="max-w-[180px] text-sm font-medium leading-5 text-black">
            {product.name}
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Size: {size}
          </p>

          <button
            type="button"
            onClick={() => removeFromCart(product.id, size)}
            className="mt-3 text-xs text-gray-500 underline-offset-2 transition hover:text-black hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="pt-2 text-sm text-gray-700">
        ₹{product.price.toLocaleString("en-IN")}
      </div>

      <div className="pt-1">
        <CartQuantity
          quantity={quantity}
          onDecrease={() => updateQuantity(product.id, quantity - 1, size)}
          onIncrease={() => updateQuantity(product.id, quantity + 1, size)}
        />
      </div>

      <div className="pt-2 text-right text-sm font-medium text-black">
        ₹{itemTotal.toLocaleString("en-IN")}
      </div>
    </div>
  );
}