import React, { useState, useEffect, useRef } from 'react';
import { portfolioService } from '../services/portfolio.service';
import PersonalInfoSection from '../components/editor/PersonalInfoSection';
import ProjectsManager from '../components/editor/ProjectsManager';
import SkillsManager from '../components/editor/SkillsManager';
import ExperienceManager from '../components/editor/ExperienceManager';
import ThemeCustomizer from '../components/editor/ThemeCustomizer';
import PreGivenMaterialsLibrary from '../components/editor/PreGivenMaterialsLibrary';

import TemplateMinimal from '../components/portfolio/TemplateMinimal';
import TemplateDeveloper from '../components/portfolio/TemplateDeveloper';
import TemplateCreative from '../components/portfolio/TemplateCreative';
import TemplateEditorial from '../components/portfolio/TemplateEditorial';
import TemplateAcademic from '../components/portfolio/TemplateAcademic';
import TemplateExecutive from '../components/portfolio/TemplateExecutive';

import LoadingSpinner from '../components/common/LoadingSpinner';
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
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function PortfolioEditor() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const saveTimeoutRef = useRef(null);

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
        }
      }, 600);

      return updated;
    });
  };

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    try {
      if (portfolio.isPublished) {
        await portfolioService.unpublish(portfolio.id);
      } else {
        await portfolioService.publish(portfolio.id);
      }
      fetchPortfolio();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Opening visual portfolio editor..." />;
  }

  if (!portfolio) {
    return <div className="container" style={{ padding: '3rem' }}>Portfolio not found.</div>;
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Portfolio Visual Editor</h2>
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
                <AlertCircle size={14} /> Failed to save
              </span>
            )}
          </div>
        </div>

        {/* Viewport switchers & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-secondary)',
              padding: '3px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)'
            }}
          >
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              style={{
                background: previewDevice === 'desktop' ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: previewDevice === 'desktop' ? 'var(--primary)' : 'var(--text-muted)'
              }}
              title="Desktop View"
            >
              <Monitor size={15} />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('tablet')}
              style={{
                background: previewDevice === 'tablet' ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: previewDevice === 'tablet' ? 'var(--primary)' : 'var(--text-muted)'
              }}
              title="Tablet View"
            >
              <Tablet size={15} />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              style={{
                background: previewDevice === 'mobile' ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: previewDevice === 'mobile' ? 'var(--primary)' : 'var(--text-muted)'
              }}
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
            width: '460px',
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
              onClick={() => setActiveTab('materials')}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                border: 'none',
                background: activeTab === 'materials' ? 'var(--bg-card)' : 'transparent',
                borderBottom: activeTab === 'materials' ? '2px solid var(--primary)' : 'none',
                fontWeight: activeTab === 'materials' ? 700 : 500,
                color: activeTab === 'materials' ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Sparkles size={14} /> Pre-Given Library
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
              <Palette size={14} /> Themes &amp; Randomize
            </button>
          </div>

          {/* Tab Content Panel */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            {activeTab === 'materials' && (
              <PreGivenMaterialsLibrary
                portfolio={portfolio}
                onApplyPreset={(preset) => handlePortfolioUpdate(preset)}
                onAddProject={async (proj) => {
                  await portfolioService.addProject(portfolio.id, proj);
                  fetchPortfolio();
                }}
                onAddSkill={async (skill) => {
                  await portfolioService.addSkill(portfolio.id, skill);
                  fetchPortfolio();
                }}
              />
            )}
            {activeTab === 'profile' && (
              <PersonalInfoSection portfolio={portfolio} onChange={handlePortfolioUpdate} />
            )}
            {activeTab === 'projects' && (
              <ProjectsManager portfolio={portfolio} onReload={fetchPortfolio} />
            )}
            {activeTab === 'skills' && (
              <SkillsManager portfolio={portfolio} onReload={fetchPortfolio} />
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
            {renderTemplate()}
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
    </div>
  );
}
