import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useOrders from '../hooks/useOrders.js';
import { getImageUrl } from '../../../api/axios.js';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { order, loading, error, fetchOrder } = useOrders();

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return <p className="text-red-500 text-center py-20">{error}</p>;
  if (!order) return <p className="text-center py-20">Order not found.</p>;

  return (
    <div className="bg-white min-h-screen px-6 md:px-16 py-16">

      {/* Back */}
      <Link
        to="/orders"
        className="text-xs font-semibold tracking-widest uppercase hover:text-red-500 transition-colors mb-8 inline-block"
      >
        ← Back to Orders
      </Link>

      {/* Header */}
      <div className="mb-12">
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Order Details</p>
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">ORDER #{order.id}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Items */}
        <div className="lg:col-span-2">
          <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest text-black mb-6">ITEMS</h2>

          <div className="flex flex-col gap-4">
            {order.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-6 border-b border-gray-200 pb-4">
                <div className="bg-gray-100 w-20 h-20 flex-shrink-0 overflow-hidden">
                  <img
                    src={getImageUrl(item.image_url)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-black tracking-wide uppercase text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs mt-1">x{item.quantity}</p>
                </div>
                <p className="font-bold text-black">${item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-black text-white p-8 h-fit">
          <h2 className="font-['Bebas_Neue'] text-3xl tracking-widest mb-8">SUMMARY</h2>

          <div className="flex flex-col gap-4 border-b border-gray-700 pb-6 mb-6">
            <div className="flex justify-between text-sm tracking-widest uppercase">
              <span className="text-gray-400">Status</span>
              <span className={`font-semibold ${order.status === 'delivered' ? 'text-green-400' : order.status === 'cancelled' ? 'text-red-500' : 'text-white'}`}>
                {order.status}
              </span>
            </div>

            <div className="flex justify-between text-sm tracking-widest uppercase">
              <span className="text-gray-400">Date</span>
              <span className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between text-sm tracking-widest uppercase">
              <span className="text-gray-400">Address</span>
              <span className="font-semibold text-right max-w-[150px]">{order.shipping_address}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest">TOTAL</span>
            <span className="font-['Bebas_Neue'] text-2xl tracking-widest">${order.total_amount}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailPage;