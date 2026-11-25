import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { portfolioService } from '../services/portfolio.service';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Edit3,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Globe,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  GitBranch,
  ShieldAlert,
  ArrowRight,
  Monitor
} from 'lucide-react';

const AVAILABLE_TEMPLATES = [
  { id: 'aura-lime', name: 'Aura Lime (Modern High Impact)', desc: 'Luminous lime aura with award badges and dark pill CTAs' },
  { id: 'cyber-neon', name: 'Cyber Neon (Terminal & Stats)', desc: 'Glowing cyan cybernetic styling with live terminal logs' },
  { id: 'crimson-bold', name: 'Crimson Bold (OLED Canvas)', desc: 'Pure jet dark OLED with electric scarlet accents' },
  { id: 'vibrant-card', name: 'Vibrant Card (Framed Portrait)', desc: 'Floating white card on vibrant purple-indigo backdrop' },
  { id: 'warm-spotlight', name: 'Warm Spotlight (Creative Director)', desc: 'Obsidian dark canvas with ambient burnt orange glow' },
  { id: 'brutalist-tech', name: 'Neo-Brutalist Tech (Industrial)', desc: 'Architectural blueprint grid, bold borders & neon yellow' },
  { id: 'warm-playful', name: 'Warm Playful (Friendly Creator)', desc: 'Sunny golden stickers, organic curves and friendly badges' },
  { id: 'glass-slate', name: 'Glass Slate (Frosted Glass)', desc: 'Ultra-modern frosted backdrop with translucent glass cards' },
  { id: 'editorial-mono', name: 'Editorial Mono (High Fashion)', desc: 'Oversized serif headlines, monochrome typography & lookbook' },
  { id: 'executive-cv', name: 'Executive CV (Dossier Layout)', desc: 'Emerald green executive styling with timeline and credential links' },
  { id: 'developer', name: 'Developer (Code & Architecture)', desc: 'Tech stack highlights, terminal widgets and repo sync' },
  { id: 'creative', name: 'Creative (Visual Showcase)', desc: 'Bold typography and dynamic media-centric showcase' },
  { id: 'minimal', name: 'Minimal (Clean Professional)', desc: 'Timeless typography and distraction-free portfolio layout' }
];

