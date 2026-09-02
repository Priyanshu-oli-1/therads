"use client";

import Button from "@/components/ui/Button";
import type { Product } from "@/types/product";
import { useCart } from "./cartContext";
import { useAuth } from "../auth/authContext";
import { useRouter } from "next/navigation";

type AddToCartButtonProps = {
  product: Product;
  quantity: number;
  size: string;
  disabled?: boolean;
  onInvalid?: () => void;
};

export default function AddToCartButton({
  product,
  quantity,
  size,
  disabled = false,
  onInvalid,
}: AddToCartButtonProps) {
  const { addToCart, openCart } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Check login before adding
  const handleAddToCart = () => {
    if (!size) {
      onInvalid?.();
      return;
    }

    if (!isLoggedIn) {
      router.push("/sign-in?redirect=/products");
      return;
    }

    addToCart(product, quantity, size);
    openCart();
  };

  return (
    <Button
      disabled={disabled}
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
}