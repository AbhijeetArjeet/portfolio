import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(emailOrUsername, password);
      if (data.user?.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const autofillFaculty = () => {
    setEmailOrUsername('Suneetha Mam');
    setPassword('12345');
  };

  const autofillStudent = () => {
    setEmailOrUsername('abhijeet@example.com');
    setPassword('password123');
  };

  return (
    <div style={{ padding: '3.5rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - var(--header-height))' }}>
      <div className="card" style={{ width: '100%', maxWidth: 440, padding: '2.25rem' }}>
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
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Welcome back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            Sign in to manage and customize your portfolio
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div
          style={{
            background: 'var(--primary-subtle)',
            border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.9rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
            <ShieldCheck size={16} /> Quick Evaluator Credentials
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
            Faculty Admin: <strong>Suneetha Mam</strong> &bull; Password: <strong>12345</strong>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={autofillFaculty}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
            >
              Autofill Faculty Admin
            </button>
            <button
              type="button"
              onClick={autofillStudent}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
            >
              Autofill Student (Abhijeet)
            </button>
          </div>
        </div>

        {error && (
          <div
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
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email or Username</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Suneetha Mam or abhijeet@example.com"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
            Create one now
          </Link>
        </div>
      </div>
    </div>
  );
}
