import React from "react";
import { ShoppingCart } from "lucide-react";

interface ProductProps {
  name: string;
  originalPrice: number;
  discountPrice: number;
  imageUrl: string;
  isNew?: boolean;
  isTrending?: boolean;
}

const ProductCard = ({ product }) => {
  // Calculate discount percentage
  const { name, originalPrice, discountPrice, imageUrl, isNew, isTrending } =
    product;
  const discountPercentage = Math.round(
    ((originalPrice - discountPrice) / originalPrice) * 100,
  );

  return (
    <div className="group relative max-w-sm rounded-md bg-gray-200 shadow-sm shadow-gray-500/40 transition-all hover:shadow-xl border border-gray-800">
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
        className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00065a] text-white shadow-sm transition-colors hover:bg-gray-700 hover:text-white"
        aria-label="Add to cart"
      >
        <ShoppingCart size={20} />
      </button>

      {/* Product Image */}
      <div className="relative mb-2 h-50 rounded-md overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-50 w-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="p-2">
        <h3 className="md:text-lg font-semibold text-slate-800 line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center justify-center gap-2">
          <span className="text-lg text-gray-400 line-through">
            TK. {originalPrice}
          </span>
          <span className="text-lg font-bold text-slate-900">
            TK. {discountPrice}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center">
          <button className="flex w-28 text-sm items-center justify-center gap-1 rounded-lg bg-slate-900 py-2 font-medium text-white transition-all hover:bg-slate-700 active:scale-[0.98] cursor-pointer">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
