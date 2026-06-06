import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../features/auth/hooks/useAuth.js';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-black text-white px-6 md:px-16 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Logo */}
      <Link to="/" className="font-['Bebas_Neue'] text-3xl tracking-widest text-white hover:text-red-500 transition-colors">
        FORZA
      </Link>

      {/* Center Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm font-semibold tracking-widest uppercase hover:text-red-500 transition-colors">
          Home
        </Link>
        <Link to="/products" className="text-sm font-semibold tracking-widest uppercase hover:text-red-500 transition-colors">
          Products
        </Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="text-sm font-semibold tracking-widest uppercase hover:text-red-500 transition-colors">
            Admin
          </Link>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/cart" className="text-sm font-semibold tracking-widest uppercase hover:text-red-500 transition-colors">
              Cart
            </Link>
            <Link to="/orders" className="text-sm font-semibold tracking-widest uppercase hover:text-red-500 transition-colors">
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold tracking-widest uppercase hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-semibold tracking-widest uppercase hover:text-red-500 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-black text-sm font-semibold tracking-widest uppercase px-5 py-2 hover:bg-red-500 hover:text-white transition-colors"
            >
              Join Us
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;