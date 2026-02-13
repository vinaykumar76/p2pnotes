
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../services/db';
import { Icons } from '../constants';

interface LoginProps {
  onLogin: (email: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(formData.email);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Hint: Any registered email works in this demo.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
            <Icons.LogOut className="w-8 h-8 -rotate-180" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500">Sign in to access your notes dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="name@university.edu"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700 flex justify-between">
              Password
              <span className="text-xs text-indigo-600 cursor-pointer hover:underline">Forgot?</span>
            </label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/20 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
