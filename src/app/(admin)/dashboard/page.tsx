"use client";

import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Activity,
  MoreVertical,
} from "lucide-react";

const DashboardPage = () => {
  const stats = [
    {
      label: "Total Revenue",
      value: "৳58,420",
      growth: "+12.5%",
      icon: <DollarSign className="text-blue-600" />,
      trend: "up",
    },
    {
      label: "Total Orders",
      value: "1,240",
      growth: "+8.2%",
      icon: <ShoppingBag className="text-emerald-600" />,
      trend: "up",
    },
    {
      label: "New Customers",
      value: "184",
      growth: "-2.4%",
      icon: <Users className="text-amber-600" />,
      trend: "down",
    },
    {
      label: "Active Sessions",
      value: "42",
      growth: "+5.1%",
      icon: <Activity className="text-purple-600" />,
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Store Overview</h1>
          <p className="text-slate-500 text-sm">
            Welcome back! Here’s what’s happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <div
                className={`flex items-center gap-1 text-xs font-bold ${stat.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.growth}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Recent Orders</h3>
            <button className="text-blue-600 text-sm font-semibold hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    id: "#7721",
                    name: "Rahat Islam",
                    status: "Delivered",
                    amount: "৳2,450",
                    style: "bg-emerald-50 text-emerald-600",
                  },
                  {
                    id: "#7722",
                    name: "Nabila Karim",
                    status: "Processing",
                    amount: "৳1,890",
                    style: "bg-amber-50 text-amber-600",
                  },
                  {
                    id: "#7723",
                    name: "Arif Ahmed",
                    status: "Pending",
                    amount: "৳5,200",
                    style: "bg-slate-100 text-slate-600",
                  },
                  {
                    id: "#7724",
                    name: "Sumi Akter",
                    status: "Delivered",
                    amount: "৳950",
                    style: "bg-emerald-50 text-emerald-600",
                  },
                ].map((order, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {order.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${order.style}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">
                      {order.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Revenue Mini-Chart (1/3 width) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Weekly Sales</h3>
            <MoreVertical size={18} className="text-slate-400 cursor-pointer" />
          </div>
          <div className="flex items-end justify-between h-48 gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div
                  style={{ height: `${height}%` }}
                  className="w-full bg-blue-100 rounded-t-lg group-hover:bg-blue-600 transition-all duration-300"
                />
                <span className="text-[10px] font-medium text-slate-400 uppercase">
                  {["S", "M", "T", "W", "T", "F", "S"][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center italic">
              You sold 15% more items this week compared to last week!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
