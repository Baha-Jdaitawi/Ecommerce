import { getAllOrders, updateOrderStatus } from '../models/order.model.js';
import { getAllProducts, deleteProduct } from '../models/product.model.js';
import { query } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await query('SELECT COUNT(*) FROM users WHERE role = $1', ['customer']);
    const totalOrders = await query('SELECT COUNT(*) FROM orders');
    const totalProducts = await query('SELECT COUNT(*) FROM products');
    const totalRevenue = await query('SELECT SUM(total_amount) FROM orders WHERE status = $1', ['delivered']);

    res.status(200).json({
      stats: {
        totalUsers: totalUsers.rows[0].count,
        totalOrders: totalOrders.rows[0].count,
        totalProducts: totalProducts.rows[0].count,
        totalRevenue: totalRevenue.rows[0].sum || 0
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await updateOrderStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.status(200).json({ users: result.rows });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};