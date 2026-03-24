import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Risk Assessment', path: '/assessment' },
    { name: 'Clinical Validation', path: '/validation' },
    { name: 'Insights', path: '/insights' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-surface-container-high">
      <nav className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-primary tracking-tight font-manrope">
            GlucoPulse AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.path 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-on-surface-variant"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
            <Bell size={20} />
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
            <User size={20} />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-on-surface-variant"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-surface-container-high px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-sm font-medium py-2",
                location.pathname === item.path ? "text-primary" : "text-on-surface-variant"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-surface-container-high py-16 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="text-xl font-bold text-primary mb-4 font-manrope">GlucoPulse AI</div>
          <p className="text-xs text-on-surface-variant leading-relaxed max-w-xs">
            © 2024 GlucoPulse AI. Clinical Grade Risk Analytics. Medical Disclaimer: This platform provides risk predictions and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
        
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Clinical Whitepaper</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">About AI Model</a></li>
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-xs text-on-surface-variant hover:text-primary transition-colors">Press Kit</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
