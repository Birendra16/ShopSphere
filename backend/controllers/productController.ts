import type { Request, Response } from "express";
import * as productService from "../services/productService.js";

interface IdParams {
  id: string;
}

// Create
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Get all
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Get one
export const getProduct = async (
  req: Request<IdParams>,
  res: Response
) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Update
export const updateProduct = async (
  req: Request<IdParams>,
  res: Response
) => {
  try {
    const updated = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete
export const deleteProduct = async (
  req: Request<IdParams>,
  res: Response
) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};