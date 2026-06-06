import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrders from '../hooks/useOrders.js';
import useCart from '../../cart/hooks/useCart.js';

const CheckoutPage = () => {
  const { checkout, loading, error } = useOrders();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const data = await checkout(cart, shippingAddress);
    if (data) navigate('/orders');
  };

  return (
    <div className="bg-white min-h-screen px-6 md:px-16 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Almost There</p>
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">CHECKOUT</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Shipping Form */}
        <div>
          <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest text-black mb-6">SHIPPING DETAILS</h2>

          <form onSubmit={handleCheckout} className="flex flex-col gap-6">
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">
                Shipping Address
              </label>
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
                placeholder="Enter your full address"
                className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full"
              />
            </div>

            {error && <p className="text-red-500 text-sm tracking-wide">{error}</p>}

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="bg-black text-white font-semibold tracking-widest uppercase py-4 text-sm hover:bg-red-500 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-black text-white p-8">
          <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest mb-8">ORDER SUMMARY</h2>

          <div className="flex flex-col gap-4 border-b border-gray-700 pb-6 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm tracking-wide">
                <span className="text-gray-400">{item.name} x{item.quantity}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest">TOTAL</span>
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest">${total.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;