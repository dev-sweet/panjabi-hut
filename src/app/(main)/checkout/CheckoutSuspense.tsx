"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  PackageCheck,
  Truck,
  MapPin,
  Banknote,
  CreditCard,
  Shield,
  Sparkles,
  Check,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type Location = "inside" | "outside" | "";

type CheckoutItem = Product & {
  quantity: number;
  price: number;
  subTotal: number;
};

export default function CheckoutPage() {
  const [location, setLocation] = useState<Location>("");
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    deliveryLocation: "",
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const qty = searchParams.get("qty");

  const params = useParams();
  const { cart: storedCart } = useCartStore();
  const cartItems = useMemo(() => {
    if (id) {
      return [{ id, quantity: parseInt(qty || "1") }];
    }
    return storedCart;
  }, [id, qty, storedCart]);

  const itemsIds = useMemo(
    () => cartItems.map((item) => item.id).join(","),
    [cartItems],
  );

  const subTotal = checkoutItems.reduce((acc, item) => acc + item.subTotal, 0);

  const delivery =
    location === "inside" ? 60 : location === "outside" ? 120 : 0;

  const total = subTotal + delivery;

  const updateQty = (id: string, delta: number) => {
    setCheckoutItems((prev: CheckoutItem[]) =>
      prev.map((item: CheckoutItem) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + delta,
              subTotal: item.price * (item.quantity + delta),
            }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCheckoutItems((prev: CheckoutItem[]) =>
      prev.filter((item) => item.id !== id),
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const order = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      location,
      items: [
        ...checkoutItems.map((item) => ({ id: item.id, qty: item.quantity })),
      ],
    };

    console.log(order);
    // setConfirmed(true);
  };
  useEffect(() => {
    fetch(`/api/products?ids=${itemsIds}`)
      .then((res) => res.json())
      .then((data) => {
        const products = data.data;
        if (!products) return;

        const items = products.map((product: Product) => {
          const item = cartItems?.find((item) => item.id === product.id);
          return {
            ...product,
            quantity: item ? item.quantity : 1,
            price: product.sellingPrice || product.basePrice,
            subTotal:
              (product.sellingPrice || product.basePrice) *
              (item ? item.quantity : 1),
          };
        });
        setCheckoutItems(items);
        setIsLoading(false);
      });
  }, [itemsIds]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-zinc-800">
            <svg
              className="w-6 h-6 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M16 19a1 1 0 110 2 1 1 0 010-2zM8 19a1 1 0 110 2 1 1 0 010-2z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-white">No items found</h2>

          {/* Description */}
          <p className="mt-2 mb-5 text-sm text-zinc-400">
            Your checkout is empty. Add products to continue.
          </p>

          {/* Button */}
          <Link
            href="/shop"
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-4 px-4 rounded-xl font-medium transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <Check size={40} className="text-black" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p>Total: ৳{total}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
        {/* LEFT - SUMMARY */}
        <div className="lg:col-span-5 bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-4">
          <h2 className="font-bold flex items-center gap-2">
            <PackageCheck size={18} className="text-green-400" />
            Order Summary
          </h2>

          {checkoutItems?.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border-b border-zinc-800 pb-4"
            >
              <Image
                width={200}
                height={200}
                alt={item.name}
                src={item.image}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                {/* <p className="text-sm text-zinc-400">{item.color}</p> */}

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? removeItem(item.id)
                        : updateQty(item.id, -1)
                    }
                    className="p-1 bg-zinc-800 rounded"
                  >
                    {item.quantity === 1 ? (
                      <Trash2 size={14} />
                    ) : (
                      <Minus size={14} />
                    )}
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="p-1 bg-zinc-800 rounded"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="font-bold">
                <p className="text-sm text-gray-300 text-right">
                  ৳{item.price}
                </p>
                <p className="text-sm text-gray-300 text-right">
                  X {item.quantity}
                </p>
                <p>৳{item.price * item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Sub Total</span>
              <span>৳{subTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-zinc-400">
              <span>Delivery</span>
              <span>৳{delivery}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-green-400 border-t border-zinc-800 pt-3">
              <span>Total</span>
              <span>৳{total}</span>
            </div>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="lg:col-span-7 bg-zinc-900 rounded-2xl border border-zinc-800 p-6 space-y-6">
          <h2 className="font-bold text-lg">Delivery Information</h2>

          <div className="space-y-4">
            <input
              name="fullName"
              onChange={handleChange}
              className="w-full p-3 bg-zinc-800 rounded-xl"
              placeholder="Full Name"
            />
            <input
              name="phone"
              onChange={handleChange}
              className="w-full p-3 bg-zinc-800 rounded-xl"
              placeholder="Phone"
            />
            <textarea
              name="address"
              onChange={handleChange}
              className="w-full p-3 bg-zinc-800 rounded-xl"
              placeholder="Address"
            />
            <h2 className="font-bold text-lg">Delivery Location</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  val: "inside" as Location,
                  title: "Inside Dhaka",
                  sub: "2–3 Business Days",
                  price: "৳60",
                  icon: Truck,
                },
                {
                  val: "outside" as Location,
                  title: "Outside Dhaka",
                  sub: "5–7 Business Days",
                  price: "৳120",
                  icon: MapPin,
                },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setLocation(opt.val)}
                  className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    location === opt.val
                      ? "border-green-500 bg-green-500/10"
                      : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                  }`}
                >
                  <opt.icon
                    size={18}
                    className={`transition-colors ${
                      location === opt.val
                        ? "text-green-400"
                        : "text-zinc-400 group-hover:text-white"
                    }`}
                  />

                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{opt.title}</p>
                    <p className="text-xs text-zinc-500">{opt.sub}</p>
                  </div>

                  <span
                    className={`text-sm font-semibold ${
                      location === opt.val ? "text-green-400" : "text-white"
                    }`}
                  >
                    {opt.price}
                  </span>
                </button>
              ))}
            </div>

            <h2 className="font-bold text-lg mt-6">Payment Method</h2>
            <div className="flex items-center gap-4">
              <div className="p-5 rounded-2xl border-2 border-green-400 bg-green-400/10 flex items-center gap-4">
                <Banknote size={20} className="text-green-400" />
                <div>
                  <p className="font-bold text-green-400">Cash on Delivery</p>
                  <p className="text-sm text-zinc-400">Pay when it arrives</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border-2 border-zinc-800 bg-zinc-800 opacity-50 mt-3 flex items-center gap-4">
                <CreditCard size={20} className="text-zinc-400" />
                <div>
                  <p className="font-bold">Online Payment</p>
                  <p className="text-sm text-zinc-400">Coming Soon</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-4">
              <Shield size={12} className="text-green-400" />
              Secure Checkout
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-6 px-6 py-3 bg-green-500 text-black rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              Confirm Order
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
