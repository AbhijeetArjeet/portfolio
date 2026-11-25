import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { portfolioService } from '../services/portfolio.service';
import { useToast } from '../context/ToastContext';
import PersonalInfoSection from '../components/editor/PersonalInfoSection';
import ProjectsManager from '../components/editor/ProjectsManager';
import SkillsManager from '../components/editor/SkillsManager';
import ExperienceManager from '../components/editor/ExperienceManager';
import ThemeCustomizer from '../components/editor/ThemeCustomizer';
import TemplatesSelector from '../components/editor/TemplatesSelector';
import SocialLinksManager from '../components/editor/SocialLinksManager';
import CertificatesManager from '../components/editor/CertificatesManager';
import DataConnectorsManager from '../components/editor/DataConnectorsManager';
import AiPortfolioModal from '../components/editor/AiPortfolioModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Code Splitting: Lazy-load individual template architectures
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
  User,
  GitBranch,
  Cpu,
  Briefcase,
  Palette,
  Eye,
  Check,
  Globe,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  AlertCircle,
  Layout,
  Share2,
  Award,
  Sparkles,
  Zap
} from 'lucide-react';

export default function PortfolioEditor() {
  const [portfolio, setPortfolio] = useState(null);
  const [userPortfolios, setUserPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('templates');
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const saveTimeoutRef = useRef(null);
  const portfolioId = searchParams.get('id');

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      let data;
      if (portfolioId) {
        data = await portfolioService.getPortfolioById(portfolioId);
      } else {
        data = await portfolioService.getMyPortfolio();
      }
      setPortfolio(data?.portfolio);

      try {
        const stackData = await portfolioService.getMyPortfolios();
        if (stackData?.portfolios) {
          setUserPortfolios(stackData.portfolios);
        }
      } catch (e) {
        // Ignore fallback error
      }
    } catch (err) {
      console.error(err);
      toastError('Could not load portfolio: ' + (err.message || 'Error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [portfolioId]);

  // Listen to ?template= query parameter from homepage selection
  useEffect(() => {
    const tpl = searchParams.get('template');
    if (tpl && portfolio) {
      if (portfolio.templateId !== tpl) {
        handlePortfolioUpdate({ templateId: tpl });
        success(`Applied ${tpl} template!`);
      }
      setActiveTab('templates');
    }
  }, [searchParams, portfolio?.id]);

  const handleApplyAiPortfolio = async (aiData) => {
    if (!portfolio) return;
    const patch = {};
    if (aiData.title) patch.title = aiData.title;
    if (aiData.headline) patch.headline = aiData.headline;
    if (aiData.bio) patch.bio = aiData.bio;
    if (aiData.templateId) patch.templateId = aiData.templateId;

    if (aiData.themeConfig) {
      try {
        const existing = typeof portfolio.themeConfig === 'string'
          ? JSON.parse(portfolio.themeConfig)
          : (portfolio.themeConfig || {});
        const merged = { ...existing, ...aiData.themeConfig };
        patch.themeConfig = JSON.stringify(merged);
      } catch {}
    }

    handlePortfolioUpdate(patch);
    try {
      await portfolioService.updatePortfolio(portfolio.id, patch);
      fetchPortfolio();
      success('AI-generated portfolio content applied successfully!');
    } catch (err) {
      toastError('Failed to save AI changes: ' + err.message);
    }
  };

  // Keyboard shortcut Ctrl+S / Cmd+S for explicit save feedback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (portfolio) {
          portfolioService.updatePortfolio(portfolio.id, portfolio)
            .then(() => {
              setSaveStatus('saved');
              success('Changes saved (Ctrl+S)!');
            })
            .catch((err) => {
              setSaveStatus('error');
              toastError(err.message || 'Save failed');
            });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [portfolio, success, toastError]);

  // Debounced auto-save for field updates
  const handlePortfolioUpdate = (patch) => {
    setPortfolio((prev) => {
      const updated = { ...prev, ...patch };

      setSaveStatus('saving');
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        try {
          await portfolioService.updatePortfolio(updated.id, patch);
          setSaveStatus('saved');
        } catch (err) {
          console.error('Autosave error:', err);
          setSaveStatus('error');
          toastError('Autosave failed: ' + (err.message || 'Network error'));
        }
      }, 700);

      return updated;
    });
  };

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    try {
      if (portfolio.isPublished) {
        await portfolioService.unpublish(portfolio.id);
        success('Portfolio unpublished and reverted to private draft.');
      } else {
        await portfolioService.publish(portfolio.id);
        success('Portfolio is now live and published to the web!');
      }
      fetchPortfolio();
    } catch (err) {
      toastError(err.message || 'Operation failed');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Opening visual portfolio editor..." />;
  }

  if (!portfolio) {
    return <div className="container" style={{ padding: '3rem' }}>Portfolio not found.</div>;
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

  const deviceWidthMap = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--header-height))', overflow: 'hidden' }}>
      {/* Editor Top Bar */}
      <div
        style={{
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          zIndex: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Portfolio Visual Editor</h2>

          {userPortfolios.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Stack:</span>
              <select
                value={portfolio.id}
                onChange={(e) => navigate(`/editor?id=${e.target.value}`)}
                style={{
                  padding: '3px 8px',
                  fontSize: '0.82rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  maxWidth: '200px',
                  cursor: 'pointer'
                }}
                title="Switch active portfolio in your stack"
              >
                {userPortfolios.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title} ({item.templateId})
                  </option>
                ))}
              </select>
            </div>
          )}

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Slug: <code>/u/{portfolio.slug}</code>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            {saveStatus === 'saved' && (
              <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> All changes saved
              </span>
            )}
            {saveStatus === 'saving' && (
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Saving edits...
              </span>
            )}
            {saveStatus === 'error' && (
              <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={14} /> Autosave failed
              </span>
            )}
          </div>
        </div>

        {/* Device Switcher and Publish Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* AI Portfolio Creator Button */}
          <button
            type="button"
            onClick={() => setShowAiModal(true)}
            className="btn btn-sm"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} /> AI Portfolio Creator
          </button>

          {/* Multi-Platform Importer Button */}
          <button
            type="button"
            onClick={() => setActiveTab('connectors')}
            className={`btn btn-sm ${activeTab === 'connectors' ? 'btn-primary' : 'btn-outline'}`}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <Zap size={14} /> Import &amp; Sync
          </button>

          {/* Responsive viewport simulator */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              style={{ background: previewDevice === 'desktop' ? 'var(--primary)' : 'transparent', color: previewDevice === 'desktop' ? '#fff' : 'inherit', border: 'none', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}
              title="Desktop View"
            >
              <Monitor size={15} />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('tablet')}
              style={{ background: previewDevice === 'tablet' ? 'var(--primary)' : 'transparent', color: previewDevice === 'tablet' ? '#fff' : 'inherit', border: 'none', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}
              title="Tablet View"
            >
              <Tablet size={15} />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              style={{ background: previewDevice === 'mobile' ? 'var(--primary)' : 'transparent', color: previewDevice === 'mobile' ? '#fff' : 'inherit', border: 'none', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}
              title="Mobile View"
            >
              <Smartphone size={15} />
            </button>
          </div>

          <a
            href={`/u/${portfolio.slug}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
          >
            <ExternalLink size={14} /> Public Link
          </a>

          <button
            type="button"
            onClick={handleTogglePublish}
            className={`btn btn-sm ${portfolio.isPublished ? 'btn-secondary' : 'btn-primary'}`}
          >
            {portfolio.isPublished ? 'Unpublish' : 'Publish Portfolio'}
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Side: Editor Controls */}
        <div
          style={{
            width: '470px',
            borderRight: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0
          }}
          className="editor-sidebar"
        >
          {/* Tabs bar */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              overflowX: 'auto'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'templates' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'templates' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'templates' ? 700 : 500,
                color: activeTab === 'templates' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Layout size={14} /> Templates
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'profile' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'profile' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'profile' ? 700 : 500,
                color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <User size={14} /> Profile
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('social')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'social' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'social' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'social' ? 700 : 500,
                color: activeTab === 'social' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Share2 size={14} /> Social
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'projects' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'projects' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'projects' ? 700 : 500,
                color: activeTab === 'projects' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <GitBranch size={14} /> Projects
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'skills' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'skills' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'skills' ? 700 : 500,
                color: activeTab === 'skills' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Cpu size={14} /> Skills
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('certificates')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'certificates' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'certificates' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'certificates' ? 700 : 500,
                color: activeTab === 'certificates' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Award size={14} /> Certs
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'experience' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'experience' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'experience' ? 700 : 500,
                color: activeTab === 'experience' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Briefcase size={14} /> Journey
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('themes')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'themes' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'themes' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'themes' ? 700 : 500,
                color: activeTab === 'themes' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Palette size={14} /> Themes
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('connectors')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'connectors' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'connectors' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'connectors' ? 700 : 500,
                color: activeTab === 'connectors' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Zap size={14} /> Import
            </button>
          </div>

          {/* Tab Content Panel */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem' }}>
            {activeTab === 'templates' && (
              <TemplatesSelector portfolio={portfolio} onChange={handlePortfolioUpdate} />
            )}
            {activeTab === 'connectors' && (
              <DataConnectorsManager portfolio={portfolio} onChange={handlePortfolioUpdate} onReload={fetchPortfolio} />
            )}
            {activeTab === 'profile' && (
              <PersonalInfoSection portfolio={portfolio} onChange={handlePortfolioUpdate} />
            )}
            {activeTab === 'social' && (
              <SocialLinksManager portfolio={portfolio} onChange={handlePortfolioUpdate} />
            )}
            {activeTab === 'projects' && (
              <ProjectsManager portfolio={portfolio} onReload={fetchPortfolio} />
            )}
            {activeTab === 'skills' && (
              <SkillsManager portfolio={portfolio} onReload={fetchPortfolio} />
            )}
            {activeTab === 'certificates' && (
              <CertificatesManager portfolio={portfolio} onChange={handlePortfolioUpdate} />
            )}
            {activeTab === 'experience' && (
              <ExperienceManager portfolio={portfolio} onReload={fetchPortfolio} />
            )}
            {activeTab === 'themes' && (
              <ThemeCustomizer portfolio={portfolio} onChange={handlePortfolioUpdate} />
            )}
          </div>
        </div>

        {/* Right Side: Live Responsive Preview Canvas */}
        <div
          style={{
            flex: 1,
            background: 'var(--bg-tertiary)',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem 1rem'
          }}
        >
          <div
            style={{
              width: deviceWidthMap[previewDevice],
              maxWidth: '100%',
              background: 'var(--bg-primary)',
              borderRadius: previewDevice !== 'desktop' ? '20px' : '0px',
              border: previewDevice !== 'desktop' ? '8px solid #334155' : 'none',
              boxShadow: 'var(--shadow-xl)',
              minHeight: '100%',
              transition: 'width var(--transition-normal)'
            }}
          >
            <Suspense fallback={
              <div style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center' }}>
                <LoadingSpinner text="Rendering live preview..." />
              </div>
            }>
              {renderTemplate()}
            </Suspense>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .editor-sidebar {
            width: 100% !important;
          }
        }
      `}</style>

      {/* Full AI Portfolio Creator Modal with Google Gemini Integration */}
      <AiPortfolioModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onApplyPortfolio={handleApplyAiPortfolio}
      />
    </div>
  );
}
