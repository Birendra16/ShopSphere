"use client";

import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="relative bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition duration-200 p-4 flex flex-col">
      
      {/* Stock Badge */}
      {product.stock === 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Out of Stock
        </span>
      )}

      {/* Image */}
      <div className="h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-semibold text-[#0F172A] text-lg">
        {product.name}
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-sm line-clamp-2">
        {product.description}
      </p>

      {/* Price */}
      <div className="mt-2 font-bold text-[#22C55E] text-lg">
        Rs {product.price}
      </div>

      {/* Button */}
      <button
        disabled={product.stock === 0}
        className="mt-auto flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-green-600 disabled:bg-gray-300 text-white py-2 rounded-lg transition"
      >
        <ShoppingCart size={16} />
        {product.stock === 0 ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
}