export default function Dashboard() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    headline: 'Developer & Creator',
    templateId: 'aura-lime'
  });

  const fetchPortfolios = async () => {
    try {
      const data = await portfolioService.getMyPortfolios();
      const list = data?.portfolios || [];
      if (list.length > 0) {
        setPortfolios(list);
      } else {
        // Fallback to getMyPortfolio to ensure initial portfolio exists
        const single = await portfolioService.getMyPortfolio();
        if (single?.portfolio) {
          setPortfolios([single.portfolio]);
        }
      }
    } catch (err) {
      console.error(err);
      toastError('Could not load portfolio stack: ' + (err.message || 'Network error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleCopyLink = (p) => {
    const url = `${window.location.origin}/u/${p.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(p.id);
    success('Portfolio URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTogglePublish = async (p) => {
    setActionLoadingId(p.id);
    try {
      if (p.isPublished) {
        await portfolioService.unpublish(p.id);
        success(`"${p.title}" unpublished. Reverted to private draft.`);
      } else {
        await portfolioService.publish(p.id);
        success(`"${p.title}" published live to the web!`);
      }
      await fetchPortfolios();
    } catch (err) {
      toastError(err.message || 'Operation failed');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeletePortfolio = async (id, title) => {
    if (portfolios.length <= 1) {
      toastError('You must keep at least one portfolio in your stack.');
      return;
    }
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"? This action cannot be reversed.`)) {
      return;
    }
    try {
      await portfolioService.deletePortfolio(id);
      success(`Portfolio "${title}" permanently removed.`);
      await fetchPortfolios();
    } catch (err) {
      toastError(err.message || 'Failed to delete portfolio');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newPortfolio.title.trim()) {
      toastError('Please enter a portfolio title');
      return;
    }
    setCreating(true);
    try {
      const res = await portfolioService.createPortfolio(newPortfolio);
      success('New portfolio added to your stack!');
      setShowCreateModal(false);
      setNewPortfolio({
        title: '',
        headline: 'Developer & Creator',
        templateId: 'aura-lime'
      });
      await fetchPortfolios();
      if (res?.portfolio?.id) {
        navigate(`/editor?id=${res.portfolio.id}`);
      }
    } catch (err) {
      toastError(err.message || 'Failed to create portfolio');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading your portfolio stack..." />;
  }

  const totalViews = portfolios.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalProjects = portfolios.reduce((acc, p) => acc + (p.projects?.length || 0), 0);
  const publishedCount = portfolios.filter((p) => p.isPublished).length;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* Top Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Layers size={13} /> Multi-Portfolio Stack
            </span>
            {user?.role === 'ADMIN' && (
              <span className="badge badge-warning" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldAlert size={13} /> Platform Admin
              </span>
            )}
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Welcome, {user?.name}!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage multiple tailored portfolios in one stack (e.g. Developer, Designer, Startup Founder).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Add New Portfolio
          </button>
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={16} /> Admin Portal
            </Link>
          )}
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Portfolios</span>
            <Layers size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{portfolios.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--success-text)', fontWeight: 600 }}>
            {publishedCount} of {portfolios.length} live
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Total Views</span>
            <Eye size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalViews}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Public page impressions</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Projects Showcased</span>
            <GitBranch size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalProjects}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Across your portfolio stack</div>
        </div>
      </div>

      {/* PORTFOLIO STACK SECTION */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Your Portfolio Stack</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Each portfolio has its own custom URL, layout template, projects, and styling.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <Plus size={14} /> + New Portfolio
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {portfolios.map((p) => {
          const publicUrl = `${window.location.origin}/u/${p.slug}`;
          const isCopied = copiedId === p.id;
          const isActionBusy = actionLoadingId === p.id;

          return (
            <div
              key={p.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `5px solid ${p.isPublished ? 'var(--success)' : 'var(--warning)'}`,
                boxShadow: 'var(--shadow-md)',
                position: 'relative'
              }}
            >
              <div>
                {/* Status Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', gap: '0.5rem' }}>
                  <span className={`badge ${p.isPublished ? 'badge-success' : 'badge-warning'}`}>
                    {p.isPublished ? 'Published & Live' : 'Private Draft'}
                  </span>
                  <span className="badge badge-secondary" style={{ textTransform: 'capitalize' }}>
                    {p.templateId || 'minimal'}
                  </span>
                </div>

                {/* Portfolio Title & Headline */}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                  {p.title || 'Untitled Portfolio'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', minHeight: '2.4rem' }}>
                  {p.headline || 'Developer & Creator'}
                </p>

                {/* Public URL row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '1rem',
                    fontSize: '0.82rem',
                    gap: '0.5rem'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    /u/{p.slug}
                  </span>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(p)}
                      className="btn btn-sm btn-secondary"
                      style={{ padding: '2px 6px', fontSize: '0.75rem' }}
                      title="Copy public link"
                    >
                      {isCopied ? <Check size={12} color="var(--success)" /> : <Copy size={12} />}
                      {isCopied ? 'Copied' : 'Copy'}
                    </button>
                    {p.isPublished && (
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline"
                        style={{ padding: '2px 6px', fontSize: '0.75rem' }}
                        title="Open live link in new tab"
                      >
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Eye size={13} /> {p.views || 0} views
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <GitBranch size={13} /> {p.projects?.length || 0} projects
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={13} /> {p.skills?.length || 0} skills
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', flexWrap: 'wrap' }}>
                <Link
                  to={`/editor?id=${p.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <Edit3 size={14} /> Open in Studio
                </Link>

                <button
                  type="button"
                  onClick={() => handleTogglePublish(p)}
                  disabled={isActionBusy}
                  className={`btn btn-sm ${p.isPublished ? 'btn-outline' : 'btn-secondary'}`}
                  style={{ fontSize: '0.8rem' }}
                >
                  {isActionBusy ? 'Updating...' : p.isPublished ? 'Unpublish' : 'Publish'}
                </button>

                {portfolios.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeletePortfolio(p.id, p.title)}
                    className="btn btn-sm btn-outline"
                    style={{ padding: '4px 8px', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                    title="Delete portfolio"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE NEW PORTFOLIO MODAL */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '560px',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Create New Portfolio</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Add another customized portfolio to your professional stack.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="btn btn-secondary btn-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Portfolio Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Abhijeet Arjeet | Full Stack Developer"
                  value={newPortfolio.title}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                  required
                  autoFocus
                />
                <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  A distinctive name for this portfolio (e.g. Developer, Designer, AI Specialist).
                </small>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Professional Headline</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Building high-scale distributed systems & AI products"
                  value={newPortfolio.headline}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, headline: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Choose Starting Template</label>
                <select
                  className="form-control"
                  value={newPortfolio.templateId}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, templateId: e.target.value })}
                >
                  {AVAILABLE_TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  You can freely customize layouts, colors, and content in the visual studio anytime.
                </small>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {creating ? 'Creating...' : 'Create Portfolio & Launch Studio'}
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Guide Cards */}
      <div className="card" style={{ background: 'var(--bg-secondary)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
          🚀 Professional Multi-Portfolio Best Practices
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
              1
            </div>
            <div>
              <strong>Targeted Personas:</strong> Create separate portfolios tailored for recruiters (Developer), freelance clients (Creative), or executive roles (Executive CV).
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
              2
            </div>
            <div>
              <strong>WhatsApp &amp; Direct Connect:</strong> Recruiters can reach out directly via one-click WhatsApp chats with pre-filled introductory messages.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
              3
            </div>
            <div>
              <strong>Instant Publishing:</strong> Toggle portfolios between private draft and live public web addresses with guaranteed custom URLs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
