import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, LogOut, Menu, LogIn } from 'lucide-react';
import { useCompanyDetails } from '../hooks/useCompanyDetails';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { company } = useCompanyDetails();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setIsLoggedIn(!!user);
  }, [location.pathname]);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem('currentUser');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {company.logo_url ? (
            <img src={company.logo_url} alt={`${company.name} Logo`} className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
          ) : (
            <Sparkles className="text-indigo-400 w-6 h-6" />
          )}
          <span className="text-white font-bold text-lg tracking-tight hidden sm:block">{company.name}</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
          <Link to="/showcase" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Demos</Link>
          <Link to="/blogs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Blogs</Link>
          <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About Us</Link>
          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">OmniServeAI</a>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={handleAuthAction} className="text-sm text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
            {isLoggedIn ? (
              <><LogOut size={16} /> <span className="hidden sm:inline">Sign Out</span></>
            ) : (
              <><LogIn size={16} /> <span className="hidden sm:inline">Sign In</span></>
            )}
          </button>
          <button className="md:hidden text-slate-400 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
