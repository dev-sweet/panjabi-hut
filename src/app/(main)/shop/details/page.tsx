"use client";

import React, { useState, useRef } from "react";
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const product = {
    name: "Quantum Sonic Headphones",
    rating: 4.8,
    reviews: 124,
    originalPrice: 249,
    discountPrice: 199,
    description:
      "Experience studio-quality sound with active noise cancellation and 40-hour battery life. Designed for comfort, engineered for precision.",
    features: [
      "Active Noise Cancellation",
      "Bluetooth 5.2",
      "40h Battery Life",
      "Spatial Audio",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Side: Image Zoom Section */}
          <div className="relative">
            <div
              className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                ref={imgRef}
                src={product.imageUrl}
                alt={product.name}
                className={`h-full w-full object-cover transition-transform duration-150 ease-out ${
                  isZoomed ? "scale-[2.5]" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                    : undefined
                }
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-medium text-slate-900 shadow-sm backdrop-blur-md lg:hidden">
                Tap to zoom
              </div>
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-500">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < 4 ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-500">
                  ({product.reviews} reviews)
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-blue-600">
                ${product.discountPrice}
              </span>
              <span className="text-xl text-slate-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                Save ${product.originalPrice - product.discountPrice}
              </span>
            </div>

            <p className="text-lg leading-relaxed text-slate-600">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-6">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center rounded-xl border border-slate-200 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button className="flex-1 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-none active:scale-95">
                  Add to Cart — $
                  {(product.discountPrice * quantity).toLocaleString()}
                </button>
              </div>

              <button className="w-full rounded-xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800">
                Buy It Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 text-[11px] font-medium uppercase tracking-widest text-slate-400">
              <div className="flex flex-col items-center gap-2">
                <Truck size={20} className="text-slate-800" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 border-x border-slate-100">
                <RotateCcw size={20} className="text-slate-800" />
                <span>30-Day Return</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck size={20} className="text-slate-800" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
