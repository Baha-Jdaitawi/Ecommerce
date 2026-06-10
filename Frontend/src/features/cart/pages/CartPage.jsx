import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import CartItem from '../components/CartItem.jsx';
import CartSummary from '../components/CartSummary.jsx';

const CartPage = () => {
  const { cart, loading, error, getCart, updateItem, deleteItem, clearCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return <p className="text-red-500 text-center py-20">{error}</p>;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">YOUR CART IS EMPTY</h2>
        <p className="text-gray-400 tracking-widest uppercase text-sm">Looks like you haven't added anything yet</p>
        <Link
          to="/products"
          className="bg-black text-white font-semibold tracking-widest uppercase px-10 py-4 text-sm hover:bg-red-500 transition-colors duration-300"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen px-6 md:px-16 py-16">

      <div className="flex items-center justify-between mb-12">
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">YOUR CART</h1>
        <button
          onClick={clearCart}
          className="text-xs font-semibold tracking-widest uppercase text-red-500 hover:text-red-700 transition-colors border-b border-red-500"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

        <div className="lg:col-span-2 flex flex-col gap-6">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={updateItem}
              onDelete={deleteItem}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <CartSummary total={total} />
        </div>

      </div>
    </div>
  );
};

export default CartPage;

