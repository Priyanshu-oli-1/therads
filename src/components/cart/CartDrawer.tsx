"use client";

import Link from "next/link";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";

import { useCart } from "./cartContext";

export default function CartDrawer() {
  const dispatch = useDispatch();

  // Redux now owns cart products
  const cart = useSelector(
    (state: RootState) => state.cart.items
  );

  // Context temporarily owns drawer open/close state
  const { isCartOpen, closeCart } = useCart();

  if (!isCartOpen) {
    return null;
  }

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/30"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">
              Your Cart
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {cart.length}{" "}
              {cart.length === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="text-2xl leading-none text-gray-500 hover:text-black"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-lg font-medium">
                Your cart is empty
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Add something from our collection.
              </p>

              <button
                type="button"
                onClick={closeCart}
                className="mt-6 bg-black px-6 py-3 text-sm text-white"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4"
                >
                  {/* Product image */}
                  <div className="relative h-24 w-20 shrink-0 bg-gray-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium">
                      {item.product.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Size: {item.size}
                    </p>

                    <p className="mt-2 text-sm font-medium">
                      ₹
                      {item.product.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    {/* Quantity */}
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              size: item.size,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center border border-gray-300"
                      >
                        −
                      </button>

                      <span className="text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              size: item.size,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center border border-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          productId: item.product.id,
                          size: item.size,
                        })
                      )
                    }
                    className="text-xs text-gray-400 hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Subtotal
              </span>

              <span className="font-medium">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-5 flex h-12 items-center justify-center border border-black text-sm font-medium"
            >
              View Cart
            </Link>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-3 flex h-12 items-center justify-center bg-black text-sm font-medium text-white hover:bg-gray-800"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}