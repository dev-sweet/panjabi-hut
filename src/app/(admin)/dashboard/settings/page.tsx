"use client";

import React, { useState } from "react";
import { User, Lock, Bell, Shield, Save } from "lucide-react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    orders: true,
    newsletter: false,
    promo: true,
  });

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">
          Update your profile and manage account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center gap-2 font-bold text-slate-800">
            <User size={20} className="text-blue-600" /> Public Profile
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Siam"
                  alt="Avatar"
                />
              </div>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                Change Photo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Siam Ahmed"
                  className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 ring-blue-100"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="siam@email.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center gap-2 font-bold text-slate-800">
            <Lock size={20} className="text-rose-500" /> Security
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1 max-w-sm">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 ring-blue-100"
              />
            </div>
            <div className="space-y-1 max-w-sm">
              <label className="text-xs font-bold text-slate-500 uppercase">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 ring-blue-100"
              />
            </div>
            <button className="text-sm font-bold text-blue-600 hover:underline">
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center gap-2 font-bold text-slate-800">
            <Bell size={20} className="text-amber-500" /> Notifications
          </div>
          <div className="p-6 divide-y divide-slate-50">
            {[
              {
                key: "orders",
                title: "Order Updates",
                desc: "Get notified when your order is shipped or delivered.",
              },
              {
                key: "newsletter",
                title: "Newsletter",
                desc: "Receive weekly updates on new arrivals and trends.",
              },
              {
                key: "promo",
                title: "Promotions",
                desc: "Get notified about flash sales and discount vouchers.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="py-4 flex items-center justify-between first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-bold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof prev],
                    }))
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications[item.key as keyof typeof prev] ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications[item.key as keyof typeof prev] ? "translate-x-7" : "translate-x-1"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
          Cancel
        </button>
        <button className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
