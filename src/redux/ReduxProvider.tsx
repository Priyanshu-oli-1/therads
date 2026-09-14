"use client";

import { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { store, type RootState } from "./store";
import { setCart } from "./slices/cartSlice";

const CART_STORAGE_KEY = "threads-cart";

function CartPersistence() {
  const dispatch = useDispatch();
  const cart = useSelector(
    (state: RootState) => state.cart.items
  );

  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(
        CART_STORAGE_KEY
      );

      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    }

    hydrated.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated.current) {
      return;
    }

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  return null;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
    </Provider>
  );
}