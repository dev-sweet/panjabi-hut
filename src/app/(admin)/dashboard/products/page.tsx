"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";
import Link from "next/link";
import toast from "react-hot-toast";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(products);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("You cannot retrive it!"))
      fetch(`/api/products/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            const filteredProducts = products.filter((item) => item.id !== id);
            setProducts(filteredProducts);
          }
        });
  };
  // loading
  if (loading) {
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold text-gray-300">Loading...</p>
    </div>;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Product Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage your inventory and product details.
          </p>
        </div>
        <Link
          href="/dashboard/products/create/"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          Create Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 ring-blue-100 outline-none text-sm"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Base Price</th>
              <th className="px-6 py-4">Selling Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product, i) => (
              <tr
                key={product?.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                      {product?.image && (
                        <Image
                          src={product.image}
                          height={40}
                          width={80}
                          alt={product.name}
                        />
                      )}
                    </div>

                    <span className="font-semibold text-slate-800 text-sm">
                      {product?.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {/* {product.category} */}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  ৳{product?.sellingPrice}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {/* {product.stock} pcs */}
                </td>
                <td className="px-6 py-4"></td>
                <td className="flex items-center justify-center px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/dashboard/products/edit/${product.id}`}
                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
