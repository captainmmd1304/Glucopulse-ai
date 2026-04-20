import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { UserPlus, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const reduceMotion = useReducedMotion();
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, firstName, lastName);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="panel p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/35 bg-secondary/10 text-secondary mb-5">
              <UserPlus size={26} />
            </div>
            <h1 className="text-3xl font-bold font-manrope text-on-surface mb-2">Create account</h1>
            <p className="text-sm text-on-surface-variant">
              Start tracking your metabolic health with clinical precision
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-tertiary/40 bg-tertiary/10 px-4 py-3">
              <AlertCircle className="text-tertiary shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-tertiary">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="register-firstName" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-[0.14em] mb-2">
                  First Name
                </label>
                <input
                  id="register-firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="John"
                  className="w-full rounded-xl border border-surface-container-high bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
              <div>
                <label htmlFor="register-lastName" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-[0.14em] mb-2">
                  Last Name
                </label>
                <input
                  id="register-lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Doe"
                  className="w-full rounded-xl border border-surface-container-high bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="register-email" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-[0.14em] mb-2">
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>

            <div>
              <label htmlFor="register-password" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-[0.14em] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min. 8 characters"
                  className="w-full rounded-xl border border-surface-container-high bg-surface-container-low px-4 py-3 pr-12 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="register-confirm" className="block text-xs font-semibold text-on-surface-variant uppercase tracking-[0.14em] mb-2">
                Confirm Password
              </label>
              <input
                id="register-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-type password"
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-low px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center text-base interactive-lift disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 pt-6 border-t border-surface-container-high/60 flex items-center justify-center gap-2 text-on-surface-variant">
            <ShieldCheck size={14} className="text-secondary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              256-bit Encrypted • HIPAA Compliant
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
