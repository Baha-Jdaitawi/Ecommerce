import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-16 py-16">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* Brand */}
        <div>
          <h2 className="font-['Bebas_Neue'] text-5xl tracking-widest text-white mb-4">REIGN</h2>
          <p className="text-gray-400 text-sm tracking-wide leading-relaxed">
            Built for the relentless. Designed for the bold.
          </p>
        </div>

        {/* Shop */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">Shop</p>
          <div className="flex flex-col gap-3">
            <Link to="/products" className="text-sm tracking-widest uppercase hover:text-red-500 transition-colors">Products</Link>
          </div>
        </div>

        {/* Account */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">Account</p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="text-sm tracking-widest uppercase hover:text-red-500 transition-colors">Login</Link>
            <Link to="/register" className="text-sm tracking-widest uppercase hover:text-red-500 transition-colors">Register</Link>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-xs tracking-widest uppercase">© 2026 Reign. All rights reserved.</p>
        <p className="text-gray-600 text-xs tracking-widest uppercase">Built with React & Node.js</p>
      </div>

    </footer>
  );
};

export default Footer;