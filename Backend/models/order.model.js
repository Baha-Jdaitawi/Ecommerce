import { query } from '../config/db.js';

export const createOrder = async (user_id, total_amount, shipping_address, stripe_session_id) => {
  const result = await query(
    'INSERT INTO orders (user_id, total_amount, shipping_address, stripe_session_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, total_amount, shipping_address, stripe_session_id]
  );
  return result.rows[0];
};

export const createOrderItems = async (order_id, items) => {
  for (const item of items) {
    await query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
      [order_id, item.product_id, item.quantity, item.price]
    );
  }
};

export const getOrdersByUserId = async (user_id) => {
  const result = await query(
    'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
    [user_id]
  );
  return result.rows;
};

export const getOrderById = async (id) => {
  const order = await query(
    'SELECT * FROM orders WHERE id = $1',
    [id]
  );

  if (!order.rows[0]) return null;

  const items = await query(
    `SELECT order_items.*, products.name, products.image_url
     FROM order_items
     JOIN products ON order_items.product_id = products.id
     WHERE order_items.order_id = $1`,
    [id]
  );

  return { ...order.rows[0], items: items.rows };
};

export const getAllOrders = async () => {
  const result = await query(
    'SELECT orders.*, users.name AS user_name, users.email FROM orders JOIN users ON orders.user_id = users.id ORDER BY created_at DESC'
  );
  return result.rows;
};

export const updateOrderStatus = async (id, status) => {
  const result = await query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};