import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOrders from '../hooks/useOrders.js';

const OrdersPage = () => {
  const { orders, loading, error, fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return <p className="text-red-500 text-center py-20">{error}</p>;

  return (
    <div className="bg-white min-h-screen px-6 md:px-16 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Your History</p>
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">MY ORDERS</h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <p className="font-['Bebas_Neue'] text-4xl tracking-widest text-gray-300">NO ORDERS YET</p>
          <Link
            to="/products"
            className="bg-black text-white font-semibold tracking-widest uppercase px-10 py-4 text-sm hover:bg-red-500 transition-colors duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border-2 border-black p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-red-500 transition-colors">
              <div className="flex flex-col gap-1">
                <p className="font-['Bebas_Neue'] text-2xl tracking-widest">ORDER #{order.id}</p>
                <p className="text-gray-400 text-xs tracking-widest uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400">Status</p>
                  <p className={`text-sm font-semibold tracking-widest uppercase ${order.status === 'delivered' ? 'text-green-500' : order.status === 'cancelled' ? 'text-red-500' : 'text-black'}`}>
                    {order.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400">Total</p>
                  <p className="text-sm font-bold text-black">${order.total_amount}</p>
                </div>

                <Link
                  to={`/orders/${order.id}`}
                  className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 hover:bg-red-500 transition-colors duration-300"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;