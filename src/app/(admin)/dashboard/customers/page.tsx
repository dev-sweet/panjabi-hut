"use client";

import React from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  UserPlus,
} from "lucide-react";

const CustomersPage = () => {
  const customers = [
    {
      id: 1,
      name: "Siam Ahmed",
      email: "siam@email.com",
      phone: "+880 1712-345678",
      orders: 12,
      spent: "৳45,200",
      status: "Active",
    },
    {
      id: 2,
      name: "Nabila Karim",
      email: "nabila@email.com",
      phone: "+880 1822-112233",
      orders: 5,
      spent: "৳12,800",
      status: "Active",
    },
    {
      id: 3,
      name: "Arif Ahmed",
      email: "arif@email.com",
      phone: "+880 1677-889900",
      orders: 0,
      spent: "৳0",
      status: "New",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500">
            Manage your customer base and their purchase history.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          <UserPlus size={20} /> Add Customer
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg outline-none text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Total Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Mail size={12} /> {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone size={12} /> {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {user.orders} Orders
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">
                    {user.spent}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === "New" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
