"use client";

import Button from "@/components/ui/Button";
import type { Product } from "@/types/product";
import { useCart } from "./cartContext";

type AddToCartButtonProps = {
  product: Product;
  quantity: number;
  size: string;
  disabled?: boolean;
};

export default function AddToCartButton({
  product,
  quantity,
  size,
  disabled = false,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      disabled={disabled}
      onClick={() => addToCart(product, quantity, size)}
    >
      Add to Cart
    </Button>
  );
}