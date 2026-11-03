import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Activity, GraduationCap } from 'lucide-react';

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

          {/* Quick Access */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 700 }}>
              Access &amp; Evaluation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              <li><Link to="/login" style={{ color: 'var(--text-secondary)' }}>Evaluator Sign In</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-secondary)' }}>Student Registration</Link></li>
              <li><Link to="/admin" style={{ color: 'var(--text-secondary)' }}>Evaluation Admin Portal</Link></li>
              <li><Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Creator Dashboard</Link></li>
            </ul>
          </div>

          {/* University Project Accreditation */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <GraduationCap size={15} /> Academic Project
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              KL University (KLU) Engineering Project. Evaluated under Course Outcomes CO-1 (Semantic HTML5, Git) &amp; CO-2 (CSS Grid, Flexbox, Async JavaScript, REST APIs).
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Faculty Evaluator: <strong>Suneetha Mam</strong>
            </div>
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
