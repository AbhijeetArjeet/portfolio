import React, { useState } from 'react';
import { portfolioService } from '../../services/portfolio.service';
import { githubService } from '../../services/github.service';
import { uploadService } from '../../services/upload.service';
import {
  Plus,
  Trash2,
  Github,
  Star,
  ExternalLink,
  Upload,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function ProjectsManager({ portfolio, onReload }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [ghUsername, setGhUsername] = useState(portfolio.user?.githubUsername || '');
  const [ghRepos, setGhRepos] = useState([]);
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

  const handleFetchGithubRepos = async () => {
    if (!ghUsername.trim()) return;
    setGhLoading(true);
    setGhError('');
    try {
      const data = await githubService.getUserRepos(ghUsername.trim());
      setGhRepos(data.repositories || []);
    } catch (err) {
      setGhError(err.message || 'Could not fetch repositories for this username.');
    } finally {
      setGhLoading(false);
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
      onReload();
    } catch (err) {
      alert(err.message || 'Failed to import repository.');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert('Title and description are required.');
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
      onReload();
    } catch (err) {
      alert(err.message || 'Failed to add project.');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await portfolioService.deleteProject(portfolio.id, id);
      onReload();
    } catch (err) {
      alert(err.message || 'Failed to delete project.');
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

        {ghRepos.length > 0 && (
          <div
            style={{
              maxHeight: 220,
              overflowY: 'auto',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-primary)',
              marginTop: '0.5rem'
            }}
          >
            {ghRepos.map((repo, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.6rem 0.9rem',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.85rem'
                }}
              >
                <div>
                  <strong>{repo.title}</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>({repo.technologies})</span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                  onClick={() => handleImportRepo(repo)}
                >
                  + Import
                </button>
              </div>
            ))}
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
            <label className="form-label">Description *</label>
            <textarea
              className="form-textarea"
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the problem solved, tech stack, and performance metrics..."
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
