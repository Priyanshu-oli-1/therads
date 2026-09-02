"use client";

import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/components/cart/cartContext";

type CheckoutSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
};

export default function CheckoutSummary({
  subtotal,
  shipping,
  total,
}: CheckoutSummaryProps) {
  const { cart } = useCart();

  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      setDiscountMessage("Please enter a discount code.");
      return;
    }

    // Discount functionality can be connected to the backend later.
    setDiscountMessage("Discount codes are not available yet.");
  };

  return (
    <aside
      className="
        w-full
        bg-gray-50
        px-6
        py-10
        md:px-8
        lg:min-h-full
        lg:border-l
        lg:border-gray-200
      "
    >
      {/* 
        Full-width content.
        We intentionally removed max-w-[470px] so the
        summary uses the entire right-side column.
      */}
      <div className="w-full">
        {/* =========================
            CART PRODUCTS
        ========================= */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="flex items-center gap-4"
            >
              {/* Product image */}
              <div className="relative h-20 w-20 shrink-0 bg-gray-200">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />

                {/* Quantity badge */}
                <span
                  className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[10px]
                    font-semibold
                    text-white
                  "
                >
                  {item.quantity}
                </span>
              </div>

              {/* Product information */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-serif text-sm font-semibold text-gray-900">
                  {item.product.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Size: {item.size}
                </p>
              </div>

              {/* Product total */}
              <span className="shrink-0 text-xs text-gray-700">
                ₹
                {(
                  item.product.price * item.quantity
                ).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        {/* =========================
            DISCOUNT CODE
        ========================= */}
        <div className="mt-8 flex w-full gap-3">
          <input
            type="text"
            value={discountCode}
            onChange={(event) =>
              setDiscountCode(event.target.value)
            }
            placeholder="Discount code"
            className="
              h-12
              min-w-0
              flex-1
              border
              border-gray-200
              bg-white
              px-4
              text-xs
              outline-none
              transition
              focus:border-black
            "
          />

          <button
            type="button"
            onClick={handleApplyDiscount}
            className="
              h-12
              w-24
              shrink-0
              bg-black
              text-xs
              font-medium
              text-white
              transition
              hover:bg-gray-800
            "
          >
            Apply
          </button>
        </div>

        {/* Discount message */}
        {discountMessage && (
          <p className="mt-2 text-xs text-gray-500">
            {discountMessage}
          </p>
        )}

        {/* =========================
            PRICE BREAKDOWN
        ========================= */}
        <div className="mt-8 space-y-4 text-xs text-gray-600">
          {/* Subtotal */}
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between">
            <span>Shipping</span>

            <span>
              {shipping === 0
                ? "Free"
                : `₹${shipping.toLocaleString("en-IN")}`}
            </span>
          </div>

          {/* Total */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-base font-semibold text-black">
              <span>Total</span>

              <span>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}