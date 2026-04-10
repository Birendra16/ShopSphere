import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const productRouter = express.Router();

// Public routes
productRouter.get("/", asyncHandler(getProducts));
productRouter.get("/:id", asyncHandler(getProduct));

// Protected routes
productRouter.post("/", authMiddleware(["admin"]), asyncHandler(createProduct));
productRouter.put("/:id", authMiddleware(["admin"]), asyncHandler(updateProduct));
productRouter.delete("/:id", authMiddleware(["admin"]), asyncHandler(deleteProduct));

export default productRouter;