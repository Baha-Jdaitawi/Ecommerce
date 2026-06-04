import { query } from '../config/db.js';

export const createReview = async (user_id, product_id, rating, comment) => {
  const result = await query(
    'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, product_id, rating, comment]
  );
  return result.rows[0];
};

export const getReviewsByProductId = async (product_id) => {
  const result = await query(
    `SELECT reviews.*, users.name AS user_name
     FROM reviews
     JOIN users ON reviews.user_id = users.id
     WHERE reviews.product_id = $1
     ORDER BY reviews.created_at DESC`,
    [product_id]
  );
  return result.rows;
};

export const hasUserReviewed = async (user_id, product_id) => {
  const result = await query(
    'SELECT * FROM reviews WHERE user_id = $1 AND product_id = $2',
    [user_id, product_id]
  );
  return result.rows.length > 0;
};

export const deleteReview = async (id) => {
  await query('DELETE FROM reviews WHERE id = $1', [id]);
};