"use client";

import { Package } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-400 py-20">
      
      <Package size={48} />

      <h2 className="mt-4 text-lg font-semibold text-white">
        No Products Found
      </h2>

      <p className="text-sm mt-2">
        Start by adding new products to your store.
      </p>
    </div>
  );
}