import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Activity, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '3.5rem 0 2rem',
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
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.75rem' }}>
              <Sparkles size={18} color="var(--primary)" /> PortfolioForge
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Modern multi-user portfolio creation platform with automated Render health keep-alive monitoring and one-click GitHub synchronization.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--success-text)', background: 'var(--success-bg)', padding: '4px 10px', borderRadius: 'var(--radius-full)', width: 'fit-content', border: '1px solid var(--success-border)' }}>
              <Activity size={13} /> 99.9% Uptime Monitored
            </div>
          </div>

          {/* Product Templates */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 700 }}>
              Live Showcase
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li>
                <Link to="/u/abhijeet-arjeet" style={{ color: 'var(--text-secondary)' }}>
                  Abhijeet Arjeet (Developer)
                </Link>
              </li>
              <li>
                <Link to="/u/hritik-kumar" style={{ color: 'var(--text-secondary)' }}>
                  Hritik Kumar (Minimal)
                </Link>
              </li>
              <li>
                <Link to="/u/dsri-sarvagna" style={{ color: 'var(--text-secondary)' }}>
                  D. Sri Sarvagna (Creative)
                </Link>
              </li>
              <li>
                <a href="/api/health" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                  Render Health Telemetry &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Access */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 700 }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li><Link to="/login" style={{ color: 'var(--text-secondary)' }}>Sign In to Account</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-secondary)' }}>Create Your Portfolio</Link></li>
              <li><Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Creator Dashboard</Link></li>
              <li><Link to="/editor" style={{ color: 'var(--text-secondary)' }}>Live Studio Editor</Link></li>
            </ul>
          </div>

          {/* Platform Mission & SEO Overview */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Globe size={15} /> Personal Portfolio Platform
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              A personal portfolio website helps individuals showcase their skills, projects, and achievements. The platform includes features like project galleries, blogs, and contact forms. It is optimized for SEO to increase visibility, making it ideal for professionals to present their work to potential employers or clients.
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
            &copy; {new Date().getFullYear()} PortfolioForge &bull; Developed by <strong>Abhijeet Arjeet</strong>, <strong>Hritik Kumar</strong> &amp; <strong>D. Sri Sarvagna</strong>.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={14} color="var(--primary)" /> Role-Based Privilege Isolation &bull; Render Keep-Alive Active
          </div>
        </div>
      </div>
    </footer>
  );
}
