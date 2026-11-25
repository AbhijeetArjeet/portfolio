import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

// Zod Schema for Registration validation
const registerSchema = z.object({
  name: z.string().min(2, 'Full name must be at least 2 characters').max(70, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  githubUsername: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register: registerAuth } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      githubUsername: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);

    try {
      await registerAuth({
        name: data.name,
        email: data.email,
        password: data.password,
        githubUsername: data.githubUsername ? data.githubUsername.trim() : undefined
      });
      success(`Welcome to PortfolioForge, ${data.name}! Your portfolio space is ready.`);
      navigate(redirectPath);
    } catch (err) {
      const msg = err.message || 'Registration failed. Please check the details entered.';
      setServerError(msg);
      toastError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3.5rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - var(--header-height))' }}>
      <div className="card" style={{ width: '100%', maxWidth: 460, padding: '2.25rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '10px',
              background: 'var(--primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              marginBottom: '0.75rem'
            }}
          >
            <Sparkles size={22} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Create an Account</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            Set up your profile and launch your custom portfolio in seconds
          </p>
        </div>

        {serverError && (
          <div
            role="alert"
            style={{
              background: 'var(--danger-bg)',
              border: '1px solid var(--danger-border)',
              color: 'var(--danger-text)',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}
          >
            <AlertCircle size={16} /> {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">Full Name *</label>
            <input
              id="register-name"
              type="text"
              className="form-input"
              placeholder="e.g. Abhijeet Arjeet"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              {...register('name')}
            />
            {errors.name && (
              <span id="name-error" className="form-error-msg" role="alert">
                <AlertCircle size={13} /> {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email Address *</label>
            <input
              id="register-email"
              type="email"
              className="form-input"
              placeholder="e.g. yourname@gmail.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <span id="email-error" className="form-error-msg" role="alert">
                <AlertCircle size={13} /> {errors.email.message}
              </span>
            )}
          </div>

          {/* GitHub Username */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-github">GitHub Username (Optional)</label>
            <input
              id="register-github"
              type="text"
              className="form-input"
              placeholder="e.g. your-github-handle (for 1-click repo sync)"
              {...register('githubUsername')}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="register-password">Password * (Min 6 characters)</label>
            <input
              id="register-password"
              type="password"
              className="form-input"
              placeholder="Choose a secure password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <span id="password-error" className="form-error-msg" role="alert">
                <AlertCircle size={13} /> {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Get Started'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 600, color: 'var(--primary)' }}>
            Sign in &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
