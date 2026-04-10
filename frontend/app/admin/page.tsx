"use client";

import AdminProductTable from "@/components/admin/AdminProductTable";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] p-6 text-white pt-24">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Manage your store's products, categories, and inventory securely.
          </p>
        </div>

        <AdminProductTable />
      </div>
    </div>
  );
}
