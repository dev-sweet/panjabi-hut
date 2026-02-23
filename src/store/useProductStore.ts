import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Product {
  id: string;
  quantity: number;
}

interface ProductState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (productId: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),
    }),
    {
      name: "carts",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
