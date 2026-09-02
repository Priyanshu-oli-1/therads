"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Product } from "@/types/product";

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

type CartContextType = {
  cart: CartItem[];

  isCartOpen: boolean;

  addToCart: (
    product: Product,
    quantity: number,
    size: string
  ) => void;

  removeFromCart: (
    productId: number,
    size?: string
  ) => void;

  updateQuantity: (
    productId: number,
    quantity: number,
    size?: string
  ) => void;

  openCart: () => void;
  closeCart: () => void;
};

const CartContext =
  createContext<
    CartContextType | undefined
  >(undefined);

const CART_STORAGE_KEY =
  "threads-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [isLoaded, setIsLoaded] =
    useState(false);

  /*
    Load saved cart.
  */
  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem(
          CART_STORAGE_KEY
        );

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /*
    Save cart whenever it changes.
  */
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cart, isLoaded]);

  /*
    Add product to cart.

    Same product + same size = increase quantity.
  */
  const addToCart = (
    product: Product,
    quantity: number,
    size: string
  ) => {
    setCart((currentCart) => {
      const existingItem =
        currentCart.find(
          (item) =>
            item.product.id === product.id &&
            item.size === size
        );

      if (existingItem) {
        return currentCart.map(
          (item) =>
            item.product.id === product.id &&
            item.size === size
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    quantity,
                }
              : item
        );
      }

      return [
        ...currentCart,
        {
          product,
          quantity,
          size,
        },
      ];
    });

    /*
      Open drawer after adding item.
    */
    setIsCartOpen(true);
  };

  const removeFromCart = (
    productId: number,
    size?: string
  ) => {
    setCart((currentCart) =>
      currentCart.filter((item) => {
        if (
          item.product.id !== productId
        ) {
          return true;
        }

        if (
          size !== undefined &&
          item.size !== size
        ) {
          return true;
        }

        return false;
      })
    );
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    size?: string
  ) => {
    if (quantity < 1) {
      removeFromCart(
        productId,
        size
      );

      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) => {
        const sameProduct =
          item.product.id ===
          productId;

        const sameSize =
          size === undefined ||
          item.size === size;

        if (
          sameProduct &&
          sameSize
        ) {
          return {
            ...item,
            quantity,
          };
        }

        return item;
      })
    );
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}