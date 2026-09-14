"use client";

import Button from "@/components/ui/Button";
import type { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { useAuth } from "../auth/authContext";
import { useCart } from "./cartContext";
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
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const { openCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!size) {
      onInvalid?.();
      return;
    }

    if (!isLoggedIn) {
      router.push("/sign-in?redirect=/products");
      return;
    }

    dispatch(
      addToCart({
        product,
        quantity,
        size,
      })
    );

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