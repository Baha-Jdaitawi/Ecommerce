import { useState } from 'react';
import { checkoutService, getUserOrdersService, getOrderService } from '../services/orderService.js';

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserOrdersService();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrderService(id);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const checkout = async (items, shipping_address) => {
    try {
      setLoading(true);
      setError(null);
      const data = await checkoutService(items, shipping_address);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return { orders, order, loading, error, fetchOrders, fetchOrder, checkout };
}

export default useOrders;