import React, { useState } from 'react';
import { uploadService } from '../../services/upload.service';
import { aiService } from '../../services/ai.service';
import { Camera, UploadCloud, Link as LinkIcon, Sparkles, Wand2, Check } from 'lucide-react';

export default function PersonalInfoSection({ portfolio, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [generatingBio, setGeneratingBio] = useState(false);
  const [bioStyle, setBioStyle] = useState('technical');
  const [showAiStyles, setShowAiStyles] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');
    try {
      const res = await uploadService.uploadImage(file);
      if (res && res.url) {
        onChange({ avatarUrl: res.url });
      }
    } catch (err) {
      setUploadError(err.message || 'Image upload failed. Allowed formats: PNG, JPG, WEBP.');
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateBio = async (style = bioStyle) => {
    setGeneratingBio(true);
    setAiSuccessMsg('');
    try {
      const generated = await aiService.generateBio(portfolio, style);
      onChange({ bio: generated });
      setAiSuccessMsg(`Generated ${style} bio!`);
      setTimeout(() => setAiSuccessMsg(''), 3000);
    } catch (err) {
      console.error('AI bio generation error:', err);
    } finally {
      setGeneratingBio(false);
      setShowAiStyles(false);
    }
  };

  const handleGenerateHeadline = async () => {
    try {
      const suggestions = await aiService.generateHeadlines(portfolio.title, portfolio.headline);
      if (suggestions && suggestions.length > 0) {
        onChange({ headline: suggestions[0] });
        setAiSuccessMsg('Updated headline!');
        setTimeout(() => setAiSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('AI headline error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Personal Information &amp; Bio</h3>

      {/* Profile Photo / Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
        <img
          src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'}
          alt="Avatar"
          style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'; }}
        />
        <div style={{ flex: 1 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} className="btn btn-secondary btn-sm">
            <Camera size={14} />
            <span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            JPG, PNG or WEBP up to 5MB. Persisted in backend storage.
          </div>
          {uploadError && <div style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px' }}>{uploadError}</div>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Portfolio Title / Name</label>
        <input
          type="text"
          className="form-input"
          value={portfolio.title || ''}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Abhijeet Arjeet | Full-Stack & Systems Developer"
        />
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label className="form-label" style={{ margin: 0 }}>Professional Headline</label>
          <button
            type="button"
            onClick={handleGenerateHeadline}
            className="btn btn-sm"
            style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'var(--primary-subtle)', color: 'var(--primary)', border: '1px solid var(--border-color)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            title="Generate headline with AI"
          >
            <Sparkles size={12} /> AI Headline
          </button>
        </div>
        <input
          type="text"
          className="form-input"
          value={portfolio.headline || ''}
          onChange={(e) => onChange({ headline: e.target.value })}
          placeholder="e.g. Software & Systems Developer • Open Source Creator"
        />
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <label className="form-label" style={{ margin: 0 }}>Biography &amp; Philosophy</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {aiSuccessMsg && (
              <span style={{ fontSize: '0.75rem', color: 'var(--success-text)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Check size={12} /> {aiSuccessMsg}
              </span>
            )}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setShowAiStyles(!showAiStyles)}
                disabled={generatingBio}
                className="btn btn-sm"
                style={{ fontSize: '0.75rem', padding: '3px 10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#ffffff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Sparkles size={13} /> {generatingBio ? 'Generating...' : '✨ AI Bio Assistant'}
              </button>

              {showAiStyles && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '4px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.5rem',
                    zIndex: 20,
                    width: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '2px 6px', fontWeight: 700 }}>SELECT TONE:</span>
                  {[
                    { key: 'technical', label: '💻 Technical' },
                    { key: 'executive', label: '👔 Executive' },
                    { key: 'creative', label: '🎨 Creative' },
                    { key: 'startup', label: '🚀 Startup' }
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => handleGenerateBio(t.key)}
                      style={{
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        padding: '6px 8px',
                        fontSize: '0.8rem',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => { e.target.style.background = 'var(--bg-secondary)'; }}
                      onMouseLeave={(e) => { e.target.style.background = 'none'; }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <textarea
          className="form-textarea"
          rows={4}
          value={portfolio.bio || ''}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="Write a compelling summary about your background, interests, and engineering philosophy, or click 'AI Bio Assistant' to generate one..."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            value={portfolio.location || ''}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="e.g. Bangalore, India"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Public Contact Email</label>
          <input
            type="email"
            className="form-input"
            value={portfolio.contactEmail || ''}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
            placeholder="e.g. yourname@gmail.com"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">GitHub Profile URL</label>
          <input
            type="url"
            className="form-input"
            value={portfolio.githubUrl || ''}
            onChange={(e) => onChange({ githubUrl: e.target.value })}
            placeholder="https://github.com/YourUsername"
          />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn Profile URL</label>
          <input
            type="url"
            className="form-input"
            value={portfolio.linkedinUrl || ''}
            onChange={(e) => onChange({ linkedinUrl: e.target.value })}
            placeholder="https://linkedin.com/in/YourHandle"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Portfolio Custom URL Slug (/u/your-slug)</label>
        <input
          type="text"
          className="form-input"
          value={portfolio.slug || ''}
          onChange={(e) => onChange({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
          placeholder="your-custom-slug"
        />
        <span className="form-help">Unique shareable link: <code>/u/{portfolio.slug}</code></span>
      </div>
    </div>
  );
}
