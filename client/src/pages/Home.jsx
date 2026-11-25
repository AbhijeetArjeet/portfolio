import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { user } = useAuth();
  const [gallery, setGallery] = useState([]);
  const [activeTab, setActiveTab] = useState('developer');

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

          {/* Key Feature Highlights */}
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
            <span>📝 <strong>Blogs &amp; Insights</strong></span>
            <span>&bull;</span>
            <span>📬 <strong>Contact Forms</strong></span>
            <span>&bull;</span>
            <span>🔍 <strong>SEO Optimized</strong></span>
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section id="templates" style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 750, margin: '0 auto 3rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>13 Designer Architectures</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Distinctive, Production-Grade Portfolio Templates
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Choose from 13 modern architectures: Aura Lime, Vibrant Pastel, Warm Spotlight, Cyber Neon, Crimson Bold, Editorial Mono, Neo-Brutalist, Warm Playful, Executive CV, Glass Slate, Minimal, Developer, and Creative Bento.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Template: Aura Lime */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #84cc16' }}>
              <div style={{ height: 140, background: 'radial-gradient(circle, rgba(163, 230, 53, 0.4) 0%, #ffffff 80%)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4d7c0f', textTransform: 'uppercase' }}>🏆 Website of the Day</span>
                <strong style={{ fontSize: '1.25rem', color: '#111827', marginTop: '0.25rem' }}>Aura Lime</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#4d7c0f' }}>Aura Lime</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Luminous lime aura hero, award laurel badge, trusted brand ticker strip, and dark pill action buttons.
              </p>
              <Link to={getTemplateLink('aura-lime')} className="btn btn-outline btn-sm">
                Use Aura Lime &rarr;
              </Link>
            </div>

            {/* Template: Vibrant Pastel */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #8b5cf6' }}>
              <div style={{ height: 140, background: 'linear-gradient(135deg, #f5f3ff 0%, #fae8ff 100%)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ background: '#ec4899', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>Hello I'm Here</span>
                <strong style={{ fontSize: '1.25rem', color: '#7c3aed', marginTop: '0.35rem' }}>Vibrant Pastel</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#7c3aed' }}>Vibrant Pastel</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Floating white card on purple aura, internal top bar, framed portrait card, and vibrant gradient buttons.
              </p>
              <Link to={getTemplateLink('vibrant-card')} className="btn btn-outline btn-sm">
                Use Vibrant Pastel &rarr;
              </Link>
            </div>

            {/* Template: Warm Spotlight */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #f97316' }}>
              <div style={{ height: 140, background: '#09090b', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}></div>
                <strong style={{ fontSize: '1.25rem', color: '#fb923c', marginTop: '0.25rem' }}>Warm Spotlight</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#ea580c' }}>Warm Spotlight</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Obsidian dark theme with ambient burnt orange spotlight aura, bold creative director typography.
              </p>
              <Link to={getTemplateLink('warm-spotlight')} className="btn btn-outline btn-sm">
                Use Warm Spotlight &rarr;
              </Link>
            </div>

            {/* Template: Cyber Neon */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #06b6d4' }}>
              <div style={{ height: 140, background: '#060913', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#22d3ee' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>&gt;_ SYSTEM.ONLINE</span>
                <strong style={{ fontSize: '1.25rem', color: '#06b6d4', marginTop: '0.25rem' }}>Cyber Neon</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#0891b2' }}>Cyber Neon</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Glowing cyan ring portrait, developer stats counter strip, terminal logs, and high-tech cards.
              </p>
              <Link to={getTemplateLink('cyber-neon')} className="btn btn-outline btn-sm">
                Use Cyber Neon &rarr;
              </Link>
            </div>

            {/* Template: Crimson Bold */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #ef4444' }}>
              <div style={{ height: 140, background: '#0e0e11', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#ef4444' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>⚡ HIGH IMPACT</span>
                <strong style={{ fontSize: '1.25rem', color: '#ef4444', marginTop: '0.25rem' }}>Crimson Bold</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#dc2626' }}>Crimson Bold</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Pure jet OLED canvas with electric scarlet highlights, stat callouts, and high-energy styling.
              </p>
              <Link to={getTemplateLink('crimson-bold')} className="btn btn-outline btn-sm">
                Use Crimson Bold &rarr;
              </Link>
            </div>

            {/* Template: Editorial Mono */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #18181b' }}>
              <div style={{ height: 140, background: '#fbfbfb', border: '1px solid #e5e7eb', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#18181b' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'serif', letterSpacing: '0.1em' }}>VOL. 25 &bull; ARCHIVE</span>
                <strong style={{ fontSize: '1.25rem', fontFamily: 'serif', marginTop: '0.25rem' }}>Editorial Mono</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>Editorial Mono</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                High-fashion monochrome magazine styling, oversized outlined display headers, and lookbook layout.
              </p>
              <Link to={getTemplateLink('editorial-mono')} className="btn btn-outline btn-sm">
                Use Editorial Mono &rarr;
              </Link>
            </div>

            {/* Template: Brutalist Tech */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '2px solid #121212', boxShadow: '4px 4px 0px #121212' }}>
              <div style={{ height: 140, background: '#fef08a', border: '1px solid #121212', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#121212' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700 }}>[ + ] SPEC_2026</span>
                <strong style={{ fontSize: '1.25rem', fontFamily: 'monospace', marginTop: '0.25rem' }}>BRUTALIST_TECH</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>Neo-Brutalist</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Industrial technical blueprint grid, monospaced typography, sharp black borders, and neon yellow accents.
              </p>
              <Link to={getTemplateLink('brutalist-tech')} className="btn btn-outline btn-sm">
                Use Neo-Brutalist &rarr;
              </Link>
            </div>

            {/* Template: Warm Playful */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #f59e0b' }}>
              <div style={{ height: 140, background: '#fefce8', border: '1px solid #fef08a', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700 }}>☀️ SUNNY STUDIO</span>
                <strong style={{ fontSize: '1.25rem', color: '#b45309', marginTop: '0.25rem' }}>Warm Playful</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#b45309' }}>Warm Playful</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Sunny golden yellow accents, welcoming organic curves, sticker tags, and friendly portfolio cards.
              </p>
              <Link to={getTemplateLink('warm-playful')} className="btn btn-outline btn-sm">
                Use Warm Playful &rarr;
              </Link>
            </div>

            {/* Template: Executive CV */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #059669' }}>
              <div style={{ height: 140, background: '#064e3b', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em' }}>EXECUTIVE DOSSIER</span>
                <strong style={{ fontSize: '1.25rem', color: '#34d399', marginTop: '0.25rem' }}>Executive CV</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#065f46' }}>Executive CV</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Structured 2-column dossier, sage emerald banner, executive summary, and comprehensive timeline.
              </p>
              <Link to={getTemplateLink('executive-cv')} className="btn btn-outline btn-sm">
                Use Executive CV &rarr;
              </Link>
            </div>

            {/* Template: Glass Slate */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #6366f1' }}>
              <div style={{ height: 140, background: '#0a0b10', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 700 }}>✨ FROSTED GLASS</span>
                <strong style={{ fontSize: '1.25rem', color: '#818cf8', marginTop: '0.25rem' }}>Glass Slate</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem', color: '#4f46e5' }}>Glass Slate</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Frosted glassmorphism over deep slate canvas, ambient purple & cyan glows, floating tech cards.
              </p>
              <Link to={getTemplateLink('glass-slate')} className="btn btn-outline btn-sm">
                Use Glass Slate &rarr;
              </Link>
            </div>

            {/* Template: Minimal */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 140, background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Minimal Professional</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>Minimal Professional</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Clean, spacious typography-led layout tailored for software architects, managers, and consultants.
              </p>
              <Link to={getTemplateLink('minimal')} className="btn btn-outline btn-sm">
                Use Minimal &rarr;
              </Link>
            </div>

            {/* Template: Developer */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', borderColor: 'var(--primary)' }}>
              <div style={{ height: 140, background: '#0d1117', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', color: '#58a6ff', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>$ curl github/Abhijeet</div>
                <div style={{ color: '#3fb950', marginTop: 4 }}>// Systems &amp; Full-Stack</div>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>Modern Developer</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Developer terminal window, live status pulses, repository badges, and technical skill matrices.
              </p>
              <Link to={getTemplateLink('developer')} className="btn btn-primary btn-sm">
                Use Developer &rarr;
              </Link>
            </div>

            {/* Template: Creative Bento */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: 140, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={36} color="#6366f1" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>Creative Bento</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', flex: 1 }}>
                Bento-grid showcase with dynamic card spans, media previews, and eye-catching portfolio visuals.
              </p>
              <Link to={getTemplateLink('creative')} className="btn btn-outline btn-sm">
                Use Creative Bento &rarr;
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
              Built for Creators, Engineers &amp; Professionals
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Everything needed to build, host, and publish high-converting personal portfolios with complete privacy and SEO.
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
                Users only have privileges to edit their own portfolios. Platform administrators access a moderation portal.
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
