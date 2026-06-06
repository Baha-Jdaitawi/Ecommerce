import { useNavigate } from 'react-router-dom';

function CartSummary({ total }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={() => navigate('/checkout')}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartSummary;