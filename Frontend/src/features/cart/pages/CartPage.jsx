import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import CartItem from '../components/CartItem.jsx';
import CartSummary from '../components/CartSummary.jsx';

function CartPage() {
  const { cart, loading, error, getCart, updateItem, deleteItem, clearCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (cart.length === 0) {
    return (
      <div>
        <p>Your cart is empty</p>
        <Link to="/products">Shop Now</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>

      <div>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onDelete={deleteItem}
          />
        ))}
      </div>

      <button onClick={clearCart}>Clear Cart</button>

      <CartSummary total={total} />
    </div>
  );
}

export default CartPage;

