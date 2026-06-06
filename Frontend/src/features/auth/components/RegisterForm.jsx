import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const RegisterForm = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register(formData.name, formData.email, formData.password);
    if (data) navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div>
        <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          className="border-2 border-black px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors w-full"
        />
      </div>

      <div>
        <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          name="password"
          value={formData.password}
          onChange={handleChange}
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
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

    </form>
  );
};

export default RegisterForm;
