
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Icons, APP_NAME } from '../constants';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) => 
    `text-sm font-semibold transition-colors ${
      isActive(path) 
        ? 'text-indigo-600' 
        : 'text-slate-600 hover:text-indigo-600'
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <Icons.FileText className="w-8 h-8" />
              <span>{APP_NAME}</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/browse" className={navLinkClass('/browse')}>Browse Notes</Link>
              {user && (
                <>
                  <Link to="/upload" className={navLinkClass('/upload')}>Upload</Link>
                  <Link to="/dashboard" className={navLinkClass('/dashboard')}>Dashboard</Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-slate-500">Welcome, <strong>{user.name}</strong></span>
                <button 
                  onClick={() => navigate('/profile')}
                  className={`p-2 rounded-full transition-colors ${
                    isActive('/profile') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Icons.User className="w-5 h-5" />
                </button>
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-2 text-sm text-red-600 font-medium hover:bg-red-50 px-3 py-2 rounded-lg"
                >
                  <Icons.LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 font-medium hover:text-indigo-600 px-4 py-2">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
