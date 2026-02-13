"use client";

import React, { useState } from "react";
import {
  Truck,
  CreditCard,
  Banknote,
  MapPin,
  ChevronRight,
  PackageCheck,
} from "lucide-react";

const CheckoutPage = () => {
  // Static Cart Data
  const cartItems = [
    {
      id: 1,
      name: "Quantum Sonic Headphones",
      price: 199,
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    },
    {
      id: 3,
      name: "Ultra-Light Running Shoes",
      price: 95,
      quantity: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
    },
  ];

  const [location, setLocation] = useState<"inside" | "outside">("inside");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

  // Calculation Logic
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryCharge = location === "inside" ? 60 : 120;
  const total = subtotal + deliveryCharge;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 md:py-16">
      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Delivery & Payment (8 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <MapPin className="text-blue-600" size={22} />
              Delivery Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setLocation("inside")}
                className={`flex flex-col gap-1 p-4 rounded-xl border-2 text-left transition-all ${
                  location === "inside"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-slate-900">Inside Dhaka</span>
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${location === "inside" ? "border-blue-600 bg-blue-600" : "border-slate-300"}`}
                  />
                </div>
                <p className="text-sm text-slate-500">2-3 Days Delivery</p>
                <span className="mt-2 font-bold text-blue-600">৳60</span>
              </button>

              <button
                onClick={() => setLocation("outside")}
                className={`flex flex-col gap-1 p-4 rounded-xl border-2 text-left transition-all ${
                  location === "outside"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-slate-900">
                    Outside Dhaka
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${location === "outside" ? "border-blue-600 bg-blue-600" : "border-slate-300"}`}
                  />
                </div>
                <p className="text-sm text-slate-500">5-7 Days Delivery</p>
                <span className="mt-2 font-bold text-blue-600">৳120</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Banknote className="text-emerald-600" size={22} />
              Select Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === "cod"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-100 text-slate-600"
                }`}
              >
                <Banknote size={24} />
                <div className="text-left">
                  <p className="font-bold">Cash on Delivery</p>
                  <p className="text-[10px] opacity-70 uppercase tracking-tighter">
                    Pay when you receive
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === "card"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-100 text-slate-600"
                }`}
              >
                <CreditCard size={24} />
                <div className="text-left">
                  <p className="font-bold">Online Payment</p>
                  <p className="text-[10px] opacity-70 uppercase tracking-tighter">
                    SSL Commerz / bKash
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Order Review (5 Columns) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <PackageCheck size={20} className="text-blue-600" />
                Review Your Order
              </h2>
            </div>

            <div className="p-6">
              {/* Item List Summary */}
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-14 w-14 rounded-lg bg-slate-100 overflow-hidden border border-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        ৳{item.price.toLocaleString()} per unit
                      </p>
                    </div>
                    <p className="font-bold text-slate-900">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charge</span>
                  <span className="font-semibold">৳{deliveryCharge}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-dashed border-slate-200 mt-4">
                  <div>
                    <span className="text-lg font-bold text-slate-900 block leading-tight">
                      Total Amount
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      Inclusive of VAT
                    </span>
                  </div>
                  <span className="text-3xl font-black text-blue-600">
                    ৳{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="group mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                Place Order Now
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <p className="text-center text-[11px] text-slate-400 mt-4">
                By clicking "Place Order Now", you agree to our Terms &
                Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
