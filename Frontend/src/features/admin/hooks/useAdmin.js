import { useState } from "react";
import {
    getStatsService,
    getAdminOrdersService,
    updateOrderStatusService,
    getAllUsersService
} from '../services/adminService.js';

export const useAdmin=()=>{

 const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStatsService();
      setStats(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminOrdersService();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      setLoading(true);
      setError(null);
      const updatedOrder = await updateOrderStatusService(id, status);
      setOrders((prev) => prev.map((order) => order.id === id ? updatedOrder : order));
      return updatedOrder;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsersService();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  return { stats, orders, users, loading, error, fetchStats, fetchOrders, updateOrderStatus, fetchUsers };


}
