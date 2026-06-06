import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrders from '../hooks/useOrders.js';
import useCart from '../../cart/hooks/useCart.js';

const CheckoutPage = () => {
  const { checkout, loading, error } = useOrders();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    const data = await checkout(cart, shippingAddress);
    if (data) {
      navigate('/orders');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      <div>
        <h2>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>x{item.quantity}</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <p>Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
      </div>

      <form onSubmit={handleCheckout}>
        <label>Shipping Address</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;