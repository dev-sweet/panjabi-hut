"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Trending", href: "/trending" },
    { name: "Eid Special", href: "/eid-collection" },
    { name: "Premium Panjabi", href: "/panjabi" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping Policy", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "FAQs", href: "/faq" },
  ];

  return (
    <footer className="bg-[#080908] text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              className="w-64"
              width={150}
              height={50}
              alt="PanjabiHut Logo"
            />{" "}
            <p className="text-slate-400 text-sm leading-relaxed">
              Experience the finest craftmanship in Premium Panjabis and modern
              ethnic wear. Elevating tradition since 2025.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="hover:text-emerald-500 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-emerald-500 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-emerald-500 transition-colors"
              >
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">
              Shop
            </h3>
            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-500 hover:translate-x-1 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">
              Support
            </h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 shrink-0" />
                <span>123 Fashion Ave, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <span>hello@luxethreads.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-800 my-10" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500">
            © {currentYear} LuxeThreads. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 grayscale opacity-50">
            {/* Payment Icons would go here */}
            <span className="text-[10px] uppercase tracking-tighter">Visa</span>
            <span className="text-[10px] uppercase tracking-tighter">
              Mastercard
            </span>
            <span className="text-[10px] uppercase tracking-tighter">
              bKash
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
