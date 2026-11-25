import React, { useState } from 'react';
import { uploadService } from '../../services/upload.service';
import {
  Share2,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Github,
  Linkedin,
  Globe,
  FileText,
  Upload,
  Code2,
  Mail,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function SocialLinksManager({ portfolio, onChange }) {
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeError, setResumeError] = useState('');

  // Extract themeConfig for custom social links
  const themeConfig = (() => {
    try {
      return typeof portfolio.themeConfig === 'string'
        ? JSON.parse(portfolio.themeConfig)
        : portfolio.themeConfig || {};
    } catch {
      return {};
    }
  })();

  const handleConfigUpdate = (key, value) => {
    const updated = { ...themeConfig, [key]: value };
    onChange({ themeConfig: JSON.stringify(updated) });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    setResumeError('');
    try {
      const res = await uploadService.uploadImage(file);
      if (res && res.url) {
        onChange({ resumeUrl: res.url });
      }
    } catch (err) {
      setResumeError(err.message || 'Resume upload failed. PDF, PNG or DOC allowed.');
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Share2 size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Social Profiles &amp; Modern Links</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Connect your Instagram, Facebook, LeetCode, GitHub, LinkedIn, and upload your downloadable resume.
        </p>
      </div>

      {/* Resume Download Section */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <FileText size={18} color="var(--primary)" />
            <span>Downloadable Resume / CV</span>
          </div>
          {portfolio.resumeUrl && (
            <a
              href={portfolio.resumeUrl}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.78rem', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              Test Link <ExternalLink size={12} />
            </a>
          )}
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Provides a 1-click &quot;Download Resume&quot; button in your portfolio header.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Upload size={14} />
            <span>{uploadingResume ? 'Uploading...' : 'Upload Resume PDF'}</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleResumeUpload}
              style={{ display: 'none' }}
              disabled={uploadingResume}
            />
          </label>

          <input
            type="url"
            className="form-input"
            style={{ flex: 1, minWidth: '220px' }}
            placeholder="Or paste direct URL: https://drive.google.com/... or /resume.pdf"
            value={portfolio.resumeUrl || ''}
            onChange={(e) => onChange({ resumeUrl: e.target.value })}
          />
        </div>
        {resumeError && <div style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '0.5rem' }}>{resumeError}</div>}
      </div>

      {/* Modern Social Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {/* Instagram */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Instagram size={15} color="#e1306c" /> Instagram Profile
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://instagram.com/yourhandle"
            value={themeConfig.instagramUrl || ''}
            onChange={(e) => handleConfigUpdate('instagramUrl', e.target.value)}
          />
        </div>

        {/* Facebook */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Facebook size={15} color="#1877f2" /> Facebook Profile
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://facebook.com/yourprofile"
            value={themeConfig.facebookUrl || ''}
            onChange={(e) => handleConfigUpdate('facebookUrl', e.target.value)}
          />
        </div>

        {/* Twitter / X */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Twitter size={15} color="#1da1f2" /> Twitter / X Handle
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://x.com/yourhandle"
            value={themeConfig.twitterUrl || ''}
            onChange={(e) => handleConfigUpdate('twitterUrl', e.target.value)}
          />
        </div>

        {/* YouTube */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Youtube size={15} color="#ff0000" /> YouTube Channel
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://youtube.com/@yourchannel"
            value={themeConfig.youtubeUrl || ''}
            onChange={(e) => handleConfigUpdate('youtubeUrl', e.target.value)}
          />
        </div>

        {/* LeetCode / Coding Profile */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Code2 size={15} color="#f59e0b" /> LeetCode / Coding Profile
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://leetcode.com/yourusername"
            value={themeConfig.leetcodeUrl || ''}
            onChange={(e) => handleConfigUpdate('leetcodeUrl', e.target.value)}
          />
        </div>

        {/* Dribbble / Design Portfolio */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={15} color="#ea4c89" /> Dribbble / Behance
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://dribbble.com/yourdesign"
            value={themeConfig.dribbbleUrl || ''}
            onChange={(e) => handleConfigUpdate('dribbbleUrl', e.target.value)}
          />
        </div>

        {/* GitHub */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Github size={15} /> GitHub Profile
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://github.com/YourUsername"
            value={portfolio.githubUrl || ''}
            onChange={(e) => onChange({ githubUrl: e.target.value })}
          />
        </div>

        {/* LinkedIn */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Linkedin size={15} color="#0a66c2" /> LinkedIn Profile
          </label>
          <input
            type="url"
            className="form-input"
            placeholder="https://linkedin.com/in/YourHandle"
            value={portfolio.linkedinUrl || ''}
            onChange={(e) => onChange({ linkedinUrl: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
