import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../../api/axios.js';

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrderBySession = async () => {
      try {
        const res = await api.get(`/orders/session/${sessionId}`);
        setOrder(res.data.order);
      } catch (err) {
        setError('Could not load order details.');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchOrderBySession();
    } else {
      setError('No session found.');
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center px-6 py-20">

      {/* Icon */}
      <div className="w-20 h-20 bg-black flex items-center justify-center mb-8">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Payment Confirmed</p>
      <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl tracking-widest text-black mb-4 text-center">
        ORDER PLACED
      </h1>
      <p className="text-gray-400 text-sm tracking-widest uppercase mb-10 text-center">
        Thank you for your purchase. Your order is being processed.
      </p>

      {error && (
        <p className="text-red-500 text-sm tracking-wide mb-8">{error}</p>
      )}

      {order && (
        <div className="bg-black text-white p-8 w-full max-w-md mb-10">
          <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest mb-6">ORDER SUMMARY</h2>

          <div className="flex flex-col gap-3 border-b border-gray-700 pb-6 mb-6">
            <div className="flex justify-between text-sm tracking-widest uppercase">
              <span className="text-gray-400">Order</span>
              <span className="font-semibold">#{order.id}</span>
            </div>
            <div className="flex justify-between text-sm tracking-widest uppercase">
              <span className="text-gray-400">Status</span>
              <span className="font-semibold text-green-400">{order.status}</span>
            </div>
            <div className="flex justify-between text-sm tracking-widest uppercase">
              <span className="text-gray-400">Address</span>
              <span className="font-semibold text-right max-w-[180px]">{order.shipping_address}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest">TOTAL</span>
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest">${order.total_amount}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/orders"
          className="bg-black text-white font-semibold tracking-widests uppercase px-10 py-4 text-sm hover:bg-red-500 transition-colors duration-300 text-center"
        >
          View My Orders
        </Link>
        <Link
          to="/products"
          className="border-2 border-black text-black font-semibold tracking-widest uppercase px-10 py-4 text-sm hover:bg-black hover:text-white transition-colors duration-300 text-center"
        >
          Continue Shopping
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccessPage;