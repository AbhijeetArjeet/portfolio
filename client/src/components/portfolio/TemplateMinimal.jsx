import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Code,
  Calendar,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function TemplateMinimal({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-minimal">
      {/* Hero Section */}
      <section className="minimal-hero">
        {portfolio.avatarUrl && (
          <img
            src={portfolio.avatarUrl}
            alt={portfolio.title}
            className="minimal-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300';
            }}
          />
        )}
        <div>
          <h1 className="minimal-title">{portfolio.title}</h1>
          {portfolio.headline && <p className="minimal-headline">{portfolio.headline}</p>}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {portfolio.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={15} /> {portfolio.location}
              </span>
            )}
            {portfolio.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'inherit' }}>
                <Mail size={15} /> {portfolio.contactEmail}
              </a>
            )}
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            {portfolio.githubUrl && (
              <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <Github size={15} /> GitHub
              </a>
            )}
            {portfolio.linkedinUrl && (
              <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <Linkedin size={15} /> LinkedIn
              </a>
            )}
            {portfolio.websiteUrl && (
              <a href={portfolio.websiteUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <Globe size={15} /> Website
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      {portfolio.bio && (
        <section className="minimal-section">
          <h2 className="minimal-section-title">About</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            {portfolio.bio}
          </p>
        </section>
      )}

      {/* Projects Section */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="minimal-section">
          <h2 className="minimal-section-title">Featured Projects</h2>
          <div className={layoutClass}>
            {portfolio.projects.map((proj) => (
              <div key={proj.id} className="minimal-project-card portfolio-project-card">
                {proj.imageUrl && (
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: 700 }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                    {proj.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                    {proj.technologies.split(',').map((tech, i) => (
                      <span key={i} className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {proj.repositoryUrl && (
                      <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                        <Github size={13} /> Source
                      </a>
                    )}
                    {proj.demoUrl && (
                      <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                        <ExternalLink size={13} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="minimal-section">
          <h2 className="minimal-section-title">Technical Expertise</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {portfolio.skills.map((skill) => (
              <span
                key={skill.id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{skill.name}</span>
                {skill.proficiency && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{skill.proficiency}%</span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience & Education */}
      {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {portfolio.experience?.length > 0 && (
            <section className="minimal-section">
              <h2 className="minimal-section-title">Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {portfolio.experience.map((exp) => (
                  <div key={exp.id} style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{exp.role}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{exp.company}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </div>
                    {exp.description && <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {portfolio.education?.length > 0 && (
            <section className="minimal-section">
              <h2 className="minimal-section-title">Education</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {portfolio.education.map((edu) => (
                  <div key={edu.id} style={{ borderLeft: '2px solid var(--border-color)', paddingLeft: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{edu.degree}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{edu.institution}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.description && <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
