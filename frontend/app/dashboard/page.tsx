"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Product } from "@/types/product";
import { toast } from "sonner";

import ProductGrid from "@/components/product/ProductGrid";
import ProductSkeletonGrid from "@/components/product/ProductSkeletonGrid";
import EmptyState from "@/components/product/EmptyState";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products");
        setProducts(res.data);
      } catch (err: any) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] p-6">
      
      {/* Header */}
      <h1 className="text-2xl font-bold text-white mb-6">
        Products
      </h1>

      {/* States */}
      {loading ? (
        <ProductSkeletonGrid />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}