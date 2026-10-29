import React from 'react';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  BookOpen,
  Award,
  Calendar,
  Globe
} from 'lucide-react';

export default function TemplateEditorial({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <article className="tpl-editorial" style={{ maxWidth: 860, margin: '0 auto', padding: '3.5rem 1.5rem', fontFamily: 'var(--font-heading)' }}>
      {/* Editorial Header */}
      <header style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '2.5rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}>
              Independent Portfolio & Selected Works
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.15, marginTop: '0.5rem', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
              {portfolio.title}
            </h1>
            {portfolio.headline && (
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                &ldquo;{portfolio.headline}&rdquo;
              </p>
            )}

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
              {portfolio.location && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={15} /> {portfolio.location}
                </span>
              )}
              {portfolio.contactEmail && (
                <a href={`mailto:${portfolio.contactEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'inherit' }}>
                  <Mail size={15} /> {portfolio.contactEmail}
                </a>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <Github size={14} /> GitHub
                </a>
              )}
              {portfolio.linkedinUrl && portfolio.showLinkedin !== false && (
                <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <Linkedin size={14} /> LinkedIn
                </a>
              )}
              {portfolio.resumeUrl && (
                <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  View Resume
                </a>
              )}
            </div>
          </div>

          {portfolio.avatarUrl && (
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.title}
              style={{
                width: 140,
                height: 140,
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300';
              }}
            />
          )}
        </div>
      </header>

      {/* Narrative Biography */}
      {portfolio.bio && (
        <section style={{ marginBottom: '3.5rem', fontFamily: 'var(--font-sans)', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>
          <h2 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Prologue & Biography
          </h2>
          <p style={{ whiteSpace: 'pre-line' }}>{portfolio.bio}</p>
        </section>
      )}

      {/* Selected Works / Projects */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Selected Works & Case Studies
          </h2>
          <div className={layoutClass} style={{ gap: '2rem' }}>
            {portfolio.projects.map((proj, idx) => (
              <div
                key={proj.id || idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{proj.title}</h3>
                    {proj.featured && (
                      <span style={{ fontSize: '0.72rem', background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {proj.description}
                  </p>
                </div>

                <div>
                  {proj.technologies && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>
                      {proj.technologies.split(',').map((t, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.75rem', fontFamily: 'var(--font-sans)' }}>
                    {proj.demoUrl && (
                      <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                        <ExternalLink size={13} /> Publication / Live
                      </a>
                    )}
                    {proj.repositoryUrl && (
                      <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                        <Github size={13} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience & Appointments */}
      {portfolio.experience && portfolio.experience.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Professional Trajectory
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'var(--font-sans)' }}>
            {portfolio.experience.map((exp, idx) => (
              <div key={exp.id || idx} style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                  {exp.role} &bull; <span style={{ color: 'var(--primary)' }}>{exp.company}</span>
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', margin: '0.2rem 0 0.5rem' }}>
                  {exp.startDate} &mdash; {exp.isCurrent ? 'Present' : exp.endDate}
                </span>
                {exp.description && (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Competencies */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Core Domains & Disciplines
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', fontFamily: 'var(--font-sans)' }}>
            {portfolio.skills.map((sk, idx) => (
              <div
                key={sk.id || idx}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  fontSize: '0.88rem',
                  fontWeight: 600
                }}
              >
                {sk.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
