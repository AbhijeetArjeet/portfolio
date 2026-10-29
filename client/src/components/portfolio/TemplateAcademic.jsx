import React from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  FileText
} from 'lucide-react';

export default function TemplateAcademic({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-academic" style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      {/* Curriculum Vitae Header */}
      <div style={{ borderBottom: '3px double var(--border-color)', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-block', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, marginBottom: '0.5rem' }}>
              Curriculum Vitae & Research Profile
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.25rem 0' }}>{portfolio.title}</h1>
            {portfolio.headline && (
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                {portfolio.headline}
              </p>
            )}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {portfolio.location && <span><MapPin size={14} style={{ verticalAlign: 'middle' }} /> {portfolio.location}</span>}
              {portfolio.contactEmail && <span><Mail size={14} style={{ verticalAlign: 'middle' }} /> {portfolio.contactEmail}</span>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {portfolio.resumeUrl && (
              <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                <FileText size={14} /> Download Academic CV
              </a>
            )}
            {portfolio.githubUrl && (
              <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <Github size={14} /> GitHub
              </a>
            )}
            {portfolio.linkedinUrl && (
              <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <Linkedin size={14} /> Scholar / LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Abstract / Bio */}
      {portfolio.bio && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.8rem' }}>
            Research Statement & Academic Summary
          </h2>
          <p style={{ lineHeight: 1.7, color: 'var(--text-primary)', fontSize: '0.96rem' }}>{portfolio.bio}</p>
        </section>
      )}

      {/* Education */}
      {portfolio.education && portfolio.education.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <GraduationCap size={18} /> Formal Education & Credentials
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {portfolio.education.map((edu, idx) => (
              <div key={edu.id || idx} style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{edu.startDate} &mdash; {edu.endDate}</span>
                </div>
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.92rem', marginTop: '0.2rem' }}>{edu.institution}</div>
                {edu.description && <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.4rem', margin: 0 }}>{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Research Projects & Publications */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={18} /> Research Projects & Publications
          </h2>
          <div className={layoutClass} style={{ gap: '1.25rem' }}>
            {portfolio.projects.map((proj, idx) => (
              <div key={proj.id || idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{proj.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{proj.description}</p>
                {proj.technologies && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    <strong>Keywords & Methodology:</strong> {proj.technologies}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {proj.demoUrl && <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm"><ExternalLink size={12} /> Paper / Demo</a>}
                  {proj.repositoryUrl && <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm"><Github size={12} /> Source Code</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Specializations */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={18} /> Technical Specializations & Competencies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {portfolio.skills.map((sk, idx) => (
              <div key={sk.id || idx} style={{ border: '1px solid var(--border-color)', padding: '0.65rem 0.9rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{sk.name}</span>
                {sk.proficiency && <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 700 }}>{sk.proficiency}%</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
