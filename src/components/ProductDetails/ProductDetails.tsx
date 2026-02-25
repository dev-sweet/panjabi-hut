"use client";
import { Product } from "@/types/product";
import React, { useRef, useState } from "react";
import { Star, ShieldCheck, Truck, RotateCcw, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductDetails = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 p-4 md:p-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Side: Sticky Image Section */}
          <div className="lg:sticky lg:top-12 self-start">
            <div
              className="relative aspect-square overflow-hidden rounded-2xl bg-[#1a1a1a] cursor-zoom-in border border-white/5 shadow-2xl"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                width={1000} // Higher res for dark-mode depth
                height={1000}
                quality={100}
                priority
                ref={imgRef}
                src={product.image}
                alt={product.name}
                className={`h-full w-full object-cover transition-transform duration-200 ease-out ${
                  isZoomed ? "scale-[2.5]" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                    : undefined
                }
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-md lg:hidden border border-white/10">
                Tap to zoom
              </div>
            </div>
          </div>

          {/* Right Side: Scrollable Details */}
          <div className="flex flex-col space-y-8 py-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center  gap-4">
              <span className="text-4xl font-bold text-[#2fa83e]">
                ${product.basePrice}
              </span>
              <span className="text-xl text-slate-600 line-through decoration-slate-700">
                ${product.sellingPrice}
              </span>
              {product.sellingPrice && (
                <span className="rounded-full bg-[#2fa83e]/10 px-3 py-1 text-sm font-bold text-emerald-400 border border-[#2fa83e]/20">
                  Save ${product.sellingPrice - product.basePrice}
                </span>
              )}
            </div>

            <p className="text-lg leading-relaxed text-slate-400">
              {product.description}
            </p>

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-4">
              {/* <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1 w-full sm:w-auto justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-slate-300"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-12 w-12 items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-slate-300"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button className="w-full flex-1 rounded-xl bg-[#2fa83e] py-4 font-bold text-gray-200 shadow-lg shadow-emerald-900/20 transition-all hover:bg-[#2fa83e]/90 active:scale-[0.98]">
                  Add to Cart — $
                  {(product.basePrice * quantity).toLocaleString()}
                </button>
              </div> */}

              <Link
                href={`/checkout?direct=${product.id}`}
                className="rounded-xl bg-[#2fa83e] py-3 px-8 font-bold text-gray-200 transition-all cursor-pointer hover:bg-[#2fa83e]/90 active:scale-[0.98]"
              >
                Buy It Now
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              <div className="flex flex-col items-center gap-3 text-center group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#2fa83e]/10 transition-colors">
                  <Truck size={22} className="text-[#2fa83e]" />
                </div>
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-3 border-x border-white/5 text-center group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#2fa83e]/10 transition-colors">
                  <RotateCcw size={22} className="text-[#2fa83e]" />
                </div>
                <span>30-Day Return</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#2fa83e]/10 transition-colors">
                  <ShieldCheck size={22} className="text-[#2fa83e]" />
                </div>
                <span>Secure Payment</span>
              </div>
            </div>

            {/* Product Specifications Section */}
            <div className="pt-8 space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-2">
                Product Details
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between text-sm">
                  <span className="text-slate-500">Category</span>
                  <span className="text-slate-300">Premium Collection</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-slate-500">Availability</span>
                  <span className="text-[#2fa83e]">In Stock</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
