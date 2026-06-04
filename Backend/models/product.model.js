import { query } from '../config/db.js';

export const getAllProducts = async (category, search) => {
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category) {
    params.push(category);
    sql += ` AND category = $${params.length}`;
  }

  if (search) {
    params.push(`%${search}%`);
    sql += ` AND name ILIKE $${params.length}`;
  }

  sql += ' ORDER BY created_at DESC';

  const result = await query(sql, params);
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

export const createProduct = async (name, description, price, stock, category, image_url) => {
  const result = await query(
    'INSERT INTO products (name, description, price, stock, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, description, price, stock, category, image_url]
  );
  return result.rows[0];
};

export const updateProduct = async (id, name, description, price, stock, category, image_url) => {
  const result = await query(
    'UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category=$5, image_url=$6 WHERE id=$7 RETURNING *',
    [name, description, price, stock, category, image_url, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  await query('DELETE FROM products WHERE id = $1', [id]);
};