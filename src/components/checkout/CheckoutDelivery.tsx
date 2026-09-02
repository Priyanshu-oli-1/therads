"use client";

type CheckoutDeliveryProps = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  pincode: string;
  country: string;

  errors: {
    name?: string;
    address?: string;
    city?: string;
    pincode?: string;
  };

  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onPincodeChange: (value: string) => void;
  onCountryChange: (value: string) => void;
};

export default function CheckoutDelivery({
  firstName,
  lastName,
  address,
  city,
  pincode,
  country,
  errors,
  onFirstNameChange,
  onLastNameChange,
  onAddressChange,
  onCityChange,
  onPincodeChange,
  onCountryChange,
}: CheckoutDeliveryProps) {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-3xl font-semibold">
        Delivery
      </h2>

      <div className="mt-6 space-y-3">
        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="sr-only"
          >
            Country / Region
          </label>

          <select
            id="country"
            value={country}
            onChange={(event) =>
              onCountryChange(event.target.value)
            }
            className="h-12 w-full appearance-none border border-gray-300 bg-white px-4 text-sm text-gray-500 outline-none focus:border-black"
          >
            <option value="">
              Country / Region
            </option>

            <option value="India">India</option>
            <option value="United States">
              United States
            </option>
            <option value="United Kingdom">
              United Kingdom
            </option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        {/* First name / Last name */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="sr-only"
            >
              First Name
            </label>

            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(event) =>
                onFirstNameChange(event.target.value)
              }
              placeholder="First Name"
              autoComplete="given-name"
              className="h-12 w-full border border-gray-300 px-4 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="sr-only"
            >
              Last Name
            </label>

            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(event) =>
                onLastNameChange(event.target.value)
              }
              placeholder="Last Name"
              autoComplete="family-name"
              className="h-12 w-full border border-gray-300 px-4 text-sm outline-none focus:border-black"
            />
          </div>
        </div>

        {errors.name && (
          <p className="text-xs text-red-500">
            {errors.name}
          </p>
        )}

        {/* Address */}
        <div>
          <label
            htmlFor="checkout-address"
            className="sr-only"
          >
            Address
          </label>

          <input
            id="checkout-address"
            type="text"
            value={address}
            onChange={(event) =>
              onAddressChange(event.target.value)
            }
            placeholder="Address"
            autoComplete="street-address"
            className={`h-12 w-full border px-4 text-sm outline-none focus:border-black ${
              errors.address
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.address && (
            <p className="mt-2 text-xs text-red-500">
              {errors.address}
            </p>
          )}
        </div>

        {/* City / Postal Code */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="checkout-city"
              className="sr-only"
            >
              City
            </label>

            <input
              id="checkout-city"
              type="text"
              value={city}
              onChange={(event) =>
                onCityChange(event.target.value)
              }
              placeholder="City"
              autoComplete="address-level2"
              className={`h-12 w-full border px-4 text-sm outline-none focus:border-black ${
                errors.city
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="checkout-pincode"
              className="sr-only"
            >
              Postal Code
            </label>

            <input
              id="checkout-pincode"
              type="text"
              inputMode="numeric"
              value={pincode}
              onChange={(event) =>
                onPincodeChange(event.target.value)
              }
              placeholder="Postal Code"
              autoComplete="postal-code"
              className={`h-12 w-full border px-4 text-sm outline-none focus:border-black ${
                errors.pincode
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>
        </div>

        {(errors.city || errors.pincode) && (
          <p className="text-xs text-red-500">
            {errors.city ?? errors.pincode}
          </p>
        )}

        {/* Save information */}
        <label className="flex cursor-pointer items-center gap-3 pt-3 text-xs text-gray-500">
          <input
            type="checkbox"
            className="h-5 w-5 appearance-none border-2 border-black checked:bg-black"
          />

          Save This Info For Future
        </label>
      </div>
    </section>
  );
}