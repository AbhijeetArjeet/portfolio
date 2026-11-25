import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { portfolioService } from '../services/portfolio.service';
import { TEMPLATES_CATALOG, TEMPLATE_CATEGORIES } from '../data/templatesCatalog';
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
  Layers,
  MessageCircle,
  Linkedin,
  Share2
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const [gallery, setGallery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getTemplateLink = (templateId) => {
    if (user) {
      return `/editor?template=${templateId}`;
    }
    return `/login?redirect=${encodeURIComponent(`/editor?template=${templateId}`)}`;
  };

  useEffect(() => {
    portfolioService.getPublicGallery().then(data => {
      setGallery(data.portfolios || []);
    }).catch(() => {});
  }, []);

  const filteredTemplates = selectedCategory === 'All'
    ? TEMPLATES_CATALOG
    : TEMPLATES_CATALOG.filter((tpl) => tpl.categories?.includes(selectedCategory));

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
        <div className="container" style={{ maxWidth: 880 }}>
          <div
            className="badge badge-primary"
            style={{ marginBottom: '1.5rem', padding: '0.4rem 1.25rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={14} /> 17 Designer Architectures &bull; Multi-Portfolio Stack &bull; Verified Sync
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.04em',
              marginBottom: '1.25rem'
            }}
          >
            Build your personal portfolio <br className="hide-mobile" />
            <span style={{ color: 'var(--primary)' }}>without writing code.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: 720,
              margin: '0 auto 2.5rem'
            }}
          >
            A personal portfolio website helps individuals showcase their skills, projects, and achievements. The platform includes features like project galleries, blogs, and contact forms. It is optimized for SEO to increase visibility, making it ideal for professionals to present their work to potential employers or clients.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Create Your Portfolio <ArrowRight size={18} />
            </Link>
            <Link to="/u/abhijeet-arjeet" className="btn btn-secondary btn-lg">
              Explore Live Portfolio <ExternalLink size={16} />
            </Link>
          </div>

          {/* Key Feature Highlights Pill */}
          <div
            style={{
              marginTop: '2.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              padding: '0.65rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <span>✨ <strong>Project Galleries</strong></span>
            <span>&bull;</span>
            <span>💬 <strong>1-Click WhatsApp Chat</strong></span>
            <span>&bull;</span>
            <span>📦 <strong>1-Click GitHub Import</strong></span>
            <span>&bull;</span>
            <span>🔍 <strong>SEO &amp; OpenGraph Optimized</strong></span>
          </div>
        </div>
      </section>

      {/* Templates Showcase Section with Category Filtering */}
      <section id="templates" style={{ padding: '4.5rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 2.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>17 Production Architectures</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Distinctive, Production-Grade Portfolio Templates
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0 }}>
              Showcase your best work with these professional portfolio design templates.
            </p>
          </div>

          {/* Category Filter Pills (matching user mockup) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {TEMPLATE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: isActive ? 'var(--primary)' : 'var(--bg-card)',
                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Templates Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                {/* Visual Header / Thumbnail */}
                <div
                  style={{
                    height: 150,
                    background: tpl.bg,
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: tpl.textColor,
                      background: 'rgba(255, 255, 255, 0.92)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {tpl.badge}
                  </span>
                  <strong style={{ fontSize: '1.25rem', color: tpl.id === 'editorial-mono' || tpl.id === 'brutalist-tech' || tpl.id === 'split-mono' ? '#000' : (tpl.bg?.includes('#09090b') || tpl.bg?.includes('#060913') || tpl.bg?.includes('#0e0e11') || tpl.bg?.includes('#064e3b') || tpl.bg?.includes('#0d1117') || tpl.bg?.includes('#0a0b10') ? '#fff' : '#111') }}>
                    {tpl.name}
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{tpl.name}</h3>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {tpl.categories?.slice(0, 2).map((c) => (
                      <span key={c} style={{ fontSize: '0.68rem', background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '2px 6px', borderRadius: '4px' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1, lineHeight: 1.5 }}>
                  {tpl.description}
                </p>

                <Link to={getTemplateLink(tpl.id)} className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  Use {tpl.name} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '4.5rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 3rem' }}>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Built for Modern Creators &amp; Engineers
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Everything needed to build, publish, and share role-tailored portfolios with zero coding.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <Layers size={26} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Multi-Portfolio Stack</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Create separate portfolios for different roles (e.g. Developer, UX Designer, Executive) with unique custom URLs.
              </p>
            </div>

            <div className="card">
              <MessageCircle size={26} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Direct WhatsApp Chat</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Recruiters and clients can start instant WhatsApp chats with pre-filled greetings, eliminating lost form inquiries.
              </p>
            </div>

            <div className="card">
              <Github size={26} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>1-Click GitHub Sync</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Import public repositories, tech stacks, and live demo links directly from GitHub with identity verification.
              </p>
            </div>

            <div className="card">
              <Layout size={26} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Device Viewport Simulator</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Live visual preview simulator supporting Desktop, Tablet (768px), and Mobile (375px) with 700ms autosave.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Public Portfolios Section */}
      {gallery.length > 0 && (
        <section style={{ padding: '4.5rem 0', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Featured Creator Portfolios</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Explore verified portfolios published on the platform</p>
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
