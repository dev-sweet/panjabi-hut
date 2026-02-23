import React from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useProductStore } from "@/store/useProductStore";
import toast from "react-hot-toast";
import { Product } from "@/types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useProductStore();
  const {
    id,
    name,
    image,
    basePrice,
    sellingPrice,
    // description,
    isNew,
    isTrending,
    // sku,
  } = product;

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((basePrice - (sellingPrice || 0)) / basePrice) * 100,
  );

  const handleAddToCart = (itemId: string) => {
    addToCart({ id: itemId, quantity: 1 });
    toast.success("Product added to cart!");
  };
  return (
    <div className="group relative max-w-sm rounded-md bg-[#080908] shadow-sm shadow-gray-500/40 transition-all hover:shadow-xl border border-gray-800">
      {/* Top Section: Labels (Left) and Cart Icon (Right) */}
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {isNew && (
          <span className="flex items-center justify-center rounded-full bg-green-600 px-3 py-1 text-[10px] font-semibold tracking-wider text-gray-200">
            New
          </span>
        )}
        {isTrending && (
          <span className="rounded-full bg-[#00065a] px-3 py-1 text-[10px] font-semibold tracking-wider text-gray-200">
            Trending
          </span>
        )}
        {discountPercentage > 0 && (
          <span className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-semibold tracking-wider text-gray-200">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      <button
        onClick={() => handleAddToCart(id)}
        className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-[#080908] text-white shadow-sm transition-colors hover:bg-gray-700 hover:text-white"
        aria-label="Add to cart"
      >
        <ShoppingCart size={20} />
      </button>

      {/* Product Image */}
      <div className="relative mb-2 h-50 rounded-md overflow-hidden bg-slate-100">
        <Image
          width={100}
          height={80}
          src={image || "/images/01928333345.png"}
          alt={name}
          className="h-50 w-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="p-2">
        <h3 className="md:text-lg text-sm font-semibold text-slate-200 line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center justify-center gap-2">
          {sellingPrice && (
            <span className="text-lg text-gray-400 line-through">
              TK. {basePrice}
            </span>
          )}
          <span className="text-lg font-bold text-slate-200">
            TK. {sellingPrice || basePrice}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center">
          <button className="flex w-28 text-xs items-center justify-center gap-1 rounded-lg bg-[#1e3316] py-2 font-bold uppercase text-slate-100 transition-all hover:bg-[#043d13] active:scale-[0.98] cursor-pointer">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
