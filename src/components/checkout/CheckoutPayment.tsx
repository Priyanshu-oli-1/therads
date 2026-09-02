"use client";

export default function CheckoutPayment() {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-3xl font-semibold">
        Payment
      </h2>

      <div className="mt-6 bg-gray-50 p-3">
        {/* Payment method */}
        <div className="flex h-12 items-center justify-between border border-gray-300 bg-white px-4">
          <span className="text-sm text-gray-600">
            Credit Card
          </span>

          <div className="flex items-center gap-3">
            {/* Simple card brand representation */}
            <div className="flex items-center">
              <span className="h-3 w-5 rounded-full bg-red-500" />
              <span className="-ml-2 h-3 w-5 rounded-full bg-yellow-500" />
            </div>

            <span className="text-gray-500">
              ⌄
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-3">
          {/* Card number */}
          <div className="relative">
            <label
              htmlFor="card-number"
              className="sr-only"
            >
              Card Number
            </label>

            <input
              id="card-number"
              type="text"
              inputMode="numeric"
              placeholder="Card Number"
              className="h-12 w-full border border-gray-300 bg-white px-4 pr-12 text-sm outline-none focus:border-black"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔒
            </span>
          </div>

          {/* Expiration / security */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="expiration"
                className="sr-only"
              >
                Expiration Date
              </label>

              <input
                id="expiration"
                type="text"
                placeholder="Expiration Date"
                className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="security-code"
                className="sr-only"
              >
                Security Code
              </label>

              <input
                id="security-code"
                type="text"
                inputMode="numeric"
                placeholder="Security Code"
                className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Card holder */}
          <div>
            <label
              htmlFor="card-holder"
              className="sr-only"
            >
              Card Holder Name
            </label>

            <input
              id="card-holder"
              type="text"
              placeholder="Card Holder Name"
              className="h-12 w-full border border-gray-300 bg-white px-4 text-sm outline-none focus:border-black"
            />
          </div>

          {/* Save card information */}
          <label className="flex cursor-pointer items-center gap-3 pt-2 text-xs text-gray-500">
            <input
              type="checkbox"
              className="h-5 w-5 appearance-none border-2 border-black checked:bg-black"
            />

            Save This Info For Future
          </label>
        </div>
      </div>
    </section>
  );
}