import { query } from '../config/db.js';

export const createUser = async (name, email, hashedPassword) => {
  const result = await query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};