import React from "react";
import Image from "next/image";
import ProductCard from "@/components/Shared/ProductCard/ProductCard";

const PremiumPanjabi = () => {
  const products = [
    {
      id: 1,
      name: "Quantum Sonic Headphones",
      originalPrice: 249,
      discountPrice: 199,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
      isNew: true,
      isTrending: true,
    },
    {
      id: 2,
      name: "Minimalist Leather Watch",
      originalPrice: 150,
      discountPrice: 89,
      imageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
      isNew: false,
      isTrending: true,
    },
    {
      id: 3,
      name: "Ultra-Light Running Shoes",
      originalPrice: 120,
      discountPrice: 95,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
      isNew: true,
      isTrending: false,
    },
    {
      id: 4,
      name: "Ergonomic Mechanical Keyboard",
      originalPrice: 180,
      discountPrice: 145,
      imageUrl:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800",
      isNew: false,
      isTrending: false,
    },
    {
      id: 5,
      name: "Smart Home Security Camera",
      originalPrice: 89,
      discountPrice: 59,
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-103792e07924?q=80&w=800",
      isNew: true,
      isTrending: true,
    },
    {
      id: 6,
      name: "4K Portable Projector",
      originalPrice: 599,
      discountPrice: 420,
      imageUrl:
        "https://images.unsplash.com/photo-1535016120720-40c646bebbcf?q=80&w=800",
      isNew: false,
      isTrending: true,
    },
    {
      id: 7,
      name: "Deep Tissue Massage Gun",
      originalPrice: 130,
      discountPrice: 75,
      imageUrl:
        "https://images.unsplash.com/photo-1600108682768-cfc675841522?q=80&w=800",
      isNew: true,
      isTrending: false,
    },
    {
      id: 8,
      name: "Bamboo Desk Organizer",
      originalPrice: 45,
      discountPrice: 32,
      imageUrl:
        "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?q=80&w=800",
      isNew: false,
      isTrending: false,
    },
  ];

  return (
    <section className="bg-[#050605] max-w-7xl mx-auto px-4 py-20 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-white mb-8">Premium Panjabi</h2>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </section>
  );
};

export default PremiumPanjabi;
