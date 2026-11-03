import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Home, UserPlus, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', maxWidth: 560 }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'var(--primary-subtle)',
          color: 'var(--primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <Compass size={36} />
      </div>
      <h1 style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1, letterSpacing: '-0.04em' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '1rem 0 0.5rem' }}>
        Page or Portfolio Not Found
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.6 }}>
        The link you followed may be broken, unpublished, or the URL slug might have changed.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Return Home
        </Link>
        <Link to="/u/abhijeet-arjeet" className="btn btn-secondary">
          <Sparkles size={16} /> Featured Portfolio
        </Link>
        <Link to="/register" className="btn btn-outline">
          <UserPlus size={16} /> Create Portfolio
        </Link>
      </div>
    </div>
  );
}
