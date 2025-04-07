import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.use(protect); // 🔐 all routes require login

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:productId", updateCart);
router.delete("/:productId", removeFromCart);

export default router;