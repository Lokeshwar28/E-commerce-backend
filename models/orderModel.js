import { pool } from "../config/db.js";

export const createOrder = async (userId, items, total) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *",
      [userId, total]
    );

    const orderId = orderResult.rows[0].id;

    for (let item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await client.query("DELETE FROM cart WHERE user_id = $1", [userId]);

    await client.query("COMMIT");
    return orderResult.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const getUserOrders = async (userId) => {
  const ordersRes = await pool.query("SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
  const orders = ordersRes.rows;

  for (let order of orders) {
    const itemsRes = await pool.query(
      `SELECT oi.product_id, p.name, oi.quantity, oi.price
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [order.id]
    );
    order.items = itemsRes.rows;
  }

  return orders;
};

export const getOrderWithItems = async (orderId, userId) => {
    const orderRes = await pool.query(
      "SELECT * FROM orders WHERE id = $1 AND user_id = $2",
      [orderId, userId]
    );
  
    if (orderRes.rows.length === 0) return null;
  
    const itemsRes = await pool.query(
      `SELECT oi.product_id, p.name, oi.quantity, oi.price
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [orderId]
    );
  
    const order = orderRes.rows[0];
    order.items = itemsRes.rows;
    return order;
  };