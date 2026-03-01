"use client";
import ProductCard from "@/components/Shared/ProductCard/ProductCard";
import { Product } from "@/types/product";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/products?tag=isNew")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      });
  }, [path]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-300">
          Loading products...
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold pb-2">New Arrivals</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
