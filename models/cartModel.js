import { pool } from "../config/db.js";

export const getUserCart = async (userId) => {
  const result = await pool.query(
    `SELECT c.product_id, p.name, p.price, p.image_url, c.quantity
     FROM cart c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id = $1`,
    [userId]
  );
  return result.rows;
};

export const addOrUpdateCartItem = async (userId, productId, quantity) => {
  const result = await pool.query(
    `INSERT INTO cart (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET quantity = EXCLUDED.quantity
     RETURNING *`,
    [userId, productId, quantity]
  );
  return result.rows[0];
};

export const updateCartItem = async (userId, productId, quantity) => {
  const result = await pool.query(
    `UPDATE cart SET quantity = $1
     WHERE user_id = $2 AND product_id = $3
     RETURNING *`,
    [quantity, userId, productId]
  );
  return result.rows[0];
};

export const removeCartItem = async (userId, productId) => {
  const result = await pool.query(
    `DELETE FROM cart WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );
  return result.rowCount > 0;
};