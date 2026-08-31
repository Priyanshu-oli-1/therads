"use client";

import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";
import AddToCartButton from "../cart/AddToCartButton";
import type { Product } from "@/types/product";

type ProductPurchaseProps = {
  product: Product;
};

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="mt-8 border-t pt-8">
      <SizeSelector selectedSize={selectedSize} onChange={setSelectedSize} />

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold">Quantity</h2>

        <QuantitySelector quantity={quantity} onChange={setQuantity} />
      </div>
      {selectedSize && (
        <p className="mt-4 text-sm text-gray-500">
          Size: {selectedSize} · Quantity: {quantity}
        </p>
      )}
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="mt-6">
        <AddToCartButton
          product={product}
          quantity={quantity}
          size={selectedSize}
          disabled={!selectedSize}
        />
      </div>
    </div>
  );
}
