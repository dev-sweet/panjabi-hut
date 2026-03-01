"use client";

import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/product";
import { X, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const cartItems = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const ids = useMemo(() => {
    return cartItems?.map((item) => item.id).join(",") || "";
  }, [cartItems]);

  useEffect(() => {
    if (!ids) {
      setItems([]);
      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?ids=${ids}`,
        );
        const data = await res.json();
        setItems(data.data || []);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [ids]);

  const displayCart = useMemo(() => {
    if (!cartItems || !items.length) return [];
    const productMap = new Map(items.map((item) => [item.id, item]));

    return cartItems
      .map((cartItem) => {
        const product = productMap.get(cartItem.id);
        if (!product) return null;
        const price = product.sellingPrice ?? product.basePrice;
        return {
          ...product,
          quantity: cartItem.quantity,
          currentPrice: price,
          rowTotal: price * cartItem.quantity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [cartItems, items]);

  const subtotal = displayCart.reduce((sum, item) => sum + item.rowTotal, 0);

  if (!isHydrated) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5 bg-zinc-950">
            <div className="flex items-center gap-2">
              <ShoppingBag size={22} className="text-blue-500" />
              <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
              <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800">
            {isLoading && items.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
              </div>
            ) : displayCart.length > 0 ? (
              <div className="space-y-6">
                {displayCart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-zinc-900 pb-6 last:border-0"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
                      <Image
                        fill
                        src={item.image}
                        alt={item.name}
                        className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-zinc-100 line-clamp-1 pr-2">
                            {item.name}
                          </h3>
                          <p className="font-bold text-white">
                            ${(item.currentPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">
                          Qty: {item.quantity} × ${item.currentPrice.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 w-fit text-xs font-medium text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-full bg-zinc-900 p-6 text-zinc-700">
                  <ShoppingBag size={48} />
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-200">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-zinc-500">
                    Time to fill it with something awesome.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-blue-500 font-semibold hover:text-blue-400 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-zinc-800 bg-zinc-900/50 p-6 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-zinc-500">
                Shipping and taxes calculated at checkout.
              </p>

              <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-500 active:scale-[0.98] shadow-lg shadow-blue-900/20">
                Checkout Now
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
