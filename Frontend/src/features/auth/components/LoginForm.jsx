import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const LoginForm = () => {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data) navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div>
        <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full"
        />
      </div>

      <div>
        <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full"
        />
      </div>

      {error && <p className="text-red-500 text-sm tracking-wide">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white font-semibold tracking-widest uppercase py-4 text-sm hover:bg-red-500 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

    </form>
  );
};

export default LoginForm;