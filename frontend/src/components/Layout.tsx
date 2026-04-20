import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, X, LogOut, LogIn } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  const navItems = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Assessment', path: '/assessment' },
        { name: 'Validation', path: '/validation' },
        { name: 'Insights', path: '/insights' },
        { name: 'Predict', path: '/predict' },
      ]
    : [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-surface-container-high/80 bg-surface/75 backdrop-blur-xl">
      <nav className="max-w-screen-2xl mx-auto px-5 lg:px-10 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 interactive-lift">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/35 bg-primary/10 text-primary text-xs font-bold">GP</span>
          <span className="text-xl md:text-2xl font-extrabold text-on-surface tracking-tight font-manrope">
            GlucoPulse AI
          </span>
        </Link>

        {/* Desktop nav links — only visible when logged in */}
        {navItems.length > 0 && (
          <div className="hidden md:flex items-center gap-2 rounded-full border border-surface-container-high/70 bg-surface-container-low/70 px-2 py-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'interactive-lift rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
                  location.pathname === item.path 
                    ? 'bg-primary/15 text-primary shadow-[0_0_0_1px_rgb(42_215_196_/_0.25)]'
                    : 'text-on-surface-variant hover:text-on-surface'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          {!isLoading && isAuthenticated ? (
            <>
              <button className="hidden sm:inline-flex p-2.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-full transition-all duration-200 interactive-lift">
                <Bell size={20} />
              </button>

              {/* User chip */}
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-surface-container-high/70 bg-surface-container-low/70 pl-3 pr-1 py-1">
                <span className="text-xs font-semibold text-on-surface-variant truncate max-w-[120px]">
                  {user?.profile?.firstName || user?.email?.split('@')[0] || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-on-surface-variant hover:text-tertiary hover:bg-tertiary/10 rounded-full transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : !isLoading ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-full border border-surface-container-high bg-surface-container-low px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-all duration-200 interactive-lift"
              >
                <LogIn size={16} />
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary text-sm interactive-lift"
              >
                Get Started
              </Link>
            </div>
          ) : null}

          <button 
            className="md:hidden p-2.5 text-on-surface-variant rounded-full hover:bg-surface-container-low"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-surface border-t border-surface-container-high px-5 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'text-sm font-semibold py-2.5 px-3 rounded-xl',
                location.pathname === item.path ? 'bg-primary/12 text-primary' : 'text-on-surface-variant'
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile auth actions */}
          {isAuthenticated ? (
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="text-sm font-semibold py-2.5 px-3 rounded-xl text-tertiary hover:bg-tertiary/10 text-left flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold py-2.5 px-3 rounded-xl text-on-surface-variant"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold py-2.5 px-3 rounded-xl text-primary"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-14 border-t border-surface-container-high/80 bg-surface-container-low/60 py-14 px-5 lg:px-10">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="text-lg font-bold text-on-surface mb-3 font-manrope">GlucoPulse AI</div>
          <p className="text-xs text-on-surface-variant/90 leading-relaxed max-w-xs">
            © 2024 GlucoPulse AI. Clinical-grade risk intelligence. This platform supports informed decision-making and does not replace professional medical diagnosis or treatment.
          </p>
        </div>
        
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors duration-200">Clinical Whitepaper</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors duration-200">About AI Model</a></li>
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors duration-200">Contact Support</a></li>
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors duration-200">Press Kit</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
