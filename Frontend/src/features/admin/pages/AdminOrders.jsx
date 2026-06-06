import { useEffect } from 'react';
import useAdmin from '../hooks/useAdmin.js';

const AdminOrders = () => {
  const { orders, loading, error, fetchOrders, updateOrderStatus } = useAdmin();

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

      <div className="mb-12">
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Admin</p>
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">ORDERS</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Order</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Customer</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Total</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Date</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 font-['Bebas_Neue'] text-xl tracking-widest">#{order.id}</td>
                <td className="py-4 px-2">
                  <p className="font-semibold tracking-wide uppercase text-xs">{order.user_name}</p>
                  <p className="text-gray-400 text-xs">{order.email}</p>
                </td>
                <td className="py-4 px-2 font-bold">${order.total_amount}</td>
                <td className="py-4 px-2 text-gray-400 text-xs tracking-wide">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="py-4 px-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="border-2 border-black px-3 py-2 text-xs font-semibold tracking-widest uppercase outline-none focus:border-red-500 transition-colors bg-white cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminOrders;