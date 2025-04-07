import { getUserCart } from "../models/cartModel.js";
import { createOrder, getUserOrders } from "../models/orderModel.js";
import { getOrderWithItems } from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  const { items, total } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = await createOrder(req.user.id, items, total.toFixed(2));
  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const orders = await getUserOrders(req.user.id);
  res.json(orders);
};

export const getOrderById = async (req, res) => {
    const order = await getOrderWithItems(req.params.id, req.user.id);
  
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
  
    res.json(order);
  };