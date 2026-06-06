import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left - Black Panel */}
      <div className="bg-black text-white hidden md:flex flex-col items-center justify-center px-16">
        <h1 className="font-['Bebas_Neue'] text-[8rem] tracking-widest leading-none text-white">FORZA</h1>
        <p className="text-gray-400 tracking-widest uppercase text-sm mt-4">Built for the relentless.</p>
      </div>

      {/* Right - Form Panel */}
      <div className="flex flex-col items-center justify-center px-6 md:px-16 py-16">
        <div className="w-full max-w-md">
          <p className="text-red-500 text-sm font-semibold tracking-[0.3em] uppercase mb-2">Welcome Back</p>
          <h2 className="font-['Bebas_Neue'] text-5xl tracking-widest text-black mb-10">LOGIN</h2>
          <LoginForm />
          <p className="mt-6 text-sm text-gray-400 tracking-wide">
            Don't have an account?{' '}
            <Link to="/register" className="text-black font-semibold hover:text-red-500 transition-colors">
              Join Us
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;