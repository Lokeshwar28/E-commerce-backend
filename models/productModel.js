import { pool } from "../config/db.js";

export const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

export const createProduct = async ({ name, description, price, image_url }) => {
  const result = await pool.query(
    "INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, price, image_url]
  );
  return result.rows[0];
};

export const updateProduct = async (id, { name, description, price, image_url }) => {
  const result = await pool.query(
    "UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *",
    [name, description, price, image_url, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
  return result.rowCount > 0;
};