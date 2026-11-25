import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  emailOrUsername: z.string().min(2, 'Username or Email is required'),
  password: z.string().min(1, 'Password is required')
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { login } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectFromQuery = queryParams.get('redirect');
  const redirectPath = redirectFromQuery || location.state?.from?.pathname;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      emailOrUsername: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setServerError('');
    setLoading(true);

    try {
      const res = await login(data.emailOrUsername, data.password);
      success(`Welcome back, ${res.user?.name || 'Developer'}!`);
      
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      } else if (res.user?.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err.message || 'Login failed. Please check your credentials.';
      setServerError(msg);
      toastError(msg);
    } finally {
      setLoading(false);
    }
  };

  const autofillAdmin = () => {
    setValue('emailOrUsername', 'suneetha@university.edu');
    setValue('password', '12345');
    setServerError('');
  };

  const autofillAbhijeet = () => {
    setValue('emailOrUsername', 'tathagattanmayall@gmail.com');
    setValue('password', 'password123');
    setServerError('');
  };

  const autofillHritik = () => {
    setValue('emailOrUsername', 'hroy50750@gmail.com');
    setValue('password', 'password123');
    setServerError('');
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
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            Sign in to manage, customize, and publish your web portfolio
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div
          style={{
            background: 'var(--primary-subtle)',
            border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
            <ShieldCheck size={16} /> Quick Demo Accounts (1-Click Test)
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.6rem', fontSize: '0.82rem' }}>
            Click any button below to autofill live accounts:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={autofillAdmin}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.75rem', padding: '4px 9px' }}
            >
              🛡️ Admin Demo
            </button>
            <button
              type="button"
              onClick={autofillAbhijeet}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '4px 9px' }}
            >
              👨‍💻 Full-Stack Dev (Abhijeet)
            </button>
            <button
              type="button"
              onClick={autofillHritik}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '4px 9px' }}
            >
              💼 Minimal Pro (Hritik)
            </button>
          </div>
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
          <div className="form-group">
            <label className="form-label" htmlFor="login-username">Email or Username</label>
            <input
              id="login-username"
              type="text"
              className="form-input"
              placeholder="e.g. Abhijeet Arjeet or tathagattanmayall@gmail.com"
              aria-invalid={!!errors.emailOrUsername}
              aria-describedby={errors.emailOrUsername ? 'login-user-error' : undefined}
              {...register('emailOrUsername')}
            />
            {errors.emailOrUsername && (
              <span id="login-user-error" className="form-error-msg" role="alert">
                <AlertCircle size={13} /> {errors.emailOrUsername.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'login-pwd-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <span id="login-pwd-error" className="form-error-msg" role="alert">
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
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don&apos;t have an account yet?{' '}
          <Link to="/register" style={{ fontWeight: 600, color: 'var(--primary)' }}>
            Create one now &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
