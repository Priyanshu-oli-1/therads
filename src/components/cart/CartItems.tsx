"use client";

import { Product } from "@/types/product";
import { useCart } from "./cartContext";
import Image from "next/image";
import CartQuantity from "./CartQuantity";

type CartItemProps = {
  product: Product;
  quantity: number;
};

export default function CartItem({ product, quantity }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const itemTotal = product.price * quantity;

  return (
    <div className="flex items-center justify-between border-b pb-6">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-20 overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="font-medium">{product.name}</h2>

          <p className="mt-1 text-sm text-gray-500">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
        >
          -
        </button>

        <span>{quantity}</span>

        <button onClick={() => updateQuantity(product.id, quantity + 1)}>
          +
        </button>

        <button
          onClick={() => removeFromCart(product.id)}
          className="text-sm underline"
        >
          Remove
        </button>
        <CartQuantity
          quantity={quantity}
          onDecrease={() =>
            updateQuantity(product.id, Math.max(1, quantity - 1))
          }
          onIncrease={() => updateQuantity(product.id, quantity + 1)}
        />
      </div>
    </div>
  );
}
