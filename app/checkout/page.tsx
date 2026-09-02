"use client";

import { checkoutSchema } from "@/schema/validation/checkout";
import { useCart } from "@/components/cart/cartContext";
import { useAuth } from "@/components/auth/authContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import z from "zod";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { cart } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Redirect to sign-in if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/sign-in?redirect=/checkout");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Checkout</h1>

        <p className="mt-8 text-gray-500">Your cart is empty.</p>
      </main>
    );
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal >= 5000 ? 0 : 199;

  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const result = checkoutSchema.safeParse({
    name,
    email,
    phone,
    address,
    city,
    pincode,
  });

  if (!result.success) {
    alert(result.error.issues[0].message);
    return;
  }

  const order = {
    customer: {
      name,
      email,
      phone,
      address,
      city,
      pincode,
    },

    items: cart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    })),

    subtotal,
    shipping,
    total,
  };

  console.log("Order:", order);
}

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Checkout</h1>

      <div className="mt-10">
        <h2 className="text-xl font-medium">Your Order</h2>

        <div className="mt-6 border-t pt-4">
  <div className="flex justify-between">
    <span>Subtotal</span>
    <span>
      ₹{subtotal.toLocaleString("en-IN")}
    </span>
  </div>

  <div className="mt-2 flex justify-between">
    <span>Shipping</span>
    <span>
      {shipping === 0
        ? "Free"
        : `₹${shipping.toLocaleString("en-IN")}`}
    </span>
  </div>

  <div className="mt-4 flex justify-between border-t pt-4 text-lg font-semibold">
    <span>Total</span>
    <span>
      ₹{total.toLocaleString("en-IN")}
    </span>
  </div>
</div>
      </div>
      <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-4">
        <h2 className="text-xl font-medium">Shipping Address</h2>

        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border px-4 py-3"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border px-4 py-3"
          />
        </div>

        {/* phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full border px-4 py-3"
          />
        </div>
        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full border px-4 py-3"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>

          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 w-full border px-4 py-3"
          />
        </div>

        {/* Pincode */}
        <div>
          <label htmlFor="pincode" className="block text-sm font-medium">
            Pincode
          </label>

          <input
            id="pincode"
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="mt-2 w-full border px-4 py-3"
          />
        </div>

        <button type="submit" className="w-full bg-black px-6 py-3 text-white">
          Place Order
        </button>
      </form>
    </main>
  );
}
