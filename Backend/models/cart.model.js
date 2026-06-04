import { query } from '../config/db.js';

export const getCartByUserId = async (user_id) => {
  const result = await query(
    `SELECT cart.id, cart.quantity, products.id AS product_id, products.name, products.price, products.image_url
     FROM cart
     JOIN products ON cart.product_id = products.id
     WHERE cart.user_id = $1`,
    [user_id]
  );
  return result.rows;
};

export const addToCart = async (user_id, product_id, quantity) => {
  const existing = await query(
    'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2',
    [user_id, product_id]
  );

  if (existing.rows.length > 0) {
    const result = await query(
      'UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
      [quantity, user_id, product_id]
    );
    return result.rows[0];
  }

  const result = await query(
    'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
    [user_id, product_id, quantity]
  );
  return result.rows[0];
};

export const updateCartItem = async (cart_id, user_id, quantity) => {
  const result = await query(
    'UPDATE cart SET quantity = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
    [quantity, cart_id, user_id]
  );
  return result.rows[0];
};

export const removeFromCart = async (cart_id, user_id) => {
  await query(
    'DELETE FROM cart WHERE id = $1 AND user_id = $2',
    [cart_id, user_id]
  );
};

export const clearCart = async (user_id) => {
  await query('DELETE FROM cart WHERE user_id = $1', [user_id]);
};