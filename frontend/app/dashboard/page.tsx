"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import api from "@/utils/api";
import { Product } from "@/types/product";
import { toast } from "sonner";

import ProductGrid from "@/components/product/ProductGrid";
import ProductSkeletonGrid from "@/components/product/ProductSkeletonGrid";
import EmptyState from "@/components/product/EmptyState";
import SearchBar from "@/components/product/SearchBar";
import Filters from "@/components/product/Filters";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products");
        setProducts(res.data);

        // Extract unique categories for filter dropdown
        const uniqueCategories: string[] = Array.from(
          new Set<string>(res.data.map((p: Product) => p.category || "Other"))
        );
        setCategories(uniqueCategories);
      } catch (err: any) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter
        ? p.category === categoryFilter
        : true;
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, categoryFilter, minPrice, maxPrice]);

  const handleFilter = useCallback((cat: string, min: number, max: number) => {
    setCategoryFilter(cat);
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-4">Products</h1>

      {/* Search + Filters */}
      <SearchBar onSearch={setSearchQuery} />
      <Filters
        categories={categories}
        onFilter={handleFilter}
      />

      {/* Product Grid */}
      {loading ? (
        <ProductSkeletonGrid />
      ) : filteredProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}