import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioService } from '../services/portfolio.service';
import {
  Sparkles,
  ArrowRight,
  Github,
  Layout,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle,
  ExternalLink,
  Activity
} from 'lucide-react';

export default function Home() {
  const [gallery, setGallery] = useState([]);
  const [activeTab, setActiveTab] = useState('developer');

  useEffect(() => {
    portfolioService.getPublicGallery().then(data => {
      setGallery(data.portfolios || []);
    }).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          padding: '5rem 0 4rem',
          textAlign: 'center',
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.15), transparent)'
        }}
      >
        <div className="container" style={{ maxWidth: 860 }}>
          <div
            className="badge badge-primary"
            style={{ marginBottom: '1.5rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
          >
            <Activity size={14} /> Render Backend Keep-Alive &bull; Automated Health Checks Enabled
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.04em',
              marginBottom: '1.25rem'
            }}
          >
            Build your personal portfolio <span style={{ color: 'var(--primary)' }}>without writing code.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: 700,
              margin: '0 auto 2.5rem'
            }}
          >
            Import your GitHub repositories, customize responsive Grid or Flexbox layouts, select curated templates, and publish your permanent public portfolio link in seconds.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Your Portfolio <ArrowRight size={18} />
            </Link>
            <Link to="/u/abhijeet-arjeet" className="btn btn-secondary btn-lg">
              Explore Live Student Portfolio <ExternalLink size={16} />
            </Link>
          </div>

          {/* Quick Evaluator Access Hint */}
          <div
            style={{
              marginTop: '2.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}
          >
            <span>🎓 Faculty Evaluator?</span>
            <Link to="/login" style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'underline' }}>
              Autofill Suneetha Mam / 12345 to test Admin Portal &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section id="templates" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              3 Distinctive, Production-Grade Templates
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Built strictly with semantic HTML5, CSS Grid, Flexbox, and responsive design systems.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Template 1 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 160, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#cbd5e1', marginBottom: '0.75rem' }} />
                <div style={{ height: 12, width: '60%', background: '#94a3b8', borderRadius: 4, marginBottom: '0.5rem' }} />
                <div style={{ height: 8, width: '40%', background: '#cbd5e1', borderRadius: 4 }} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>Minimal Professional</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>
                Clean, spacious typography-led layout tailored for software architects, managers, and consultants.
              </p>
              <Link to="/u/alex-morgan" className="btn btn-outline btn-sm">
                Preview Minimal Template &rarr;
              </Link>
            </div>

            {/* Template 2 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', borderColor: 'var(--primary)' }}>
              <div style={{ height: 160, background: '#0d1117', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem', color: '#58a6ff', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: '0.75rem' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div>$ curl github/AbhijeetArjeet</div>
                <div style={{ color: '#3fb950', marginTop: 4 }}>// Systems &amp; Full-Stack Dev</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Modern Developer</h3>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Popular</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>
                Developer terminal window, live status pulses, repository badges, and technical skill matrices.
              </p>
              <Link to="/u/abhijeet-arjeet" className="btn btn-primary btn-sm">
                Preview Developer Template &rarr;
              </Link>
            </div>

            {/* Template 3 */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 160, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={40} color="#6366f1" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>Creative Bento</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>
                Bento-grid showcase with dynamic card spans, media previews, and eye-catching portfolio visuals.
              </p>
              <Link to="/u/abhijeet-arjeet" className="btn btn-outline btn-sm">
                Preview Bento Template &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '4rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Built for Students, Engineers &amp; Faculty
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Everything needed to build, host, and monitor custom web portfolios with complete security.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            <div className="card">
              <Github size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>1-Click GitHub Sync</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Fetch public repositories and repository stats with a single click. No manual data copying required.
              </p>
            </div>

            <div className="card">
              <Layout size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Grid &amp; Flexbox Customizer</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Switch effortlessly between responsive CSS Grid multi-column cards and vertical CSS Flexbox rows.
              </p>
            </div>

            <div className="card">
              <ShieldCheck size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Role-Based Access Control</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Users only have privileges to edit their own portfolios. Faculty evaluators access a moderation portal.
              </p>
            </div>

            <div className="card">
              <Activity size={28} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Keep-Alive Monitoring</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Automated <code>/api/health</code> liveness checks prevent unnecessary Render sleep and retry cold starts safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Public Gallery Section */}
      {gallery.length > 0 && (
        <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Published Student Portfolios</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Browse publicly shareable portfolios hosted on the platform</p>
              </div>
              <Link to="/register" className="btn btn-outline btn-sm">
                Add Your Portfolio &rarr;
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {gallery.map((p) => (
                <Link
                  key={p.id}
                  to={`/u/${p.slug}`}
                  className="card"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <img
                      src={p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={p.title}
                      style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'; }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{p.title}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>/u/{p.slug}</div>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem', flex: 1 }}>
                    {p.headline || 'Developer portfolio'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <span>Template: {p.templateId}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>View Portfolio &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
