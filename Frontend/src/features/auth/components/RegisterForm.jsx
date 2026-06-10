import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const RegisterForm = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    setFormData({ name: '', email: '', password: '' });
  }, []);

  const passwordRules = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'At least 1 uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'At least 1 number', test: (p) => /[0-9]/.test(p) },
    { label: 'At least 1 special character (!@#$%^&*)', test: (p) => /[!@#$%^&*]/.test(p) },
  ];

  const allPasswordValid = passwordRules.every((rule) => rule.test(formData.password));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email' && emailTouched) {
      setEmailError(validateEmail(value) ? '' : 'Please enter a valid email');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!allPasswordValid) return;

    const data = await register(formData.name, formData.email, formData.password);
    if (data) navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-6">

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
          autoComplete="new-password"
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
          onBlur={() => {
            setEmailTouched(true);
            setEmailError(validateEmail(formData.email) ? '' : 'Please enter a valid email');
          }}
          required
          placeholder="your@email.com"
          autoComplete="new-password"
          className={`border-2 px-4 py-3 text-sm outline-none transition-colors w-full ${emailError ? 'border-red-500' : 'border-black focus:border-red-500'}`}
        />
        {emailError && (
          <p className="text-red-500 text-xs tracking-wide mt-1">• {emailError}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold tracking-widest uppercase text-black block mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            handleChange(e);
            setPasswordTouched(true);
          }}
          required
          placeholder="••••••••"
          autoComplete="new-password"
          className={`border-2 px-4 py-3 text-sm outline-none transition-colors w-full ${
            passwordTouched && !allPasswordValid ? 'border-red-500' : passwordTouched && allPasswordValid ? 'border-green-500' : 'border-black focus:border-red-500'
          }`}
        />
        {passwordTouched && (
          <ul className="mt-3 flex flex-col gap-2">
            {passwordRules.map((rule, i) => {
              const passed = rule.test(formData.password);
              return (
                <li key={i} className={`text-xs tracking-wide flex items-center gap-2 ${passed ? 'text-green-500' : 'text-red-500'}`}>
                  <span className="font-bold">{passed ? '✓' : '✗'}</span>
                  {rule.label}
                </li>
              );
            })}
          </ul>
        )}
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
