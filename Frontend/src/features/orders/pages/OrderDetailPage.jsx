import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useOrders from '../hooks/useOrders.js';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { order, loading, error, fetchOrder } = useOrders();

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div>
      <Link to="/orders">Back to Orders</Link>

      <h1>Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
      <p>Shipping Address: {order.shipping_address}</p>

      <h2>Items</h2>
      {order.items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>x{item.quantity}</p>
          <p>${item.price}</p>
        </div>
      ))}

      <h2>Total: ${order.total_amount}</h2>
    </div>
  );
};

export default OrderDetailPage;