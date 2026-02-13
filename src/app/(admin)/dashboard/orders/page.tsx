"use client";

import React from "react";
import { Eye, CheckCircle2, XCircle, Clock, Truck } from "lucide-react";

const OrderManagement = () => {
  const orders = [
    {
      id: "ORD-991",
      customer: "Siam Ahmed",
      date: "12 Feb 2026",
      total: 4500,
      status: "Pending",
      payment: "COD",
    },
    {
      id: "ORD-990",
      customer: "Farhana P.",
      date: "11 Feb 2026",
      total: 1200,
      status: "Shipped",
      payment: "Paid",
    },
  ];

  return (
    <div className="space-y-6 mt-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Manage Orders</h2>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            <Clock size={14} /> 12 New Orders
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-bold text-blue-600">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  {order.customer}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  ৳{order.total}
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold text-slate-400 border px-2 py-0.5 rounded">
                    {order.payment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    {order.status === "Pending" ? (
                      <>
                        <Clock size={16} className="text-amber-500" />{" "}
                        <span className="text-amber-600">Pending</span>
                      </>
                    ) : (
                      <>
                        <Truck size={16} className="text-blue-500" />{" "}
                        <span className="text-blue-600">Shipped</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center gap-1 ml-auto">
                    <Eye size={14} /> Details
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

export default OrderManagement;
