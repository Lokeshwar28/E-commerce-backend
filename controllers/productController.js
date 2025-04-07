import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";
import { pool } from "../config/db.js";


// Fetch all products
export const fetchProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Fetch product by ID
export const fetchProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Add new product
export const addProduct = async (req, res) => {
  console.log("📦 Received product:", req.body); // Add this line to log the incoming data
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Add Product Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit product details
export const editProduct = async (req, res) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Edit Product Error:", error.message);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// Delete product
// Example of deleteProduct
// Controller for DELETE /api/products/:id
export const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // First delete any order_items referencing this product
    await pool.query("DELETE FROM order_items WHERE product_id = $1", [id]);

    // Then delete the product itself
    const deleted = await deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};