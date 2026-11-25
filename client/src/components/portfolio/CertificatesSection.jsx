import React from 'react';
import { Award, ExternalLink, Calendar, Building, CheckCircle } from 'lucide-react';

export default function CertificatesSection({ portfolio, theme = 'default' }) {
  if (!portfolio) return null;

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

  if (certificates.length === 0) return null;

  return (
    <section className="portfolio-certificates-section" style={{ marginTop: '3.5rem', marginBottom: '2.5rem' }}>
      <div style={{ marginBottom: '1.75rem', textAlign: 'inherit' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', marginBottom: '0.4rem' }}>
          <Award size={15} /> Verified Credentials
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Certificates &amp; Achievements</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}
      >
        {certificates.map((cert) => (
          <div
            key={cert.id || cert.name}
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border-color, #e2e8f0)',
              borderRadius: 'var(--radius-lg, 12px)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
                  color: '#6366f1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Award size={20} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.25rem', color: 'var(--text-primary)' }}>
                  {cert.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <Building size={12} />
                  <span>{cert.issuer}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color, #f1f5f9)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {cert.issueDate ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> {cert.issueDate}
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
                  <CheckCircle size={12} /> Verified
                </span>
              )}

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--primary, #6366f1)',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Verify <ExternalLink size={11} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
