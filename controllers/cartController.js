import {
    getUserCart,
    addOrUpdateCartItem,
    updateCartItem,
    removeCartItem,
  } from "../models/cartModel.js";
  
  export const getCart = async (req, res) => {
    const cart = await getUserCart(req.user.id);
    res.json(cart);
  };
  
  export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const item = await addOrUpdateCartItem(req.user.id, productId, quantity || 1);
    res.status(201).json(item);
  };
  
  export const updateCart = async (req, res) => {
    const { quantity } = req.body;
    const item = await updateCartItem(req.user.id, req.params.productId, quantity);
    res.json(item);
  };
  
  export const removeFromCart = async (req, res) => {
    await removeCartItem(req.user.id, req.params.productId);
    res.json({ message: "Item removed from cart" });
  };