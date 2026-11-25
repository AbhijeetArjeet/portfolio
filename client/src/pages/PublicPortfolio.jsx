import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioService } from '../services/portfolio.service';
import { useToast } from '../context/ToastContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy-loaded Template Chunks for High Performance & Bundle Code Splitting
const TemplateMinimal = lazy(() => import('../components/portfolio/TemplateMinimal'));
const TemplateDeveloper = lazy(() => import('../components/portfolio/TemplateDeveloper'));
const TemplateCreative = lazy(() => import('../components/portfolio/TemplateCreative'));
const TemplateAuraLime = lazy(() => import('../components/portfolio/TemplateAuraLime'));
const TemplateVibrantCard = lazy(() => import('../components/portfolio/TemplateVibrantCard'));
const TemplateWarmSpotlight = lazy(() => import('../components/portfolio/TemplateWarmSpotlight'));
const TemplateCyberNeon = lazy(() => import('../components/portfolio/TemplateCyberNeon'));
const TemplateCrimsonBold = lazy(() => import('../components/portfolio/TemplateCrimsonBold'));
const TemplateEditorialMono = lazy(() => import('../components/portfolio/TemplateEditorialMono'));
const TemplateBrutalistTech = lazy(() => import('../components/portfolio/TemplateBrutalistTech'));
const TemplateWarmPlayful = lazy(() => import('../components/portfolio/TemplateWarmPlayful'));
const TemplateExecutiveCV = lazy(() => import('../components/portfolio/TemplateExecutiveCV'));
const TemplateGlassSlate = lazy(() => import('../components/portfolio/TemplateGlassSlate'));
const TemplateUxCaseStudy = lazy(() => import('../components/portfolio/TemplateUxCaseStudy'));
const TemplateProductDesigner = lazy(() => import('../components/portfolio/TemplateProductDesigner'));
const TemplateSplitMono = lazy(() => import('../components/portfolio/TemplateSplitMono'));
const TemplateDesignAgency = lazy(() => import('../components/portfolio/TemplateDesignAgency'));
import {
  Sparkles,
  Flag,
  ArrowLeft,
  AlertCircle,
  X,
  Check,
  Share2,
  Copy,
  ExternalLink
} from 'lucide-react';

export default function PublicPortfolio() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { success, error: toastError } = useToast();

  // Abuse report modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportEmail, setReportEmail] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const [reportSubmitting, setReportSubmitting] = useState(false);

  // Share link state
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true);
      setError(null);
      try {
        const data = await portfolioService.getPublicPortfolio(slug);
        setPortfolio(data.portfolio);

        // Update document title and dynamic meta tags for SEO
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

  const handleCopyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    success('Portfolio link copied to clipboard!');
    setTimeout(() => setCopiedShare(false), 2500);
  };

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
      success('Report submitted to moderation team.');
    } catch (err) {
      toastError(err.message || 'Failed to submit report. Please try again.');
    } finally {
      setReportSubmitting(false);
    }
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
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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

  const renderTemplate = () => {
    switch (portfolio.templateId) {
      case 'developer':
        return <TemplateDeveloper portfolio={portfolio} />;
      case 'creative':
        return <TemplateCreative portfolio={portfolio} />;
      case 'aura-lime':
        return <TemplateAuraLime portfolio={portfolio} />;
      case 'vibrant-card':
        return <TemplateVibrantCard portfolio={portfolio} />;
      case 'warm-spotlight':
        return <TemplateWarmSpotlight portfolio={portfolio} />;
      case 'cyber-neon':
        return <TemplateCyberNeon portfolio={portfolio} />;
      case 'crimson-bold':
        return <TemplateCrimsonBold portfolio={portfolio} />;
      case 'editorial-mono':
        return <TemplateEditorialMono portfolio={portfolio} />;
      case 'brutalist-tech':
        return <TemplateBrutalistTech portfolio={portfolio} />;
      case 'warm-playful':
        return <TemplateWarmPlayful portfolio={portfolio} />;
      case 'executive-cv':
        return <TemplateExecutiveCV portfolio={portfolio} />;
      case 'glass-slate':
        return <TemplateGlassSlate portfolio={portfolio} />;
      case 'ux-case-study':
        return <TemplateUxCaseStudy portfolio={portfolio} />;
      case 'product-designer':
        return <TemplateProductDesigner portfolio={portfolio} />;
      case 'split-mono':
        return <TemplateSplitMono portfolio={portfolio} />;
      case 'design-agency':
        return <TemplateDesignAgency portfolio={portfolio} />;
      case 'minimal':
      default:
        return <TemplateMinimal portfolio={portfolio} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Draft banner if viewing private preview as owner/admin */}
      {!portfolio.isPublished && (
        <div style={{ background: '#fef3c7', color: '#92400e', padding: '0.6rem 1.5rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, borderBottom: '1px solid #fde68a' }}>
          ⚠️ Private Preview Mode: This portfolio is an unpublished draft and visible only to you.
        </div>
      )}

      {/* Render Selected Portfolio Template with Lazy Suspense */}
      <main>
        <Suspense fallback={
          <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingSpinner text="Rendering portfolio template..." />
          </div>
        }>
          {renderTemplate()}
        </Suspense>
      </main>

      {/* Floating Bottom Bar: Built with PortfolioForge + Share + Report */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.82rem'
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-primary)', fontWeight: 600 }}>
          <Sparkles size={14} color="var(--primary)" /> PortfolioForge
        </Link>
        <span style={{ color: 'var(--border-color)' }}>|</span>
        <button
          type="button"
          onClick={handleCopyShareLink}
          style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}
          title="Share portfolio link"
        >
          {copiedShare ? <Check size={13} color="var(--success)" /> : <Share2 size={13} />}
          {copiedShare ? 'Copied!' : 'Share'}
        </button>
        <span style={{ color: 'var(--border-color)' }}>|</span>
        <button
          type="button"
          onClick={() => setShowReportModal(true)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem' }}
          title="Report inappropriate content"
        >
          <Flag size={12} /> Report
        </button>
      </div>

      {/* Abuse Report Modal */}
      {showReportModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--bg-overlay)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <div className="card" style={{ maxWidth: 460, width: '100%', position: 'relative' }}>
            <button
              type="button"
              onClick={() => { setShowReportModal(false); setReportSent(false); }}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            {reportSent ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <Check size={40} color="var(--success)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Report Submitted</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>
                  Our moderation team will review this portfolio. Thank you for keeping the platform safe.
                </p>
                <button type="button" onClick={() => setShowReportModal(false)} className="btn btn-secondary btn-sm">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendReport}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Report Portfolio</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Please let us know why you are reporting <strong>{portfolio.title}</strong>.
                </p>

                <div className="form-group">
                  <label className="form-label">Your Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Reason for Report</label>
                  <textarea
                    rows={4}
                    required
                    className="form-textarea"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="Describe violations, spam, copyright infringement, or unsafe content..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowReportModal(false)} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" disabled={reportSubmitting} className="btn btn-danger btn-sm">
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
