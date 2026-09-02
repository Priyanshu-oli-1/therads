"use client";

type CheckoutContactProps = {
  email: string;
  onEmailChange: (value: string) => void;
  error?: string;
};

export default function CheckoutContact({
  email,
  onEmailChange,
  error,
}: CheckoutContactProps) {
  return (
    <section>
      {/* Section heading */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-semibold">
          Contact
        </h2>

        <p className="text-xs text-gray-500">
          Have an account?{" "}
          <a
            href="/sign-in?redirect=/checkout"
            className="text-blue-600 hover:underline"
          >
            Create Account
          </a>
        </p>
      </div>

      {/* Email */}
      <div className="mt-6">
        <label
          htmlFor="checkout-email"
          className="sr-only"
        >
          Email Address
        </label>

        <input
          id="checkout-email"
          type="email"
          value={email}
          onChange={(event) =>
            onEmailChange(event.target.value)
          }
          placeholder="Email Address"
          autoComplete="email"
          className={`h-12 w-full border bg-white px-4 text-sm outline-none transition ${
            error
              ? "border-red-500"
              : "border-gray-300 focus:border-black"
          }`}
        />

        {error && (
          <p className="mt-2 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}