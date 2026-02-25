"use client";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/product";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const [items, setItems] = useState<Product[]>([]);
  const cartItems = useCartStore((state) => state.cart);
  const ids = cartItems?.map((item) => item.id).join(",");

  const displayCart = useMemo(() => {
    const productMap = new Map(items.map((item) => [item.id, item]));

    return cartItems
      ?.map((cartItem) => {
        const product = productMap.get(cartItem.id);
        // if (!product) return null;

        const price = product?.sellingPrice ?? product?.basePrice;

        return {
          ...product,
          quantity: cartItem.quantity,
          price,
          total: price ? price * cartItem.quantity : 0,
        };
      })
      .filter(Boolean);
  }, [cartItems, items]);

  const total = displayCart.reduce((sum, item) => sum + item.total, 0);
  useEffect(() => {
    fetch(`/api/products?ids=${ids}`)
      .then((res) => res.json())
      .then((data) => setItems(data.data));
  }, [ids]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-gray-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-5">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag size={22} />
              Your Cart{" "}
              <span className="text-sm font-normal text-slate-500">
                {cartItems.length} items
              </span>
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {displayCart?.length > 0 ? (
              displayCart?.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-slate-50 pb-6 last:border-0"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      width={100}
                      height={100}
                      src={item.image as string}
                      alt={item.name as string}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-slate-800 line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="font-bold text-slate-900">
                          ${item.price}
                        </p>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <button className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                <div className="rounded-full bg-slate-50 p-6 text-slate-300">
                  <ShoppingBag size={48} />
                </div>
                <p className="text-lg font-medium text-slate-900">
                  Your cart is empty
                </p>
                <button
                  onClick={onClose}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer: Totals and Checkout */}
          {items.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50 p-6 space-y-4">
              <div className="flex justify-between text-base font-medium text-slate-900">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-500">
                Shipping and taxes calculated at checkout.
              </p>

              <button className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-700">
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
