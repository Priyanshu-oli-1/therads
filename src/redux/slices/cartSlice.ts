import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        size: string;
      }>
    ) => {
      const existingItem = state.items.find(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
          size: action.payload.size,
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: number;
        size: string;
      }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.product.id === action.payload.productId &&
            item.size === action.payload.size
          )
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        size: string;
        quantity: number;
      }>
    ) => {
      if (action.payload.quantity < 1) {
        state.items = state.items.filter(
          (item) =>
            !(
              item.product.id === action.payload.productId &&
              item.size === action.payload.size
            )
        );

        return;
      }

      const item = state.items.find(
        (item) =>
          item.product.id === action.payload.productId &&
          item.size === action.payload.size
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;