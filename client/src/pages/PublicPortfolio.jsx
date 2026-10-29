import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioService } from '../services/portfolio.service';
import TemplateMinimal from '../components/portfolio/TemplateMinimal';
import TemplateDeveloper from '../components/portfolio/TemplateDeveloper';
import TemplateCreative from '../components/portfolio/TemplateCreative';
import TemplateEditorial from '../components/portfolio/TemplateEditorial';
import TemplateAcademic from '../components/portfolio/TemplateAcademic';
import TemplateExecutive from '../components/portfolio/TemplateExecutive';

import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Sparkles,
  Flag,
  ArrowLeft,
  AlertCircle,
  X,
  Check,
  Building2,
  Lock,
  QrCode,
  Share2,
  Mail,
  Send,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function PublicPortfolio() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Access request form
  const [reqName, setReqName] = useState('');
  const [reqOrg, setReqOrg] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqRole, setReqRole] = useState('Recruiter / Evaluator');
  const [reqReason, setReqReason] = useState('');
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);

  // Abuse report form
  const [reportEmail, setReportEmail] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true);
      setError(null);
      try {
        const data = await portfolioService.getPublicPortfolio(slug);
        setPortfolio(data.portfolio);

        // Update document title for SEO
        if (data.portfolio?.title) {
          document.title = `${data.portfolio.title} | PortfolioForge`;
        }
      } catch (err) {
        setError(err.message || 'Portfolio not found or currently an unpublished draft.');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadPortfolio();
    }
  }, [slug]);

  // Handle Access Request Submission (User / Organization asking permission from admin/owner)
  const handleSendAccessRequest = async (e) => {
    e.preventDefault();
    if (!reqName || !reqOrg || !reqEmail || !reqReason) return;
    setReqSubmitting(true);
    try {
      await portfolioService.submitAccessRequest({
        requesterName: reqName,
        organization: reqOrg,
        email: reqEmail,
        portfolioId: portfolio.id,
        portfolioSlug: portfolio.slug,
        portfolioTitle: portfolio.title,
        requestedRole: reqRole,
        reason: reqReason
      });
      setReqSuccess(true);
      setTimeout(() => {
        setShowAccessModal(false);
        setReqSuccess(false);
        setReqName('');
        setReqOrg('');
        setReqEmail('');
        setReqReason('');
      }, 2500);
    } catch (err) {
      alert(err.message || 'Failed to submit request');
    } finally {
      setReqSubmitting(false);
    }
  };

  // Handle Abuse Report Submission
  const handleSendReport = async (e) => {
    e.preventDefault();
    if (!reportEmail || !reportReason) return;
    setReportSubmitting(true);
    try {
      await portfolioService.report(portfolio.id, {
        reporterEmail: reportEmail,
        reason: reportReason
      });
      setReportSent(true);
    } catch (err) {
      alert(err.message || 'Failed to submit report');
    } finally {
      setReportSubmitting(false);
    }
  };

  const handleCopySharableLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner text="Rendering public portfolio..." size="lg" />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center', maxWidth: 600 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--danger-bg)', color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <AlertCircle size={32} />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Portfolio Unavailable</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          {error || 'This portfolio is either private or does not exist.'}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Homepage
          </Link>
          <Link to="/register" className="btn btn-outline">
            Create Your Own Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // 6 Distinct Templates
  const renderTemplate = () => {
    switch (portfolio.templateId) {
      case 'developer':
        return <TemplateDeveloper portfolio={portfolio} />;
      case 'creative':
        return <TemplateCreative portfolio={portfolio} />;
      case 'editorial':
        return <TemplateEditorial portfolio={portfolio} />;
      case 'academic':
        return <TemplateAcademic portfolio={portfolio} />;
      case 'executive':
        return <TemplateExecutive portfolio={portfolio} />;
      case 'minimal':
      default:
        return <TemplateMinimal portfolio={portfolio} />;
    }
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* ---------------------------------------------------- */}
      {/* ORGANISATION READ-ONLY BANNER (Evaluation Criterion) */}
      {/* ---------------------------------------------------- */}
      <div
        style={{
          background: '#0f172a',
          color: '#f8fafc',
          padding: '0.65rem 1.25rem',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.86rem',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={16} color="#38bdf8" />
          <span>
            <strong>Organisation View Mode:</strong> Read-Only Public Portfolio &bull; Direct editing restricted to owner &amp; university admin.
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleCopySharableLink}
            className="btn btn-sm"
            style={{ background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
          >
            {copiedLink ? <Check size={14} color="#4ade80" /> : <Share2 size={14} />} {copiedLink ? 'Copied URL!' : 'Share Link'}
          </button>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="btn btn-sm"
            style={{ background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }}
            title="Scan QR Code for mobile"
          >
            <QrCode size={14} /> Mobile QR
          </button>

          <button
            type="button"
            onClick={() => setShowAccessModal(true)}
            className="btn btn-sm"
            style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 700 }}
          >
            <Lock size={13} /> Request Edit / Collaboration Permission
          </button>
        </div>
      </div>

      {/* Render Selected Portfolio Template */}
      <div style={{ flex: 1 }}>
        {renderTemplate()}
      </div>

      {/* Public Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '2.5rem 1.5rem',
          backgroundColor: 'var(--bg-secondary)',
          textAlign: 'center',
          fontSize: '0.86rem',
          color: 'var(--text-muted)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} color="var(--primary)" />
            <span>Built &amp; Verified with <strong>PortfolioForge</strong></span>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Flag size={13} /> Report Inappropriate Content
            </button>
            <Link to="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>
              Create Your Free Portfolio &rarr;
            </Link>
          </div>
        </div>
      </footer>

      {/* ---------------------------------------------------- */}
      {/* 1. PERMISSION REQUEST MODAL (Ask Permission from Admin/Owner) */}
      {/* ---------------------------------------------------- */}
      {showAccessModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: 480, padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Request Permission</h3>
              </div>
              <button type="button" onClick={() => setShowAccessModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            {reqSuccess ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Check size={26} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Permission Request Submitted!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Your request has been forwarded to candidate <strong>{portfolio.title}</strong> and the faculty administrator. You will be notified via email upon approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendAccessRequest}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Recruiters and partner organisations can request verified review or collaboration access for <strong>{portfolio.title}</strong>.
                </p>

                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Sarah Jenkins"
                    value={reqName}
                    onChange={(e) => setReqName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Organization / Company Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Google Talent Acquisition / Research Lab"
                    value={reqOrg}
                    onChange={(e) => setReqOrg(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Work Email *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="sjenkins@company.com"
                    value={reqEmail}
                    onChange={(e) => setReqEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Requested Permission Level *</label>
                  <select
                    className="form-input"
                    value={reqRole}
                    onChange={(e) => setReqRole(e.target.value)}
                  >
                    <option value="Recruiter / Evaluator">Recruiter / Evaluator (Detailed Review Access)</option>
                    <option value="Project Collaborator">Project Collaborator (Contribute project updates)</option>
                    <option value="Institutional Editor">Institutional Editor (Faculty supervisor edits)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Purpose / Justification *</label>
                  <textarea
                    rows={3}
                    required
                    className="form-input"
                    placeholder="State your reason for requesting collaboration or privileged review..."
                    value={reqReason}
                    onChange={(e) => setReqReason(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowAccessModal(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={reqSubmitting} className="btn btn-primary">
                    {reqSubmitting ? 'Submitting...' : 'Send Request to Admin'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. QR CODE MODAL FOR MOBILE PREVIEW */}
      {/* ---------------------------------------------------- */}
      {showQrModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: 380, padding: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Scan on Mobile Device</h3>
              <button type="button" onClick={() => setShowQrModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Point your smartphone camera to immediately view this published portfolio on mobile.
            </p>

            <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', display: 'inline-block', boxShadow: 'var(--shadow-md)', marginBottom: '1.25rem' }}>
              <img src={qrImageUrl} alt="QR Code" style={{ width: 180, height: 180, display: 'block' }} />
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
              <code>{window.location.href}</code>
            </div>

            <button type="button" onClick={() => setShowQrModal(false)} className="btn btn-outline" style={{ width: '100%', marginTop: '1.25rem' }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. ABUSE REPORT MODAL */}
      {/* ---------------------------------------------------- */}
      {showReportModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: 440, padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Report Inappropriate Portfolio</h3>
              <button type="button" onClick={() => setShowReportModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={18} />
              </button>
            </div>

            {reportSent ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Check size={22} />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Report Logged</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                  Thank you. Faculty administrators will review this portfolio.
                </p>
                <button type="button" onClick={() => setShowReportModal(false)} className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendReport}>
                <div className="form-group">
                  <label className="form-label">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="evaluator@university.edu"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Reason for Moderation *</label>
                  <textarea
                    rows={4}
                    required
                    className="form-input"
                    placeholder="Describe specific policy violations or inaccurate academic claims..."
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowReportModal(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={reportSubmitting} className="btn btn-danger">
                    {reportSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
