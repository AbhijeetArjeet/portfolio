import React, { useState } from 'react';
import { uploadService } from '../../services/upload.service';
import { Camera, UploadCloud, Link as LinkIcon } from 'lucide-react';

export default function PersonalInfoSection({ portfolio, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

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
        <label className="form-label">Professional Headline</label>
        <input
          type="text"
          className="form-input"
          value={portfolio.headline || ''}
          onChange={(e) => onChange({ headline: e.target.value })}
          placeholder="e.g. Software & Systems Developer • Open Source Creator"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Biography &amp; Philosophy</label>
        <textarea
          className="form-textarea"
          rows={4}
          value={portfolio.bio || ''}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="Write a compelling summary about your background, interests, and engineering philosophy..."
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
            placeholder="e.g. contact@example.com"
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
