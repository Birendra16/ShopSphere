import type { Request, Response } from "express";
import * as productService from "../services/productService.js";
import type { TypedRequestParams } from "../types/express.js";

interface IdParams {
  id: string;
}

// Create
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Get all
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Get one
export const getProduct = async (
  req: TypedRequestParams<IdParams>,
  res: Response
) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Update
export const updateProduct = async (
  req: TypedRequestParams<IdParams>,
  res: Response
) => {
  try {
    const updated = await productService.updateProduct(
      req.params.id,
      req.body
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete
export const deleteProduct = async (
  req: TypedRequestParams<IdParams>,
  res: Response
) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};