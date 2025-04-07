import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  fetchProducts,
  fetchProduct,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", fetchProducts);
router.get("/:id", fetchProduct);
router.post("/", protect, adminOnly, addProduct);
router.put("/:id", protect, adminOnly, editProduct);
router.delete("/:id", protect, adminOnly, removeProduct);

export default router;