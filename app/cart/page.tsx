"use client";

import { useCart } from "@/components/cart/cartContext";
import { useAuth } from "@/components/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Redirect to sign-in if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/sign-in?redirect=/cart");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  // Calculate totals
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 5000 ? 0 : 199;
  const total = shipping + subtotal;

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>

        <div className="mt-8">
          <p className="text-gray-500">Your cart is currently empty.</p>

          <Link
            href="/products"
            className="mt-6 inline-block bg-black px-6 py-3 text-sm text-white hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Shopping Cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_350px]">
        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between border-b pb-6"
            >
              <div>
                <h2 className="font-medium">{item.product.name}</h2>

                <p className="mt-1 text-sm text-gray-500">
                  ₹{item.product.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      Math.max(1, item.quantity - 1),
                    )
                  }
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="px-2 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-sm text-red-600 underline hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit border p-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "Free"
                  : `₹${shipping.toLocaleString("en-IN")}`}
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block w-full bg-black px-6 py-3 text-center text-sm font-medium text-white hover:opacity-90"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
