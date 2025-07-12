import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Recycle, User, Menu, X, Plus, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <Recycle className="h-8 w-8" />
            <span className="text-xl font-bold">ReWear</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${
                isActive('/') ? 'text-emerald-600 font-medium' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Browse Items
            </Link>
            {user && (
              <Link 
                to="/add-item" 
                className={`flex items-center space-x-1 transition-colors ${
                  isActive('/add-item') ? 'text-emerald-600 font-medium' : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>List Item</span>
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-emerald-600">{user.points} points</p>
                </div>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-emerald-600" />
                      </div>
                    )}
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Dashboard
                      </Link>
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <hr className="my-2 border-gray-100" />
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Browse Items
              </Link>
              {user && (
                <Link 
                  to="/add-item" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>List Item</span>
                </Link>
              )}
              
              {user ? (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-emerald-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-emerald-600">{user.points} points</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                  
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left text-red-600 hover:text-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}