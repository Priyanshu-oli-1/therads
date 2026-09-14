"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { checkoutSchema } from "@/schema/validation/checkout";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useAuth } from "@/components/auth/authContext";

import CheckoutContact from "./CheckoutContact";
import CheckoutDelivery from "./CheckoutDelivery";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutSummary from "./CheckoutSummary";

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
};

export default function CheckoutForm() {
  const router = useRouter();

  const cart = useSelector(
  (state: RootState) => state.cart.items
);
  const { isLoggedIn } = useAuth();

  // Customer information.
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Delivery information.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  // Validation errors.
  const [errors, setErrors] = useState<FieldErrors>({});

  // Redirect unauthenticated users to sign in.
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/sign-in?redirect=/checkout");
    }
  }, [isLoggedIn, router]);

  // Wait for authentication before rendering checkout.
  if (!isLoggedIn) {
    return null;
  }

  // Show an empty-cart message when there are no products.
  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-semibold">
            Your Cart Is Empty
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Add something to your cart before continuing to checkout.
          </p>

          <button
            type="button"
            onClick={() => router.push("/products")}
            className="mt-8 bg-black px-8 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  // Calculate the current cart subtotal.
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Existing THREADS shipping rule:
  // Orders of ₹5,000 or more receive free shipping.
  const shipping = subtotal >= 5000 ? 0 : 199;

  // Calculate the final order total.
  const total = subtotal + shipping;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Combine first and last name because
    // the current checkout schema expects one `name`.
    const name = `${firstName} ${lastName}`.trim();

    // Validate checkout information with Zod.
    const result = checkoutSchema.safeParse({
      name,
      email,
      phone,
      address,
      city,
      pincode,
    });

    // Convert Zod validation errors into
    // field-specific messages.
    if (!result.success) {
      const nextErrors: FieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;

        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      });

      setErrors(nextErrors);

      return;
    }

    // Clear previous validation errors.
    setErrors({});

    // Create the order object.
    // This will later be sent to our backend.
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
        size: item.size,
      })),

      subtotal,
      shipping,
      total,
    };

    // For now, inspect the order in the browser console.
    // Later this will become an API/server action request.
    console.log("Order:", order);
  }

  return (
    <main className="w-full bg-white">
      {/* 
        Checkout uses the same max-w-7xl width system
        as the Navbar and other major sections.
        
        There is intentionally NO gap between the
        left checkout form and right order summary.
      */}
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-stretch lg:grid-cols-[minmax(0,1fr)_420px]">
        {/* ==========================================
            LEFT SIDE — CHECKOUT FORM
        =========================================== */}
        <div className="border-r border-gray-200 px-6 py-10 sm:px-10 lg:px-12">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Contact information */}
            <CheckoutContact
              email={email}
              onEmailChange={setEmail}
              error={errors.email}
            />

            {/* Delivery information */}
            <CheckoutDelivery
              firstName={firstName}
              lastName={lastName}
              address={address}
              city={city}
              pincode={pincode}
              country={country}
              errors={{
                name: errors.name,
                address: errors.address,
                city: errors.city,
                pincode: errors.pincode,
              }}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onAddressChange={setAddress}
              onCityChange={setCity}
              onPincodeChange={setPincode}
              onCountryChange={setCountry}
            />

            {/* 
              Phone is kept here because it is part
              of the existing checkout functionality.
            */}
            <div className="mt-4">
              <label
                htmlFor="checkout-phone"
                className="sr-only"
              >
                Phone Number
              </label>

              <input
                id="checkout-phone"
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone Number"
                autoComplete="tel"
                className={`h-12 w-full border px-4 text-sm outline-none transition focus:border-black ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {errors.phone && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Payment section */}
            <CheckoutPayment />

            {/* Submit order */}
            <button
              type="submit"
              className="mt-8 h-14 w-full bg-black text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Pay Now
            </button>
          </form>
        </div>

        {/* ==========================================
            RIGHT SIDE — ORDER SUMMARY
        =========================================== */}
        <CheckoutSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
        />
      </div>
    </main>
  );
}