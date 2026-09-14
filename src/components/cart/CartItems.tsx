"use client";

import Image from "next/image";

import { useDispatch } from "react-redux";

import type { Product } from "@/types/product";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";

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
  const dispatch = useDispatch();

  const itemTotal = product.price * quantity;

  return (
    <div className="grid grid-cols-[minmax(0,1.4fr)_90px_100px_100px] items-start border-t border-gray-200 py-4">
      <div className="flex flex-col gap-4">
        <div className="relative h-[110px] w-[88px] shrink-0 overflow-hidden rounded-md bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="88px"
            className="object-cover"
          />
        </div>

        <div className="pt-1">
          <h2 className="max-w-[180px] text-sm font-medium leading-5 text-black">
            {product.name}
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Size: {size}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(
                removeFromCart({
                  productId: product.id,
                  size,
                })
              )
            }
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
          onDecrease={() =>
            dispatch(
              updateQuantity({
                productId: product.id,
                size,
                quantity: quantity - 1,
              })
            )
          }
          onIncrease={() =>
            dispatch(
              updateQuantity({
                productId: product.id,
                size,
                quantity: quantity + 1,
              })
            )
          }
        />
      </div>

      <div className="pt-2 text-right text-sm font-medium text-black">
        ₹{itemTotal.toLocaleString("en-IN")}
      </div>
    </div>
  );
}