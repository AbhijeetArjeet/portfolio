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
  Check,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  AlertCircle,
  Sparkles,
  History,
  Download,
  Upload,
  Save,
  RotateCcw
} from 'lucide-react';

export default function PortfolioEditor() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop', 'tablet', 'mobile'

  // Version History Modal
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [versions, setVersions] = useState([]);
  const [versionLoading, setVersionLoading] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');

  const saveTimeoutRef = useRef(null);
  const pendingPatchRef = useRef({});

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

  // Protect against navigating away when unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (saveStatus === 'saving') {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saveStatus]);

  // Debounced reliable auto-save
  const handlePortfolioUpdate = (patch) => {
    pendingPatchRef.current = { ...pendingPatchRef.current, ...patch };

    setPortfolio((prev) => {
      const updated = { ...prev, ...patch };
      setSaveStatus('saving');

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const patchToSend = { ...pendingPatchRef.current };
          pendingPatchRef.current = {};
          await portfolioService.updatePortfolio(updated.id, patchToSend);
          setSaveStatus('saved');
        } catch (err) {
          console.error('Autosave error:', err);
          setSaveStatus('error');
        }
      }, 700);

      return updated;
    });
  };

  // Immediate Save Now
  const handleForceSave = async () => {
    if (!portfolio) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    setSaveStatus('saving');
    try {
      const patch = { ...pendingPatchRef.current };
      pendingPatchRef.current = {};
      await portfolioService.updatePortfolio(portfolio.id, patch);
      setSaveStatus('saved');
    } catch {
      setSaveStatus('error');
    }
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

  // Version History Handlers
  const handleOpenVersions = async () => {
    setShowVersionModal(true);
    setVersionLoading(true);
    try {
      const data = await portfolioService.listVersions(portfolio.id);
      setVersions(data?.versions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setVersionLoading(false);
    }
  };

  const handleCreateSnapshot = async (e) => {
    e.preventDefault();
    if (!portfolio) return;
    setVersionLoading(true);
    try {
      await portfolioService.createVersion(portfolio.id, newVersionName.trim() || undefined);
      setNewVersionName('');
      const data = await portfolioService.listVersions(portfolio.id);
      setVersions(data?.versions || []);
    } catch (err) {
      alert('Failed to create version snapshot: ' + err.message);
    } finally {
      setVersionLoading(false);
    }
  };

  const handleRestoreVersion = async (versionId) => {
    if (!window.confirm('Restore this snapshot? Current content will be overwritten with the saved snapshot.')) {
      return;
    }
    setVersionLoading(true);
    try {
      const res = await portfolioService.restoreVersion(portfolio.id, versionId);
      if (res?.portfolio) {
        setPortfolio(res.portfolio);
      } else {
        await fetchPortfolio();
      }
      setShowVersionModal(false);
      alert('Portfolio successfully restored to selected snapshot!');
    } catch (err) {
      alert('Failed to restore version: ' + err.message);
    } finally {
      setVersionLoading(false);
    }
  };

  // JSON Export & Import Handlers
  const handleExportJSON = async () => {
    if (!portfolio) return;
    try {
      const data = await portfolioService.exportPortfolio(portfolio.id);
      const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonStr);
      downloadAnchor.setAttribute('download', `portfolio-${portfolio.slug}-backup.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      alert('Failed to export JSON backup: ' + err.message);
    }
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.portfolio && !parsed.title) {
          throw new Error('Invalid JSON backup file structure.');
        }
        setSaveStatus('saving');
        const res = await portfolioService.importPortfolio(portfolio.id, parsed);
        if (res?.portfolio) {
          setPortfolio(res.portfolio);
        } else {
          await fetchPortfolio();
        }
        setSaveStatus('saved');
        alert('Portfolio data successfully imported and persisted!');
      } catch (err) {
        alert('JSON import error: ' + err.message);
        setSaveStatus('error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Portfolio Visual Editor</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Slug: <code>/u/{portfolio.slug}</code>
          </span>

          {/* Auto-save Status indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            {saveStatus === 'saved' && (
              <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> Saved
              </span>
            )}
            {saveStatus === 'saving' && (
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Saving...
              </span>
            )}
            {saveStatus === 'error' && (
              <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={14} /> Save failed
              </span>
            )}

            {saveStatus !== 'saved' && (
              <button
                type="button"
                onClick={handleForceSave}
                className="btn btn-secondary btn-sm"
                style={{ padding: '2px 8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                title="Force immediate save"
              >
                <Save size={12} /> Save Now
              </button>
            )}
          </div>
        </div>

        {/* Viewport switchers & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          {/* Version History Button */}
          <button
            type="button"
            onClick={handleOpenVersions}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
            title="View snapshots and restore past versions"
          >
            <History size={14} /> History
          </button>

          {/* JSON Export Button */}
          <button
            type="button"
            onClick={handleExportJSON}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            title="Export full portfolio JSON backup"
          >
            <Download size={14} /> Export
          </button>

          {/* JSON Import File Input */}
          <label
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', margin: 0 }}
            title="Import portfolio JSON backup"
          >
            <Upload size={14} /> Import
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImportJSON}
              style={{ display: 'none' }}
            />
          </label>

          {/* Device Responsive Switcher */}
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
              <Sparkles size={14} /> Materials
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
              <Palette size={14} /> Themes
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
              border: previewDevice !== 'desktop' ? '8px solid #222226' : 'none',
              boxShadow: 'var(--shadow-xl)',
              minHeight: '100%',
              transition: 'width var(--transition-normal)'
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Version History Modal */}
      {showVersionModal && (
        <div className="modal-backdrop" onClick={() => setShowVersionModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <History size={18} color="var(--primary)" /> Version History &amp; Snapshots
              </h3>
              <button
                type="button"
                onClick={() => setShowVersionModal(false)}
                className="btn btn-outline btn-sm"
              >
                Close
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Create full snapshots before making major changes. Restore any past version with a single click.
            </p>

            <form onSubmit={handleCreateSnapshot} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Snapshot label (e.g. Before redesign)"
                value={newVersionName}
                onChange={(e) => setNewVersionName(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={versionLoading}
                style={{ whiteSpace: 'nowrap' }}
              >
                Save Snapshot
              </button>
            </form>

            <div style={{ maxHeight: 260, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {versions.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem', padding: '1rem' }}>
                  No snapshots created yet. Enter a label above to record this version.
                </div>
              ) : (
                versions.map((ver) => (
                  <div
                    key={ver.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        #{ver.version} &bull; {ver.name || `Snapshot v${ver.version}`}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(ver.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRestoreVersion(ver.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                      disabled={versionLoading}
                    >
                      <RotateCcw size={12} /> Restore
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

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
