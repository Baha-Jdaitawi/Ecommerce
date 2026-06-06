import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin.js';

const AdminDashboard = () => {
  const { stats, loading, error, fetchStats } = useAdmin();

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <div>
          <h3>Total Users</h3>
          <p>{stats?.totalUsers}</p>
        </div>
        <div>
          <h3>Total Orders</h3>
          <p>{stats?.totalOrders}</p>
        </div>
        <div>
          <h3>Total Products</h3>
          <p>{stats?.totalProducts}</p>
        </div>
        <div>
          <h3>Total Revenue</h3>
          <p>${stats?.totalRevenue}</p>
        </div>
      </div>

      <div>
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/orders">Manage Orders</Link>
        <Link to="/admin/users">Manage Users</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;