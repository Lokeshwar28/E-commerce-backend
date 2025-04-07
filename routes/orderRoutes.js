import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { placeOrder, getOrders } from "../controllers/orderController.js";
import { getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.use(protect);

router.post("/", placeOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;