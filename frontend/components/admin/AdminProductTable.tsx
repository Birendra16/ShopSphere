"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Product } from "@/types/product";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ProductFormDialog from "./ProductFormDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

export default function AdminProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
   const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err: any) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

   const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await api.delete(`/api/products/${productToDelete._id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err: any) {
      toast.error("Failed to delete product");
    } finally {
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const openCreate = () => {
    setSelectedProduct(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Product Catalog</h2>
        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
          Add Product
        </Button>
      </div>

      <div className="rounded-md border border-slate-700 bg-slate-900/50 shadow-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800/50 bg-slate-800/50 transition-colors">
              <TableHead className="text-slate-300 font-semibold">Name</TableHead>
              <TableHead className="text-slate-300 font-semibold">Category</TableHead>
              <TableHead className="text-slate-300 font-semibold">Price</TableHead>
              <TableHead className="text-slate-300 font-semibold">Stock</TableHead>
              <TableHead className="text-right text-slate-300 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-400 py-8">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-slate-400 py-8">
                  No products found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product._id} className="border-slate-700 hover:bg-slate-800/50 transition-colors group">
                  <TableCell className="font-medium text-white">{product.name}</TableCell>
                  <TableCell className="text-slate-400">{product.category || "N/A"}</TableCell>
                  <TableCell className="text-emerald-400 font-medium">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-slate-300">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                      {product.stock} in stock
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(product)} className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-all shadow-sm">
                      Edit
                    </Button>
                     <Button variant="destructive" size="sm" onClick={() => handleDelete(product)} className="opacity-80 hover:opacity-100 transition-all shadow-sm group-hover:opacity-100">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

       <ProductFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        product={selectedProduct}
        onSuccess={fetchProducts}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        itemName={productToDelete?.name || ""}
      />
    </div>
  );
}
