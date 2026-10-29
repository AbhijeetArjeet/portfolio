import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Sparkles,
  GitBranch,
  Inbox,
  UserCheck,
  Plus,
  Trash2,
  Download,
  UploadCloud,
  FileCheck2,
  Linkedin,
  ShieldCheck
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [accessRequests, setAccessRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTemplate, setNewTemplate] = useState('developer');

  const fetchDashboardData = async () => {
    try {
      const [pListData, rData] = await Promise.all([
        portfolioService.listMyPortfolios(),
        portfolioService.getAccessRequests()
      ]);
      const list = pListData?.portfolios || [];
      setPortfolios(list);
      setAccessRequests(rData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCopyLink = (slug) => {
    const url = `${window.location.origin}/u/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleTogglePublish = async (port) => {
    setActionLoading(true);
    try {
      if (port.isPublished) {
        await portfolioService.unpublish(port.id);
      } else {
        await portfolioService.publish(port.id);
      }
      await fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Operation failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDuplicate = async (portId) => {
    setActionLoading(true);
    try {
      await portfolioService.duplicatePortfolio(portId);
      await fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Duplication failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (portId) => {
    if (portfolios.length <= 1) {
      alert('You must have at least one portfolio.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this portfolio? This cannot be undone.')) {
      return;
    }
    setActionLoading(true);
    try {
      await portfolioService.deletePortfolio(portId);
      await fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExport = async (port) => {
    try {
      const data = await portfolioService.exportPortfolio(port.id);
      const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonStr);
      downloadAnchor.setAttribute('download', `portfolio-${port.slug}-backup.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      alert('Failed to export backup: ' + err.message);
    }
  };

  const handleCreatePortfolio = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setActionLoading(true);
    try {
      await portfolioService.createPortfolio({
        title: newTitle.trim(),
        templateId: newTemplate
      });
      setShowCreateModal(false);
      setNewTitle('');
      await fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Failed to create portfolio');
    } finally {
      setActionLoading(false);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await portfolioService.updateAccessRequestStatus(requestId, 'APPROVED', user?.name || 'Owner');
      await fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Failed to update request');
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      await portfolioService.updateAccessRequestStatus(requestId, 'REJECTED', user?.name || 'Owner');
      await fetchDashboardData();
    } catch (err) {
      alert(err.message || 'Failed to update request');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  const primaryPortfolio = portfolios[0] || null;
  const totalViews = portfolios.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalProjects = portfolios.reduce((acc, p) => acc + (p.projects?.length || 0), 0);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      {/* Module Identification Banner (Criterion #2) */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-success" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
            <Sparkles size={13} /> Module: Student &amp; Creator Studio
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Active Database &amp; Local Persistence &bull; Role: <strong>{user?.role || 'USER'}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={14} /> Create New Portfolio
        </button>
      </div>

      {/* Top Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Welcome, {user?.name}!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Multi-portfolio workspace. Manage your live URLs, customize design themes, and review recruiter permission requests.
          </p>
        </div>

        {primaryPortfolio && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/editor" className="btn btn-primary">
              <Edit3 size={16} /> Open Visual Editor
            </Link>
            {primaryPortfolio.isPublished && (
              <a
                href={`${window.location.origin}/u/${primaryPortfolio.slug}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <ExternalLink size={16} /> View Live URL
              </a>
            )}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Total Views</span>
            <Eye size={18} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalViews}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Across all published links</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Active Portfolios</span>
            <Globe size={18} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{portfolios.length}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Separate target versions</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Showcased Projects</span>
            <GitBranch size={18} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalProjects}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Curated works highlighted</div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MULTI-PORTFOLIO MANAGEMENT GRID */}
      {/* ---------------------------------------------------- */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Your Custom Portfolios</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.2rem 0 0' }}>
              Each portfolio has its own unique slug, layout, theme settings, and shareable link.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {portfolios.map((port) => {
            const pubUrl = `${window.location.origin}/u/${port.slug}`;
            return (
              <div
                key={port.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `4px solid ${port.isPublished ? 'var(--success)' : 'var(--text-muted)'}`,
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{port.title}</h3>
                      <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, marginTop: '2px' }}>
                        {port.headline || 'Developer & Creator'}
                      </div>
                    </div>
                    <span className={`badge ${port.isPublished ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.72rem' }}>
                      {port.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <span className="badge" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                      Template: <strong>{port.templateId}</strong>
                    </span>
                    <span className="badge" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                      Layout: <strong>{port.layoutType}</strong>
                    </span>
                    <span className="badge" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                      Views: <strong>{port.views || 0}</strong>
                    </span>
                    {port.linkedinUrl && (
                      <span className="badge" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <Linkedin size={11} style={{ color: '#0a66c2' }} /> LinkedIn Linked
                      </span>
                    )}
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Sharable URL:</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        /u/{port.slug}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(port.slug)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '2px' }}
                        title="Copy link"
                      >
                        {copiedSlug === port.slug ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <Link to="/editor" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Edit3 size={13} /> Edit Design
                    </Link>
                    {port.isPublished ? (
                      <a href={pubUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <ExternalLink size={13} /> View Live
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(port)}
                        className="btn btn-outline btn-sm"
                        disabled={actionLoading}
                      >
                        Publish Live
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        onClick={() => handleDuplicate(port.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.78rem', padding: '4px 8px' }}
                        title="Duplicate portfolio as a starting point"
                        disabled={actionLoading}
                      >
                        Duplicate
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExport(port)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.78rem', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '3px' }}
                        title="Export JSON backup"
                      >
                        <Download size={12} /> JSON
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {port.isPublished && (
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(port)}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                          disabled={actionLoading}
                        >
                          Unpublish
                        </button>
                      )}
                      {portfolios.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDelete(port.id)}
                          className="btn btn-outline btn-sm"
                          style={{ color: 'var(--danger)', padding: '4px 8px' }}
                          title="Delete portfolio"
                          disabled={actionLoading}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ACCESS REQUESTS INBOX (Recruiter & Organisation permissions) */}
      {/* ---------------------------------------------------- */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Inbox size={18} color="var(--primary)" /> Incoming Collaboration &amp; Recruiter Requests
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Organisations and recruiters who viewed your read-only link and requested collaboration or assessment permissions.
            </p>
          </div>
          <span className="badge badge-primary">{accessRequests.length} Requests</span>
        </div>

        {accessRequests.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1.5rem 0' }}>
            No incoming access requests yet. When companies or recruiters request permissions, they will appear here.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {accessRequests.map((req) => (
              <div
                key={req.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.1rem',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.3rem' }}>
                    <strong>{req.requesterName}</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                      &bull; {req.organization}
                    </span>
                    <span
                      className={`badge ${
                        req.status === 'APPROVED'
                          ? 'badge-success'
                          : req.status === 'REJECTED'
                          ? 'badge-danger'
                          : 'badge-warning'
                      }`}
                      style={{ fontSize: '0.72rem' }}
                    >
                      {req.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Email: <code>{req.email}</code> &bull; Role: <strong>{req.requestedRole}</strong>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '0.4rem 0 0' }}>
                    &ldquo;{req.reason}&rdquo;
                  </p>
                </div>

                {req.status === 'PENDING' && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => handleApproveRequest(req.id)}
                      className="btn btn-sm btn-primary"
                    >
                      <UserCheck size={14} /> Approve Access
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeclineRequest(req.id)}
                      className="btn btn-sm btn-outline"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Portfolio Modal */}
      {showCreateModal && (
        <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              Create New Custom Portfolio
            </h3>
            <form onSubmit={handleCreatePortfolio}>
              <div className="form-group">
                <label className="form-label">Portfolio Title / Purpose</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Abhijeet | AI & Systems Portfolio"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Starting Design Template</label>
                <select
                  className="form-select"
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                >
                  <option value="developer">Developer (CLI Terminal + Dark Grid)</option>
                  <option value="minimal">Minimal (Clean Editorial Mono)</option>
                  <option value="creative">Creative (Bento Dynamic Layout)</option>
                  <option value="editorial">Editorial (Magazine Typography)</option>
                  <option value="academic">Academic (CV &amp; Research Publications)</option>
                  <option value="executive">Executive (Leadership Dossier)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Creating...' : 'Create Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
