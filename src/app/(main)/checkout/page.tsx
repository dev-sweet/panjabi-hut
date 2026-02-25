"use client";

import React, { useState } from "react";
import {
  MapPin,
  ChevronRight,
  PackageCheck,
  Banknote,
  CreditCard,
  User,
  Phone,
  Mail,
  Home,
  Truck,
  Shield,
  Sparkles,
  Check,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

/* ─── TYPES ─── */
type Location = "inside" | "outside";
type Payment = "cod" | "card";
type Step = 1 | 2 | 3;

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  imageUrl: string;
}

/* ─── DATA ─── */
const INITIAL_CART: CartItem[] = [
  {
    id: 1,
    name: "Quantum Sonic Headphones",
    price: 199,
    quantity: 1,
    color: "Midnight Black",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
  },
  {
    id: 3,
    name: "Ultra-Light Running Shoes",
    price: 95,
    quantity: 2,
    color: "Signal Orange",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
  },
];

/* ─── STEP INDICATOR ─── */
function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: "Details" },
    { n: 2, label: "Delivery" },
    { n: 3, label: "Payment" },
  ];
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((s, i) => (
        <React.Fragment key={s.n}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-500 ${
                current > s.n
                  ? "bg-[#3ddc68] border-[#3ddc68] text-[#0a0a0a]"
                  : current === s.n
                    ? "border-[#3ddc68] text-[#3ddc68] bg-transparent scale-110 shadow-lg shadow-[#3ddc68]/20"
                    : "border-[#2a2a2a] text-[#444] bg-transparent"
              }`}
            >
              {current > s.n ? <Check size={14} strokeWidth={3} /> : s.n}
            </div>
            <span
              className={`text-[10px] font-semibold tracking-widest uppercase transition-colors ${
                current >= s.n ? "text-[#3ddc68]" : "text-[#444]"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 mx-2 mb-5">
              <div className="h-[2px] bg-[#1e1e1e] relative overflow-hidden rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-[#3ddc68] transition-all duration-700"
                  style={{ width: current > s.n ? "100%" : "0%" }}
                />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── FLOATING INPUT ─── */
function FloatingInput({
  label,
  type = "text",
  placeholder,
  icon: Icon,
}: {
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ElementType;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="relative group">
      <label
        className={`absolute text-xs font-semibold tracking-wider uppercase transition-all duration-200 pointer-events-none z-10 ${
          focused || value
            ? "-top-2.5 text-[10px] text-[#3ddc68] left-3 bg-[#161616] px-1"
            : "top-3.5 left-11 text-[#555]"
        }`}
      >
        {label}
      </label>
      <div
        className={`absolute left-4 top-3.5 transition-colors duration-200 ${focused ? "text-[#3ddc68]" : "text-[#444]"}`}
      >
        <Icon size={16} />
      </div>
      <input
        type={type}
        placeholder={focused ? placeholder : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full pl-10 pr-4 pt-4 pb-2 border rounded-xl text-sm text-[#e8e8e8] bg-[#111] transition-all duration-200 outline-none ${
          focused
            ? "border-[#3ddc68] shadow-md shadow-[#3ddc68]/10"
            : "border-[#222] hover:border-[#2e2e2e]"
        }`}
      />
    </div>
  );
}

function FloatingTextarea({
  label,
  placeholder,
  icon: Icon,
}: {
  label: string;
  placeholder: string;
  icon: React.ElementType;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="relative group">
      <label
        className={`absolute text-xs font-semibold tracking-wider uppercase transition-all duration-200 pointer-events-none z-10 ${
          focused || value
            ? "-top-2.5 text-[10px] text-[#3ddc68] left-3 bg-[#161616] px-1"
            : "top-3.5 left-11 text-[#555]"
        }`}
      >
        {label}
      </label>
      <div
        className={`absolute left-4 top-3.5 transition-colors duration-200 ${focused ? "text-[#3ddc68]" : "text-[#444]"}`}
      >
        <Icon size={16} />
      </div>
      <textarea
        rows={3}
        placeholder={focused ? placeholder : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full pl-10 pr-4 pt-4 pb-2 border rounded-xl text-sm text-[#e8e8e8] bg-[#111] transition-all duration-200 outline-none resize-none ${
          focused
            ? "border-[#3ddc68] shadow-md shadow-[#3ddc68]/10"
            : "border-[#222] hover:border-[#2e2e2e]"
        }`}
      />
    </div>
  );
}

/* ─── MAIN ─── */
export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [location, setLocation] = useState<Location>("inside");
  const [payment, setPayment] = useState<Payment>("cod");
  const [step, setStep] = useState<Step>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [removingId, setRemovingId] = useState<number | null>(null);

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setCart((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 320);
  };

  const subtotal = cart.reduce((a, i) => a + i.price * i.quantity, 0);
  const delivery = location === "inside" ? 60 : 120;
  const total = subtotal + delivery;
  const totalQty = cart.reduce((a, i) => a + i.quantity, 0);

  const formatCard = (v: string) =>
    v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  /* ORDER CONFIRMED */
  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
          *, body { font-family: 'DM Sans', sans-serif; }
          .syne { font-family: 'Syne', sans-serif; }
          @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          .animate-fadeIn { animation: fadeIn 0.5s ease both; }
        `}</style>
        <div className="text-center max-w-md animate-fadeIn">
          <div className="relative mx-auto mb-8 w-28 h-28">
            <div className="absolute inset-0 rounded-full bg-[#3ddc68]/20 animate-ping" />
            <div className="relative w-28 h-28 bg-[#3ddc68] rounded-full flex items-center justify-center shadow-2xl shadow-[#3ddc68]/30">
              <Check size={46} className="text-[#0a0a0a]" strokeWidth={3} />
            </div>
          </div>
          <h1 className="syne text-4xl font-extrabold text-white mb-3 tracking-tight">
            Order Placed!
          </h1>
          <p className="text-[#888] mb-1 text-lg">
            Order <span className="font-bold text-[#3ddc68]">#ORD-2847</span>{" "}
            confirmed
          </p>
          <p className="text-[#555] text-sm mb-10">
            A confirmation SMS will arrive shortly.
          </p>
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { label: "Items", val: totalQty },
              { label: "Total", val: `৳${total}` },
              { label: "ETA", val: location === "inside" ? "2-3d" : "5-7d" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#111] rounded-2xl p-4 border border-[#1e1e1e]"
              >
                <p className="text-[10px] text-[#555] uppercase tracking-widest mb-1">
                  {s.label}
                </p>
                <p className="font-black text-white">{s.val}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setConfirmed(false);
              setStep(1);
              setCart(INITIAL_CART);
            }}
            className="text-sm text-[#555] hover:text-[#3ddc68] underline transition-colors"
          >
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  /* EMPTY CART */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:opsz,wght@9..40,400&display=swap');
          *, body { font-family: 'DM Sans', sans-serif; }
          .syne { font-family: 'Syne', sans-serif; }
        `}</style>
        <div className="text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="syne text-2xl font-bold text-white mb-2">
            Cart is empty
          </h2>
          <p className="text-[#555] mb-6">Add items before checking out.</p>
          <button
            onClick={() => setCart(INITIAL_CART)}
            className="bg-[#3ddc68] text-[#0a0a0a] font-bold px-6 py-3 rounded-xl text-sm"
          >
            Restore items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e8e8] py-10 px-4 md:py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *, body { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .syne { font-family: 'Syne', sans-serif; }

        @keyframes fadeIn  { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleOut { 0% { opacity:1; transform:scale(1) translateX(0); } 100% { opacity:0; transform:scale(0.9) translateX(10px); } }

        .animate-fadeIn        { animation: fadeIn  0.4s ease both; }
        .animate-slideUp       { animation: slideUp 0.5s ease both; }
        .item-removing         { animation: scaleOut 0.32s ease forwards; }

        .card                  { background:#111; border:1px solid #1e1e1e; border-radius:20px; }
        .glow-btn              { box-shadow: 0 4px 28px rgba(61,220,104,0.22); }
        .glow-btn:hover        { box-shadow: 0 6px 36px rgba(61,220,104,0.36); filter: brightness(1.08); }

        input:-webkit-autofill,
        textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #111 inset !important;
          -webkit-text-fill-color: #e8e8e8 !important;
        }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#0d0d0d; }
        ::-webkit-scrollbar-thumb { background:#222; border-radius:4px; }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 animate-slideUp">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ddc68] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3ddc68]" />
            </span>
            <span className="text-[10px] font-bold text-[#3ddc68] uppercase tracking-[0.25em]">
              Secure Checkout
            </span>
          </div>
          <h1 className="syne text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
            Complete <span className="text-[#3ddc68]">Your Order</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ══ LEFT ══ */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className="card p-6 animate-slideUp"
              style={{ animationDelay: "0.06s" }}
            >
              <StepIndicator current={step} />

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h2 className="syne text-xl font-bold text-white mb-5">
                    Who are we shipping to?
                  </h2>
                  <FloatingInput
                    label="Full Name"
                    placeholder="John Doe"
                    icon={User}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      label="Phone"
                      type="tel"
                      placeholder="017XXXXXXXX"
                      icon={Phone}
                    />
                    <FloatingInput
                      label="Email (optional)"
                      type="email"
                      placeholder="john@example.com"
                      icon={Mail}
                    />
                  </div>
                  <FloatingTextarea
                    label="Delivery Address"
                    placeholder="House, Road, Area..."
                    icon={Home}
                  />
                  <button
                    onClick={() => setStep(2)}
                    className="group mt-2 flex items-center gap-2 bg-[#3ddc68] text-[#0a0a0a] px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 glow-btn"
                  >
                    Continue to Delivery
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="animate-fadeIn">
                  <h2 className="syne text-xl font-bold text-white mb-5">
                    Where should we deliver?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
                        className={`relative flex flex-col p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                          location === opt.val
                            ? "border-[#3ddc68] bg-[#3ddc68]/5 shadow-lg shadow-[#3ddc68]/10"
                            : "border-[#1e1e1e] bg-[#0e0e0e] hover:border-[#2a2a2a]"
                        }`}
                      >
                        {location === opt.val && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-[#3ddc68] rounded-full flex items-center justify-center">
                            <Check
                              size={11}
                              className="text-[#0a0a0a]"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                        <opt.icon
                          size={22}
                          className={`mb-3 ${location === opt.val ? "text-[#3ddc68]" : "text-[#444]"}`}
                        />
                        <span
                          className={`font-bold text-base ${location === opt.val ? "text-[#3ddc68]" : "text-white"}`}
                        >
                          {opt.title}
                        </span>
                        <span className="text-xs text-[#555] mt-1">
                          {opt.sub}
                        </span>
                        <span
                          className={`mt-3 text-xl font-black ${location === opt.val ? "text-[#3ddc68]" : "text-[#888]"}`}
                        >
                          {opt.price}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-xl border border-[#222] text-[#888] font-semibold text-sm hover:border-[#333] hover:text-white transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="group flex items-center gap-2 bg-[#3ddc68] text-[#0a0a0a] px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 glow-btn"
                    >
                      Continue to Payment{" "}
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="animate-fadeIn">
                  <h2 className="syne text-xl font-bold text-white mb-5">
                    How would you like to pay?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        val: "cod" as Payment,
                        title: "Cash on Delivery",
                        desc: "Pay when it arrives",
                        icon: Banknote,
                      },
                      {
                        val: "card" as Payment,
                        title: "Online Payment",
                        desc: "Visa, Mastercard, bKash",
                        icon: CreditCard,
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setPayment(opt.val)}
                        className={`relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                          payment === opt.val
                            ? "border-[#3ddc68] bg-[#3ddc68]/5 shadow-lg shadow-[#3ddc68]/10"
                            : "border-[#1e1e1e] bg-[#0e0e0e] hover:border-[#2a2a2a]"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${payment === opt.val ? "bg-[#3ddc68] text-[#0a0a0a]" : "bg-[#1a1a1a] text-[#555]"}`}
                        >
                          <opt.icon size={18} />
                        </div>
                        <div>
                          <p
                            className={`font-bold text-sm ${payment === opt.val ? "text-[#3ddc68]" : "text-white"}`}
                          >
                            {opt.title}
                          </p>
                          <p className="text-xs text-[#555] mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                        {payment === opt.val && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-[#3ddc68] rounded-full flex items-center justify-center">
                            <Check
                              size={11}
                              className="text-[#0a0a0a]"
                              strokeWidth={3}
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {payment === "card" && (
                    <div className="space-y-3 mb-6 p-5 bg-[#0d0d0d] rounded-2xl border border-[#1e1e1e] animate-fadeIn">
                      <h3 className="text-xs font-bold text-[#555] mb-3 uppercase tracking-widest">
                        Card Details
                      </h3>
                      <div className="relative">
                        <CreditCard
                          size={14}
                          className="absolute left-4 top-3.5 text-[#444]"
                        />
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNum}
                          onChange={(e) =>
                            setCardNum(formatCard(e.target.value))
                          }
                          className="w-full pl-10 pr-4 py-3 border border-[#222] rounded-xl text-sm bg-[#111] text-[#e8e8e8] focus:border-[#3ddc68] focus:shadow-md focus:shadow-[#3ddc68]/10 outline-none transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="pl-4 py-3 border border-[#222] rounded-xl text-sm bg-[#111] text-[#e8e8e8] focus:border-[#3ddc68] outline-none transition-all"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="pl-4 py-3 border border-[#222] rounded-xl text-sm bg-[#111] text-[#e8e8e8] focus:border-[#3ddc68] outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-[#444] mb-6">
                    <Shield size={12} className="text-[#3ddc68]" />
                    <span>256-bit SSL encryption · Zero data stored</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl border border-[#222] text-[#888] font-semibold text-sm hover:border-[#333] hover:text-white transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setConfirmed(true)}
                      className="group flex-1 flex items-center justify-center gap-2 bg-[#3ddc68] text-[#0a0a0a] py-3.5 rounded-xl font-bold text-sm transition-all duration-300 glow-btn"
                    >
                      <Sparkles size={14} />
                      Confirm & Place Order
                      <ChevronRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div
              className="grid grid-cols-3 gap-3 animate-slideUp"
              style={{ animationDelay: "0.12s" }}
            >
              {[
                { icon: Shield, label: "SSL Secured" },
                { icon: Truck, label: "Fast Delivery" },
                { icon: PackageCheck, label: "Easy Returns" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="card px-3 py-3 flex items-center gap-2.5"
                >
                  <b.icon size={14} className="text-[#3ddc68] shrink-0" />
                  <span className="text-xs font-semibold text-[#666]">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT: Order Summary ══ */}
          <div
            className="lg:col-span-5 sticky top-8 space-y-4 animate-slideUp"
            style={{ animationDelay: "0.18s" }}
          >
            <div className="card overflow-hidden">
              {/* Card header */}
              <div className="px-5 py-4 border-b border-[#1a1a1a] flex items-center justify-between bg-[#0e0e0e]">
                <h2 className="syne font-bold text-white flex items-center gap-2 text-base">
                  <PackageCheck size={16} className="text-[#3ddc68]" />
                  Order Summary
                </h2>
                <span className="bg-[#3ddc68]/10 text-[#3ddc68] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#3ddc68]/20">
                  {totalQty} item{totalQty !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Items */}
              <div className="p-5 space-y-5 border-b border-[#1a1a1a]">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`transition-all duration-300 ${removingId === item.id ? "item-removing" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Thumbnail */}
                      <div className="relative h-[68px] w-[68px] rounded-xl overflow-hidden bg-[#1a1a1a] shrink-0 border border-[#252525]">
                        <img
                          src={item.imageUrl}
                          className="h-full w-full object-cover opacity-90 hover:scale-110 transition-transform duration-500"
                          alt={item.name}
                        />
                        <div className="absolute top-1 right-1 w-5 h-5 bg-[#3ddc68] rounded-full text-[10px] font-black text-[#0a0a0a] flex items-center justify-center shadow-md">
                          {item.quantity}
                        </div>
                      </div>

                      {/* Info + controls */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate leading-tight">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#555] mt-0.5">
                          {item.color}
                        </p>

                        {/* Qty stepper */}
                        <div className="flex items-center gap-2 mt-2.5">
                          <div className="flex items-center bg-[#161616] border border-[#252525] rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                item.quantity === 1
                                  ? removeItem(item.id)
                                  : updateQty(item.id, -1)
                              }
                              title={
                                item.quantity === 1 ? "Remove" : "Decrease"
                              }
                              className={`w-7 h-7 flex items-center justify-center transition-colors ${
                                item.quantity === 1
                                  ? "text-[#444] hover:bg-red-500/20 hover:text-red-400"
                                  : "text-[#666] hover:bg-[#202020] hover:text-white"
                              }`}
                            >
                              {item.quantity === 1 ? (
                                <Trash2 size={10} />
                              ) : (
                                <Minus size={10} />
                              )}
                            </button>

                            <span className="w-9 text-center text-sm font-bold text-[#e8e8e8] select-none tabular-nums">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQty(item.id, 1)}
                              title="Increase"
                              className="w-7 h-7 flex items-center justify-center text-[#666] hover:bg-[#202020] hover:text-[#3ddc68] transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <span className="text-[11px] text-[#444]">
                            × ৳{item.price}
                          </span>
                        </div>
                      </div>

                      {/* Line total + remove */}
                      <div className="text-right shrink-0 flex flex-col items-end gap-2">
                        <p className="text-sm font-black text-white tabular-nums">
                          ৳{item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          title="Remove item"
                          className="text-[#2e2e2e] hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm text-[#666]">
                  <span>Subtotal ({totalQty} items)</span>
                  <span className="font-semibold text-[#bbb] tabular-nums">
                    ৳{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#666]">
                  <span className="flex items-center gap-1.5">
                    <Truck size={12} />
                    {location === "inside" ? "Inside Dhaka" : "Outside Dhaka"}
                  </span>
                  <span className="font-semibold text-[#bbb] tabular-nums">
                    ৳{delivery}
                  </span>
                </div>

                <div className="pt-4 border-t border-dashed border-[#1e1e1e] flex justify-between items-center">
                  <span className="font-bold text-white">Total</span>
                  <span className="text-2xl font-black text-[#3ddc68] tabular-nums">
                    ৳{total}
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (step < 3) setStep((step + 1) as Step);
                    else setConfirmed(true);
                  }}
                  className="group mt-1 w-full bg-[#3ddc68] text-[#0a0a0a] py-4 rounded-xl font-bold text-sm transition-all duration-300 glow-btn flex items-center justify-center gap-2"
                >
                  {step === 3 ? (
                    <>
                      <Sparkles size={14} /> Confirm Order
                    </>
                  ) : (
                    "Continue"
                  )}
                  <ChevronRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
