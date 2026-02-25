"use client";
import ProductCard from "@/components/Shared/ProductCard/ProductCard";
import { Product } from "@/types/product";
import { House, HousePlug } from "lucide-react";
import { useEffect, useState } from "react";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* <h1 className="font-bold my-10 flex items-center gap-2">
        <House size={12} className="inline mr-2" />
        /Shop
      </h1> */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
