import { useNavigate } from 'react-router-dom';

const CartSummary = ({ total }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white p-8 sticky top-24">
      <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest mb-8">ORDER SUMMARY</h2>

      <div className="flex flex-col gap-4 border-b border-gray-700 pb-6 mb-6">
        <div className="flex justify-between text-sm tracking-widest uppercase">
          <span className="text-gray-400">Subtotal</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm tracking-widest uppercase">
          <span className="text-gray-400">Shipping</span>
          <span className="font-semibold text-red-500">Free</span>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <span className="font-['Bebas_Neue'] text-2xl tracking-widest">TOTAL</span>
        <span className="font-['Bebas_Neue'] text-2xl tracking-widest">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="w-full bg-white text-black font-semibold tracking-widest uppercase py-4 text-sm hover:bg-red-500 hover:text-white transition-colors duration-300"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;