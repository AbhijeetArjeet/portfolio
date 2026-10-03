import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '3rem 0 2rem',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.75rem' }}>
              <Sparkles size={18} color="var(--primary)" /> PortfolioForge
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Production multi-user portfolio creation platform with automated Render health keep-alive monitoring and GitHub synchronization.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><a href="#templates" style={{ color: 'var(--text-secondary)' }}>Portfolio Templates</a></li>
              <li><a href="#features" style={{ color: 'var(--text-secondary)' }}>GitHub Import</a></li>
              <li><Link to="/u/abhijeet-arjeet" style={{ color: 'var(--text-secondary)' }}>Featured Student Portfolio</Link></li>
              <li><a href="/api/health" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>Live Render Health Ping</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Evaluation & Access
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
              <li><Link to="/login" style={{ color: 'var(--text-secondary)' }}>Faculty Evaluator Login</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-secondary)' }}>Student Account Registration</Link></li>
              <li><Link to="/admin" style={{ color: 'var(--text-secondary)' }}>Evaluation Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Syllabus Mapping
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Course Modules: CO-1 (Semantic HTML5, Git) &amp; CO-2 (CSS Grid, Flexbox, Responsive UI, Core Asynchronous JavaScript, RESTful APIs).
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} PortfolioForge. Designed and built with React, Node.js &amp; Prisma.
          </div>
          <div>
            Protected under Role-Based Access Control &bull; Render Keep-Alive Enabled
          </div>
        </div>
      </div>
    </footer>
  );
}
