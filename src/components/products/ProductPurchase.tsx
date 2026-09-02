"use client";

import { useState } from "react";

import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";

import AddToCartButton from "../cart/AddToCartButton";

import type { Product } from "@/types/product";

type ProductPurchaseProps = {
  product: Product;
};

export default function ProductPurchase({
  product,
}: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="mt-8">

      {/* =====================================================
          SIZE
      ====================================================== */}
      <SizeSelector
        selectedSize={selectedSize}
        onChange={(size) => {
          setSelectedSize(size);
          setError("");
        }}
      />

      {/* =====================================================
          COLOR
          Visual UI for the current Figma design.
          Real product colors will come from the database later.
      ====================================================== */}
      <div className="mt-7">
        <h2 className="text-sm font-semibold text-gray-900">
          Color:{" "}
          <span className="font-normal">
            Blue
          </span>
        </h2>

        <div className="mt-3 flex items-center gap-3">
          {/* Blue */}
          <button
            type="button"
            aria-label="Select blue color"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black"
          >
            <span className="h-8 w-8 rounded-full bg-blue-300" />
          </button>

          {/* Black */}
          <button
            type="button"
            aria-label="Select black color"
            className="h-10 w-10 rounded-full border border-transparent p-1 transition hover:border-gray-400"
          >
            <span className="block h-8 w-8 rounded-full bg-black" />
          </button>

          {/* Pink */}
          <button
            type="button"
            aria-label="Select pink color"
            className="h-10 w-10 rounded-full border border-transparent p-1 transition hover:border-gray-400"
          >
            <span className="block h-8 w-8 rounded-full bg-pink-200" />
          </button>
        </div>
      </div>

      {/* =====================================================
          QUANTITY + ADD TO CART
      ====================================================== */}
      <div className="mt-7">
        <h2 className="mb-3 text-sm font-semibold text-gray-900">
          Quantity
        </h2>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <QuantitySelector
            quantity={quantity}
            onChange={setQuantity}
          />

          <div className="flex-1">
            <AddToCartButton
              product={product}
              quantity={quantity}
              size={selectedSize}
              onInvalid={() =>
                setError("Please select a size before adding this product.")
              }
            />
          </div>
        </div>
      </div>

      {/* Validation error */}
      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Helpful purchase message */}
      {!selectedSize && (
        <p className="mt-3 text-xs text-gray-400">
          Please select a size before adding this product
          to your cart.
        </p>
      )}
    </div>
  );
}