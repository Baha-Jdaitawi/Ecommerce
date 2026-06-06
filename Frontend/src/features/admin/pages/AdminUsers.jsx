import { useEffect } from 'react';
import useAdmin from '../hooks/useAdmin.js';

const AdminUsers = () => {
  const { users, loading, error, fetchUsers } = useAdmin();

  useEffect(() => {
    fetchUsers();
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
        <h1 className="font-['Bebas_Neue'] text-6xl tracking-widest text-black">USERS</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">ID</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Name</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Email</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Role</th>
              <th className="text-left py-4 px-2 font-semibold tracking-widest uppercase text-xs">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 font-['Bebas_Neue'] text-xl tracking-widest">#{user.id}</td>
                <td className="py-4 px-2 font-semibold tracking-wide uppercase text-xs">{user.name}</td>
                <td className="py-4 px-2 text-gray-400 text-xs">{user.email}</td>
                <td className="py-4 px-2">
                  <span className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 ${user.role === 'admin' ? 'bg-red-500 text-white' : 'bg-black text-white'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-2 text-gray-400 text-xs tracking-wide">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminUsers;