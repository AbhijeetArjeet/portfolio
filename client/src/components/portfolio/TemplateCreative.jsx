import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Sparkles,
  ExternalLink,
  MapPin,
  Mail,
  Award,
  Layers
} from 'lucide-react';

export default function TemplateCreative({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-creative">
      {/* Bento Hero */}
      <section className="bento-hero">
        <div style={{ maxWidth: 650 }}>
          <span className="creative-badge">Featured Portfolio &bull; Verified Creator</span>
          <h1 className="creative-title">{portfolio.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {portfolio.headline || portfolio.bio || 'Designing products and developing code for the web.'}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {portfolio.githubUrl && (
              <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                <Github size={16} /> GitHub Work
              </a>
            )}
            {portfolio.linkedinUrl && (
              <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
            {portfolio.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`} className="btn btn-secondary">
                <Mail size={16} /> Get In Touch
              </a>
            )}
          </div>
        </div>

        {portfolio.avatarUrl && (
          <div style={{ position: 'relative' }}>
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.title}
              style={{
                width: 180,
                height: 180,
                borderRadius: '24px',
                objectFit: 'cover',
                boxShadow: 'var(--shadow-xl)',
                border: '4px solid var(--bg-card)'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300';
              }}
            />
          </div>
        )}
      </section>

      {/* Bento Grid Highlights */}
      <div className="bento-grid">
        {/* Bio Card */}
        {portfolio.bio && (
          <div className="bento-card bento-span-8">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 800 }}>About &amp; Philosophy</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              {portfolio.bio}
            </p>
          </div>
        )}

        {/* Quick Facts Bento */}
        <div className="bento-card bento-span-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', fontWeight: 800 }}>Quick Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {portfolio.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--primary)" /> {portfolio.location}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--primary)" /> Public Profile
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} color="var(--primary)" /> Layout: {portfolio.layoutType}
            </div>
          </div>
        </div>

        {/* Skills Bento */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="bento-card bento-span-12">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 800 }}>Core Capabilities &amp; Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {portfolio.skills.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    background: 'var(--bg-secondary)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>{skill.name}</span>
                  {skill.proficiency && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>{skill.proficiency}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Projects Showcase */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Selected Works</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ({portfolio.projects.length} Projects displayed)
            </span>
          </div>

          <div className={layoutClass}>
            {portfolio.projects.map((proj) => (
              <div key={proj.id} className="bento-card portfolio-project-card" style={{ display: 'flex', flexDirection: 'column' }}>
                {proj.imageUrl && (
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.2rem' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.6rem' }}>{proj.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                  {proj.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {proj.technologies.split(',').map((tech, i) => (
                    <span key={i} className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {proj.repositoryUrl && (
                    <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                      <Github size={14} /> Repository
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <ExternalLink size={14} /> Launch Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience / Education */}
      {portfolio.experience?.length > 0 && (
        <section className="bento-card" style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem' }}>Professional Journey</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {portfolio.experience.map((exp) => (
              <div key={exp.id} style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{exp.role}</h4>
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>{exp.company}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.5rem' }}>
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                </div>
                {exp.description && <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
