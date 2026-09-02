"use client";

import Link from "next/link";
import GiftWrap from "./GiftWrap";

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
  giftWrap: boolean;
  onGiftWrapChange: (enabled: boolean) => void;
};

export default function CartSummary({
  subtotal,
  shipping,
  total,
  giftWrap,
  onGiftWrapChange,
}: CartSummaryProps) {
  return (
    <aside className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm md:ml-auto md:max-w-[300px]">
      <div className="border-b border-gray-200 pb-4">
        <GiftWrap enabled={giftWrap} onChange={onGiftWrapChange} />
      </div>

      <div className="flex items-center justify-between py-5 text-sm">
        <span className="font-medium text-black">Subtotal</span>
        <span className="font-medium text-black">₹{subtotal.toLocaleString("en-IN")}</span>
      </div>

      <div className="flex items-center justify-between border-b border-gray-200 pb-4 text-sm text-gray-500">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
      </div>

      <div className="flex items-center justify-between py-4 text-base font-semibold text-black">
        <span>Total</span>
        <span>₹{total.toLocaleString("en-IN")}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-2 flex h-[46px] w-full items-center justify-center rounded-md bg-black text-sm font-medium text-white shadow-[0_10px_20px_rgba(0,0,0,0.12)] transition hover:bg-gray-800"
      >
        Checkout
      </Link>

      <Link
        href="/cart"
        className="mt-3 block text-center text-sm font-medium text-gray-700 underline-offset-2 transition hover:text-black hover:underline"
      >
        View Cart
      </Link>
    </aside>
  );
}