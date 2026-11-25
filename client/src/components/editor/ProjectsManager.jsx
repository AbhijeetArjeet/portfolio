import React, { useState } from 'react';
import { portfolioService } from '../../services/portfolio.service';
import { githubService } from '../../services/github.service';
import { uploadService } from '../../services/upload.service';
import { aiService } from '../../services/ai.service';
import { useToast } from '../../context/ToastContext';
import {
  Plus,
  Trash2,
  Github,
  Star,
  ExternalLink,
  Upload,
  CheckCircle,
  Sparkles,
  Wand2,
  Check,
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function ProjectsManager({ portfolio, onReload }) {
  const { success, error: toastError, warning } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [ghUsername, setGhUsername] = useState(portfolio.user?.githubUsername || '');
  const [enhancingAi, setEnhancingAi] = useState(false);
  const [ghRepos, setGhRepos] = useState([]);
  const [ghProfile, setGhProfile] = useState(null);
  const [ghVerified, setGhVerified] = useState(false);
  const [selectedRepos, setSelectedRepos] = useState({});
  const [bulkImporting, setBulkImporting] = useState(false);
  const [ghLoading, setGhLoading] = useState(false);
  const [ghError, setGhError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    repositoryUrl: '',
    demoUrl: '',
    imageUrl: '',
    featured: false
  });

  const handleEnhanceDescriptionWithAi = async () => {
    if (!form.title) {
      warning('Please enter a project title first.');
      return;
    }
    setEnhancingAi(true);
    try {
      const enhanced = await aiService.enhanceProjectDescription({
        title: form.title,
        technologies: form.technologies,
        rawNotes: form.description
      });
      setForm((prev) => ({ ...prev, description: enhanced }));
      success('AI enhanced your project description (STAR method)!');
    } catch (err) {
      toastError('Failed to enhance description with AI.');
    } finally {
      setEnhancingAi(false);
    }
  };

  const handleFetchGithubRepos = async () => {
    if (!ghUsername.trim()) return;
    setGhLoading(true);
    setGhError('');
    setGhProfile(null);
    setGhVerified(false);
    setGhRepos([]);

    try {
      const clean = githubService.cleanUsername(ghUsername);
      // Fetch profile first for verification
      try {
        const profile = await githubService.getUserProfile(clean);
        setGhProfile(profile);
      } catch (pErr) {
        console.warn('Profile lookup failed:', pErr);
      }

      // Fetch repos
      const rawList = await githubService.getUserRepos(clean);
      const formatted = rawList.map(r => ({
        title: r.title || r.name,
        description: r.description || 'Public open-source repository on GitHub.',
        technologies: r.technologies || r.language || 'Code',
        repositoryUrl: r.repositoryUrl || r.html_url,
        demoUrl: r.demoUrl || r.homepage || r.repositoryUrl || r.html_url,
        stars: r.stars ?? r.stargazers_count ?? 0
      }));
      setGhRepos(formatted);

      const initialSelected = {};
      formatted.slice(0, 6).forEach((_, i) => (initialSelected[i] = true));
      setSelectedRepos(initialSelected);

      if (formatted.length > 0) {
        success(`Found ${formatted.length} repositories. Please verify your account identity below.`);
      } else {
        warning(`No public repositories found for @${clean}.`);
      }
    } catch (err) {
      setGhError(err.message || 'Could not fetch repositories for this username.');
      toastError(err.message || 'Could not fetch repositories.');
    } finally {
      setGhLoading(false);
    }
  };

  const handleBulkImportRepos = async () => {
    const toImport = ghRepos.filter((_, i) => selectedRepos[i]);
    if (toImport.length === 0) {
      warning('Please select at least one repository to import.');
      return;
    }
    setBulkImporting(true);
    let count = 0;
    try {
      for (const repo of toImport) {
        await portfolioService.addProject(portfolio.id, {
          title: repo.title,
          description: repo.description,
          technologies: repo.technologies,
          repositoryUrl: repo.repositoryUrl,
          demoUrl: repo.demoUrl !== repo.repositoryUrl ? repo.demoUrl : '',
          featured: repo.stars > 0
        });
        count++;
      }
      success(`Imported ${count} repositories into your portfolio!`);
      onReload();
    } catch (err) {
      toastError('Failed during import: ' + err.message);
    } finally {
      setBulkImporting(false);
    }
  };

  const handleImportRepo = async (repo) => {
    try {
      await portfolioService.addProject(portfolio.id, {
        title: repo.title,
        description: repo.description,
        technologies: repo.technologies,
        repositoryUrl: repo.repositoryUrl,
        demoUrl: repo.demoUrl !== repo.repositoryUrl ? repo.demoUrl : '',
        featured: repo.stars > 0
      });
      success(`Imported "${repo.title}" from GitHub.`);
      onReload();
    } catch (err) {
      toastError(err.message || 'Failed to import repository.');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      warning('Title and description are required.');
      return;
    }
    try {
      await portfolioService.addProject(portfolio.id, form);
      setForm({
        title: '',
        description: '',
        technologies: '',
        repositoryUrl: '',
        demoUrl: '',
        imageUrl: '',
        featured: false
      });
      setShowAddForm(false);
      success('Project added successfully.');
      onReload();
    } catch (err) {
      toastError(err.message || 'Failed to add project.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await portfolioService.deleteProject(portfolio.id, id);
      success('Project deleted.');
      onReload();
    } catch (err) {
      toastError(err.message || 'Failed to delete project.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Projects &amp; Portfolio Works</h3>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={15} /> {showAddForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {/* GitHub 1-Click Import Panel */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
          <Github size={18} />
          <span>Import Repositories from GitHub</span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Enter a public GitHub username to automatically fetch your public repositories and add them to your portfolio with 1 click.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <input
            type="text"
            className="form-input"
            style={{ maxWidth: 300 }}
            placeholder="GitHub username (e.g. AbhijeetArjeet)"
            value={ghUsername}
            onChange={(e) => setGhUsername(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleFetchGithubRepos}
            disabled={ghLoading}
          >
            {ghLoading ? 'Fetching...' : 'Fetch Repos'}
          </button>
        </div>

        {ghError && <div style={{ fontSize: '0.82rem', color: 'var(--danger)', marginBottom: '0.5rem' }}>{ghError}</div>}

        {/* Profile Verification Card */}
        {ghProfile && (
          <div
            style={{
              border: ghVerified ? '2px solid #10b981' : '2px dashed var(--primary)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1rem',
              background: 'var(--bg-card)',
              marginTop: '0.75rem',
              marginBottom: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: ghVerified ? '#10b981' : 'var(--primary)', textTransform: 'uppercase' }}>
                {ghVerified ? '✓ Identity Verified' : '⚠️ Profile Verification'}
              </span>
              <a
                href={ghProfile.htmlUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
              >
                Open GitHub <ExternalLink size={11} />
              </a>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <img
                src={ghProfile.avatarUrl || '/uploads/profile.jpg'}
                alt={ghProfile.name}
                style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
                }}
              />
              <div style={{ minWidth: 0 }}>
                <strong style={{ fontSize: '0.92rem', display: 'block' }}>
                  {ghProfile.name} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>@{ghProfile.username}</span>
                </strong>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0' }}>
                  {ghProfile.bio || 'Public GitHub Developer'}
                </p>
              </div>
            </div>

            {!ghVerified ? (
              <div style={{ marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  Is this your GitHub account?
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setGhProfile(null);
                      setGhRepos([]);
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.72rem', padding: '2px 7px' }}
                  >
                    <X size={12} /> Not Me
                  </button>
                  <button
                    type="button"
                    onClick={() => setGhVerified(true)}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '2px 7px' }}
                  >
                    <Check size={12} /> Yes, That's Me!
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} /> Account confirmed. Select repositories below to import.
              </div>
            )}
          </div>
        )}

        {/* Repositories List with Checkboxes */}
        {ghRepos.length > 0 && (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
              <span>Select repositories to import:</span>
              <button
                type="button"
                onClick={handleBulkImportRepos}
                disabled={bulkImporting}
                className="btn btn-primary btn-sm"
                style={{ fontSize: '0.75rem', padding: '3px 8px' }}
              >
                {bulkImporting ? 'Importing...' : `Import Selected (${Object.values(selectedRepos).filter(Boolean).length})`}
              </button>
            </div>

            <div
              style={{
                maxHeight: 220,
                overflowY: 'auto',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-primary)'
              }}
            >
              {ghRepos.map((repo, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0.8rem',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.82rem'
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', minWidth: 0 }}>
                    <input
                      type="checkbox"
                      checked={!!selectedRepos[i]}
                      onChange={() => setSelectedRepos((prev) => ({ ...prev, [i]: !prev[i] }))}
                    />
                    <div style={{ minWidth: 0 }}>
                      <strong style={{ display: 'block' }}>{repo.title}</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{repo.technologies}</span>
                    </div>
                  </label>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ padding: '2px 8px', fontSize: '0.72rem', flexShrink: 0 }}
                    onClick={() => handleImportRepo(repo)}
                  >
                    + Import
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Manual Add Form */}
      {showAddForm && (
        <form onSubmit={handleCreateProject} className="card" style={{ background: 'var(--bg-secondary)' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>New Project Details</h4>

          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input
              type="text"
              className="form-input"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. OpenDisplay-USB"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Description *</label>
              <button
                type="button"
                onClick={handleEnhanceDescriptionWithAi}
                disabled={enhancingAi}
                className="btn btn-sm"
                style={{ fontSize: '0.75rem', padding: '2px 9px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#ffffff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                title="Polish description using STAR method"
              >
                <Sparkles size={12} /> {enhancingAi ? 'Enhancing...' : '✨ Polish with AI (STAR)'}
              </button>
            </div>
            <textarea
              className="form-textarea"
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the problem solved, tech stack, and performance metrics, or click 'Polish with AI'..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technologies (comma separated)</label>
            <input
              type="text"
              className="form-input"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="e.g. React, Node.js, C++, Docker"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Repository URL</label>
              <input
                type="url"
                className="form-input"
                value={form.repositoryUrl}
                onChange={(e) => setForm({ ...form, repositoryUrl: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Live Demo URL</label>
              <input
                type="url"
                className="form-input"
                value={form.demoUrl}
                onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                placeholder="https://myproject.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Project Cover Image URL (optional)</label>
            <input
              type="url"
              className="form-input"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">Save Project</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">Cancel</button>
          </div>
        </form>
      )}

      {/* Existing Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {portfolio.projects && portfolio.projects.length > 0 ? (
          portfolio.projects.map((proj) => (
            <div
              key={proj.id}
              className="card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.25rem'
              }}
            >
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{proj.title}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{proj.technologies}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleDeleteProject(proj.id)}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--danger)', padding: '4px 8px' }}
                  title="Delete project"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No projects added yet. Click &quot;Add Project&quot; or fetch your GitHub repositories above!
          </div>
        )}
      </div>
    </div>
  );
}
