"use client";

// import api from "@/lib/axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../../../../../../lib/supabase";
import { useParams } from "next/navigation";

export default function EditProduct() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    sellingPrice: "",
    description: "",
    sku: "",
    image: "",
    isTrending: false,
    isPremium: false,
    isNew: false,
    isEidCollection: false,
  });

  const { id } = useParams();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] as File);
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // upload images before post on server
    if (!file) return toast.error("Must be select product image");

    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("products-image")
      .upload(fileName, file);

    if (error) {
      return toast.error("Something went wrong while uploading image");
    }

    const { data } = supabase.storage
      .from("products-image")
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      return toast.error("Could not get uploaded image URL");
    }

    const payload = {
      ...formData,
      image: data.publicUrl,
      basePrice: parseFloat(formData.basePrice) || 0,
      sellingPrice: formData.sellingPrice
        ? parseFloat(formData.sellingPrice)
        : null,
    };

    try {
      const res = await fetch(`/api/products/edit/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(res);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Submission failed,Please try again");
    }
  };

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const {
          name,
          basePrice,
          sellingPrice,
          description,
          sku,
          image,
          isTrending,
          isPremium,
          isNew,
          isEidCollection,
        } = data.product;

        setFormData({
          name,
          basePrice,
          sellingPrice,
          description,
          sku,
          image,
          isTrending,
          isPremium,
          isNew,
          isEidCollection,
        });
      });
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto p-8 space-y-6 bg-white shadow-sm border border-slate-100 rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-slate-800">Edit Product</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600">
            Product Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg 
    outline-none transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            placeholder="Silk Panjabi"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600">SKU</label>
          <input
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg 
    outline-none transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            placeholder="SP-001"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600">
            Base Price
          </label>
          <input
            name="basePrice"
            type="number"
            value={formData.basePrice}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg 
    outline-none transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600">
            Selling Price
          </label>
          <input
            name="sellingPrice"
            type="number"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg 
    outline-none transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-600">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg 
    outline-none transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          placeholder="Enter details..."
          required
        />
      </div>

      {/* Checkboxes with custom accent color */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
        {(["isNew", "isTrending", "isPremium", "isEidCollection"] as const).map(
          (flag) => (
            <label
              key={flag}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                name={flag}
                checked={formData[flag]}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">
                {flag.replace("is", "")}
              </span>
            </label>
          ),
        )}
      </div>

      <div className="flex flex-col gap-4">
        <input type="file" onChange={handleFileChange} />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
      >
        Create Product
      </button>
    </form>
  );
}
