import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin.js';

const AdminDashboard = () => {
  const { stats, loading, error, fetchStats } = useAdmin();

  useEffect(() => {
    fetchStats();
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
        <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Control Panel</p>
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">DASHBOARD</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-black text-white p-8">
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">Total Users</p>
          <p className="font-['Bebas_Neue'] text-6xl tracking-widest">{stats?.totalUsers || 0}</p>
        </div>
        <div className="bg-black text-white p-8">
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">Total Orders</p>
          <p className="font-['Bebas_Neue'] text-6xl tracking-widest">{stats?.totalOrders || 0}</p>
        </div>
        <div className="bg-black text-white p-8">
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-2">Total Products</p>
          <p className="font-['Bebas_Neue'] text-6xl tracking-widest">{stats?.totalProducts || 0}</p>
        </div>
        <div className="bg-red-500 text-white p-8">
          <p className="text-red-200 text-xs tracking-widest uppercase mb-2">Total Revenue</p>
          <p className="font-['Bebas_Neue'] text-6xl tracking-widest">${stats?.totalRevenue || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/products" className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
          <p className="font-['Bebas_Neue'] text-3xl tracking-widest mb-2">PRODUCTS</p>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 tracking-wide">Manage your product catalog</p>
        </Link>
        <Link to="/admin/orders" className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
          <p className="font-['Bebas_Neue'] text-3xl tracking-widest mb-2">ORDERS</p>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 tracking-wide">View and update order status</p>
        </Link>
        <Link to="/admin/users" className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group">
          <p className="font-['Bebas_Neue'] text-3xl tracking-widest mb-2">USERS</p>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 tracking-wide">View all registered users</p>
        </Link>
      </div>

    </div>
  );
};

export default AdminDashboard;