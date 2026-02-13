"use client";

import React from "react";
import {
  ArrowLeft,
  Printer,
  Truck,
  Package,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  CreditCard,
} from "lucide-react";

const OrderDetailsPage = () => {
  // Static Order Data
  const order = {
    id: "ORD-99124",
    date: "Feb 12, 2026",
    time: "02:30 PM",
    status: "Processing",
    paymentStatus: "Paid",
    paymentMethod: "bKash",
    shippingMethod: "Home Delivery",
    customer: {
      name: "Siam Ahmed",
      email: "siam.ahmed@email.com",
      phone: "+880 1712 345678",
      address: "House 12, Road 5, Block C, Banani, Dhaka 1213",
    },
    items: [
      {
        id: 1,
        name: "Quantum Sonic Headphones",
        price: 199,
        qty: 1,
        total: 199,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200",
      },
      {
        id: 3,
        name: "Ultra-Light Running Shoes",
        price: 95,
        qty: 2,
        total: 190,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200",
      },
    ],
    subtotal: 389,
    deliveryCharge: 60,
    discount: 15,
    total: 434,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white rounded-full border border-transparent hover:border-slate-200 transition-all text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              Order {order.id}
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full uppercase border border-amber-100">
                {order.status}
              </span>
            </h1>
            <p className="text-sm text-slate-500">
              Placed on {order.date} at {order.time}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Printer size={18} /> Print Invoice
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 shadow-md shadow-blue-100">
            Ship Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items & Timeline (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Package size={20} className="text-blue-600" /> Items Summary
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="p-6 flex items-center gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover border border-slate-100"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      ৳{item.price} × {item.qty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">৳{item.total}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50/50 flex flex-col items-end space-y-2">
              <div className="flex justify-between w-full max-w-[240px] text-sm text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  ৳{order.subtotal}
                </span>
              </div>
              <div className="flex justify-between w-full max-w-[240px] text-sm text-slate-500">
                <span>Delivery Fee</span>
                <span className="font-semibold text-slate-900">
                  ৳{order.deliveryCharge}
                </span>
              </div>
              <div className="flex justify-between w-full max-w-[240px] text-sm text-rose-500">
                <span>Discount</span>
                <span className="font-semibold">-৳{order.discount}</span>
              </div>
              <div className="flex justify-between w-full max-w-[240px] pt-2 border-t border-slate-200 mt-2">
                <span className="font-bold text-slate-900">Total Amount</span>
                <span className="font-black text-xl text-blue-600">
                  ৳{order.total}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Tracking */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" /> Order Activity
            </h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-[11px] before:top-2 before:h-[calc(100%-24px)] before:w-0.5 before:bg-slate-100">
              <div className="relative pl-8">
                <span className="absolute left-0 top-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white">
                  <CheckCircle2 size={12} className="text-blue-600" />
                </span>
                <p className="text-sm font-bold text-slate-900">
                  Order Confirmed
                </p>
                <p className="text-xs text-slate-500">
                  Feb 12, 2026 — 02:30 PM
                </p>
              </div>
              <div className="relative pl-8">
                <span className="absolute left-0 top-1 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white">
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                </span>
                <p className="text-sm font-bold text-slate-400">
                  Order Shipped
                </p>
                <p className="text-xs text-slate-400">Awaiting processing...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer & Shipping (1/3) */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User size={18} className="text-blue-600" /> Customer Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {order.customer.name}
                  </p>
                  <p className="text-xs text-slate-500">12 previous orders</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-50">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} /> {order.customer.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} /> {order.customer.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-rose-500" /> Shipping Address
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {order.customer.address}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-50 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Method</span>
                <span className="text-slate-900 font-bold">
                  {order.shippingMethod}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Tracking ID</span>
                <span className="text-blue-600 font-bold underline cursor-pointer">
                  Not Assigned
                </span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-emerald-500" /> Payment Info
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-emerald-50 text-emerald-600 rounded flex items-center justify-center font-bold text-[10px]">
                  {order.paymentMethod}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {order.paymentMethod} Payment
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 uppercase tracking-tighter">
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
