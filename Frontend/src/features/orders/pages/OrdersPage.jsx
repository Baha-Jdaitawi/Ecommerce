import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOrders from '../hooks/useOrders.js';

const OrdersPage = () => {
  const { orders, loading, error, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (orders.length === 0) {
    return (
      <div>
        <p>No orders yet</p>
        <Link to="/products">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order #{order.id}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total_amount}</p>
          <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
          <Link to={`/orders/${order.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;