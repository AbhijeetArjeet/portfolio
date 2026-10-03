import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  Lock,
  ArrowRight,
  GitBranch,
  ShieldAlert
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPortfolio = async () => {
    try {
      const data = await portfolioService.getMyPortfolio();
      setPortfolio(data.portfolio);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleCopyLink = () => {
    if (!portfolio) return;
    const url = `${window.location.origin}/u/${portfolio.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    setActionLoading(true);
    try {
      if (portfolio.isPublished) {
        await portfolioService.unpublish(portfolio.id);
      } else {
        await portfolioService.publish(portfolio.id);
      }
      await fetchPortfolio();
    } catch (err) {
      alert(err.message || 'Operation failed');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  if (!portfolio) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p>No portfolio record found. Please refresh or create one.</p>
      </div>
    );
  }

  const publicUrl = `${window.location.origin}/u/${portfolio.slug}`;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      {/* Top Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Welcome, {user?.name}!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Manage your personal portfolio, customize layouts, and monitor views.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/editor" className="btn btn-primary">
            <Edit3 size={16} /> Open Visual Editor
          </Link>
          {portfolio.isPublished && (
            <a href={publicUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              <ExternalLink size={16} /> View Live
            </a>
          )}
        </div>
      </div>

      {/* Public URL & Publication Status Banner */}
      <div
        className="card"
        style={{
          marginBottom: '2rem',
          backgroundColor: portfolio.isPublished ? 'var(--bg-card)' : 'var(--bg-secondary)',
          borderLeft: `5px solid ${portfolio.isPublished ? 'var(--success)' : 'var(--warning)'}`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className={`badge ${portfolio.isPublished ? 'badge-success' : 'badge-warning'}`}>
                {portfolio.isPublished ? 'Published & Live' : 'Unpublished Draft'}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Template: <strong>{portfolio.templateId}</strong> &bull; Layout: <strong>{portfolio.layoutType}</strong>
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Globe size={18} color="var(--primary)" />
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Public URL:</span>
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--primary)', textDecoration: 'underline' }}
              >
                {publicUrl}
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn btn-secondary btn-sm"
              title="Copy link to clipboard"
            >
              {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              type="button"
              onClick={handleTogglePublish}
              className={`btn btn-sm ${portfolio.isPublished ? 'btn-outline' : 'btn-primary'}`}
              disabled={actionLoading}
            >
              {actionLoading ? 'Updating...' : portfolio.isPublished ? 'Unpublish Portfolio' : 'Publish Portfolio'}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Total Views</span>
            <Eye size={18} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{portfolio.views}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Public portfolio page loads</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Projects Displayed</span>
            <GitBranch size={18} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{portfolio.projects?.length || 0}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Works highlighted</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Skills Listed</span>
            <Sparkles size={18} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{portfolio.skills?.length || 0}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Technical competencies</div>
        </div>
      </div>

      {/* Onboarding Checklist / Next Steps */}
      <div className="card" style={{ background: 'var(--bg-secondary)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>
          🚀 Getting the Most Out of Your Portfolio
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
              1
            </div>
            <div>
              <strong>Sync with GitHub:</strong> Import your repositories in 1-click inside the Visual Editor.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
              2
            </div>
            <div>
              <strong>Switch Grid &amp; Flexbox:</strong> Toggle layout styles in the Themes section.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
              3
            </div>
            <div>
              <strong>Publish &amp; Share:</strong> Provide your unique URL to recruiters, classmates and faculty evaluators.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
