"use client";

import { useEffect, useState } from "react";

interface Props {
  categories: string[];
  onFilter: (category: string, minPrice: number, maxPrice: number) => void;
}

export default function Filters({ categories, onFilter }: Props) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const parsedMin = parseFloat(minPrice);
    const parsedMax = parseFloat(maxPrice);
    const min = isNaN(parsedMin) ? 0 : parsedMin;
    const max = isNaN(parsedMax) ? Infinity : parsedMax;
    onFilter(category, min, max);
  }, [category, minPrice, maxPrice, onFilter]);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded-lg border bg-white shadow"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        min={0}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 rounded-lg border bg-white shadow w-24"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        min={0}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 rounded-lg border bg-white shadow w-24"
      />
    </div>
  );
}