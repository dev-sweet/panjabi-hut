"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Package,
  ExternalLink,
} from "lucide-react";

const ProductManagement = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Static Data
  const [products] = useState([
    {
      id: 1,
      name: "Quantum Sonic Headphones",
      stock: 45,
      price: 199,
      category: "Electronics",
      status: "Active",
    },
    {
      id: 2,
      name: "Minimalist Leather Watch",
      stock: 12,
      price: 89,
      category: "Accessories",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Bamboo Desk Organizer",
      stock: 0,
      price: 32,
      category: "Home",
      status: "Out of Stock",
    },
  ]);

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
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          Create Product
        </button>
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
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                      <Package size={20} />
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  ৳{product.price}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {product.stock} pcs
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      product.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : product.status === "Low Stock"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple Create Product Modal Overlay */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Add New Product</h3>
              <button onClick={() => setShowCreateModal(false)}>
                <Plus className="rotate-45 text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none focus:ring-2 ring-blue-100"
                  placeholder="Enter name..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full p-2.5 bg-slate-50 border rounded-lg outline-none"
                  />
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-4">
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
