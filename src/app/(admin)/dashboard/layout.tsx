"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  NotebookText,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex h-16 items-center px-6 border-b border-slate-100">
            <Image
              className="w-full h-auto"
              src="/logo.png"
              width={100}
              height={100}
              alt="logo"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <Link
              href="/dashboard"
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "bg-[#1e3316] text-white shadow-md shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            {/* Products */}
            <Link
              href="/dashboard/products"
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === "/dashboard/products"
                  ? "bg-[#1e3316] text-white shadow-md shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Package size={20} />
              Manage Products
            </Link>
            <Link
              href="/dashboard/orders"
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === "/dashboard/orders"
                  ? "bg-[#1e3316] text-white shadow-md shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <NotebookText size={20} />
              Manage Orders
            </Link>
            <Link
              href="/dashboard/products/create"
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === "/dashboard/products/create"
                  ? "bg-[#1e3316] text-white shadow-md shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Plus size={20} />
              Create New Product
            </Link>

            {/* Customers */}
            <Link
              href="/dashboard/customers"
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === "/dashboard/customers"
                  ? "bg-[#1e3316] text-white shadow-md shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Users size={20} />
              Customers
            </Link>

            {/* Settings */}
            <Link
              href="/dashboard/settings"
              className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === "/dashboard/settings"
                  ? "bg-[#1e3316] text-white shadow-md shadow-blue-100"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Settings size={20} />
              Settings
            </Link>
          </nav>

          {/* Footer Navigation (Logout) */}
          <div className="p-4 border-t border-slate-100">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-rose-600 hover:bg-rose-50 transition-colors">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* 3. Main Content Wrapper */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex-shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full text-slate-400 focus-within:ring-2 ring-blue-100 transition-all">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent border-none outline-none text-sm w-48 lg:w-64 text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">Admin User</p>
                <p className="text-[10px] text-slate-500 uppercase font-semibold mt-1">
                  Super Admin
                </p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 border-2 border-white shadow-sm" />
            </div>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
