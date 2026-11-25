import React, { useState } from 'react';
import { Award, Plus, Trash2, ExternalLink, Calendar, Building, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function CertificatesManager({ portfolio, onChange }) {
  const { success } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    credentialId: ''
  });

  const themeConfig = (() => {
    try {
      return typeof portfolio.themeConfig === 'string'
        ? JSON.parse(portfolio.themeConfig)
        : portfolio.themeConfig || {};
    } catch {
      return {};
    }
  })();

  const certificates = Array.isArray(themeConfig.certificates) ? themeConfig.certificates : [];

  const handleAddCertificate = (e) => {
    e.preventDefault();
    if (!form.name || !form.issuer) return;

    const newCert = {
      id: 'cert-' + Date.now(),
      ...form
    };

    const updatedCerts = [...certificates, newCert];
    const updatedConfig = { ...themeConfig, certificates: updatedCerts };
    onChange({ themeConfig: JSON.stringify(updatedConfig) });
    setForm({ name: '', issuer: '', issueDate: '', credentialUrl: '', credentialId: '' });
    setShowAddForm(false);
    success('Certificate added successfully!');
  };

  const handleDeleteCertificate = (id) => {
    const updatedCerts = certificates.filter((c) => c.id !== id);
    const updatedConfig = { ...themeConfig, certificates: updatedCerts };
    onChange({ themeConfig: JSON.stringify(updatedConfig) });
    success('Certificate removed.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Award size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Certificates &amp; Achievements</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Display verified credentials, industry certificates, and hackathon awards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary btn-sm"
        >
          <Plus size={15} /> {showAddForm ? 'Cancel' : 'Add Certificate'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddCertificate} className="card" style={{ background: 'var(--bg-secondary)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Add New Credential</h4>

          <div className="form-group">
            <label className="form-label">Certificate / Award Title *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. AWS Certified Solutions Architect or Smart India Hackathon Winner"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Issuing Organization *</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. Amazon Web Services, Meta, Google Cloud"
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Issue Date</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Nov 2025"
                value={form.issueDate}
                onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Verification URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://credly.com/badges/..."
                value={form.credentialUrl}
                onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Credential ID</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. AWS-948102"
                value={form.credentialId}
                onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Certificate
            </button>
          </div>
        </form>
      )}

      {/* Existing Certificates List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {certificates.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)' }}>
            <Award size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
            <p style={{ fontSize: '0.9rem' }}>No certificates added yet.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Click &quot;Add Certificate&quot; to showcase your credentials.</p>
          </div>
        ) : (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="card"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{cert.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span>{cert.issuer}</span>
                    {cert.issueDate && <span>&bull; {cert.issueDate}</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                  >
                    Verify <ExternalLink size={12} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteCertificate(cert.id)}
                  className="btn btn-danger btn-sm"
                  style={{ padding: '4px 8px' }}
                  title="Delete certificate"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
