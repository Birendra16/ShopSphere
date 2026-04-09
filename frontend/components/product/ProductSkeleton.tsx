"use client";

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 animate-pulse">
      
      <div className="h-40 bg-gray-200 rounded mb-3" />

      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-5/6 mb-3" />

      <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />

      <div className="h-10 bg-gray-200 rounded" />
    </div>
  );
}