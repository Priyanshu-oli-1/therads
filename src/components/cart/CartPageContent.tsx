"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import type { RootState } from "@/redux/store";

import CartHeader from "./CartHeader";
import CartSummary from "./CartSummary";
import CartItem from "./CartItems";

export default function CartPageContent() {
  const [giftWrap, setGiftWrap] = useState(false);

  const cart = useSelector(
    (state: RootState) => state.cart.items
  );

  if (cart.length === 0) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-[1000px] px-5 py-10 sm:py-14">
        <CartHeader />

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="font-serif text-xl text-gray-700">
            Your cart is empty
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Looks like you haven't added anything yet.
          </p>

          <Link
            href="/products"
            className="mt-6 bg-black px-8 py-3 text-xs text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= 5000 ? 0 : 199;

  const giftWrapPrice = giftWrap ? 10 : 0;

  const total = subtotal + shipping + giftWrapPrice;

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
      <CartHeader />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_320px]">
        <div className="w-full">
          <div className="grid grid-cols-[minmax(0,1.4fr)_90px_100px_100px] border-b border-gray-300 pb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 sm:text-xs">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span className="text-right">Total</span>
          </div>

          <div className="space-y-2 pt-2">
            {cart.map((item) => (
              <CartItem
                key={`${item.product.id}-${item.size}`}
                product={item.product}
                quantity={item.quantity}
                size={item.size}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:pt-2">
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            giftWrap={giftWrap}
            onGiftWrapChange={setGiftWrap}
          />
        </div>
      </div>
    </main>
  );
}
