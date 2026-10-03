import React from 'react';

export default function LoadingSpinner({ text = 'Loading...', size = 'md' }) {
  const sizeMap = {
    sm: { width: 18, height: 18, borderWidth: 2 },
    md: { width: 32, height: 32, borderWidth: 3 },
    lg: { width: 48, height: 48, borderWidth: 4 }
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', gap: '0.75rem' }}>
      <div
        style={{
          width: dim.width,
          height: dim.height,
          border: `${dim.borderWidth}px solid var(--border-color)`,
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      {text && <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 500 }}>{text}</span>}
    </div>
  );
}
