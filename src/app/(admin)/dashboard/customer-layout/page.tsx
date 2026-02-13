"use client";

import React, { useState } from "react";
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  LogOut,
  Bell,
  Menu,
  ChevronRight,
} from "lucide-react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("Overview");

  const menuItems = [
    { name: "Overview", icon: <User size={20} /> },
    { name: "My Orders", icon: <ShoppingBag size={20} /> },
    { name: "Wishlist", icon: <Heart size={20} /> },
    { name: "Addresses", icon: <MapPin size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg" />
            <span className="text-xl font-bold tracking-tight">StyleStore</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-10 w-10 rounded-full bg-slate-200 border border-slate-100 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Siam"
                alt="Avatar"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
              <h2 className="text-lg font-bold text-slate-800">Hello, Siam!</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                Premium Member
              </p>
            </div>

            <nav className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center justify-between px-6 py-4 transition-all ${
                    activeTab === item.name
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3 font-semibold">
                    {item.icon}
                    {item.name}
                  </div>
                  <ChevronRight
                    size={16}
                    className={
                      activeTab === item.name ? "opacity-100" : "opacity-0"
                    }
                  />
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-6 py-4 text-rose-500 font-semibold hover:bg-rose-50 border-t border-slate-50">
                <LogOut size={20} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Content Area */}
          <section className="lg:col-span-9">{children}</section>
        </div>
      </main>
    </div>
  );
}
