"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, User, Search, Shirt } from "lucide-react";
import Image from "next/image";
import CartSidebar from "@/components/Shared/CartSidebar/CartSidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "New Arrival", href: "/new" },
    { name: "Eid Collection", href: "/eid-collection" },
    { name: "Premium Panjabi", href: "/premium" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-[#080908] backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <button className="md:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                className="w-64"
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-amber-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {/* <Search className="hidden md:flex h-5 w-5" /> */}

              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center gap-1 text-sm font-medium"
              >
                <ShoppingCart className="h-5 w-5" /> Cart
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-gray-600 shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
