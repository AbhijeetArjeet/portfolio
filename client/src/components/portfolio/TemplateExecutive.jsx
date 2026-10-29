import React from 'react';
import {
  Briefcase,
  TrendingUp,
  MapPin,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Shield,
  Layers,
  Award
} from 'lucide-react';

export default function TemplateExecutive({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-executive" style={{ maxWidth: 960, margin: '0 auto', padding: '3.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      {/* Executive Hero */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Shield size={16} /> Verified Candidate Portfolio
            </div>
            <h1 style={{ fontSize: '2.6rem', fontWeight: 900, letterSpacing: '-0.02em', margin: '0.2rem 0' }}>{portfolio.title}</h1>
            {portfolio.headline && (
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 500, margin: '0.4rem 0 1.25rem' }}>
                {portfolio.headline}
              </p>
            )}

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {portfolio.location && <span><MapPin size={15} style={{ verticalAlign: 'middle' }} /> {portfolio.location}</span>}
              {portfolio.contactEmail && <span><Mail size={15} style={{ verticalAlign: 'middle' }} /> {portfolio.contactEmail}</span>}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {portfolio.resumeUrl && (
                <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Download Full Dossier / Resume
                </a>
              )}
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <Github size={15} /> GitHub
                </a>
              )}
              {portfolio.linkedinUrl && portfolio.showLinkedin !== false && (
                <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
            </div>
          </div>

          {portfolio.avatarUrl && (
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.title}
              style={{
                width: 150,
                height: 150,
                borderRadius: '16px',
                objectFit: 'cover',
                border: '2px solid var(--primary-border)'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300';
              }}
            />
          )}
        </div>
      </div>

      {/* Metric Counters & Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>{portfolio.projects?.length || 4}+</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Production Systems Shipped</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>{portfolio.skills?.length || 8}+</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Core Technologies Mastered</div>
        </div>
        <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>100%</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>On-Time Milestone Delivery</div>
        </div>
      </div>

      {/* Executive Bio */}
      {portfolio.bio && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.8rem' }}>Executive Summary</h2>
          <p style={{ lineHeight: 1.75, color: 'var(--text-secondary)', fontSize: '1rem' }}>{portfolio.bio}</p>
        </section>
      )}

      {/* Featured Projects */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Strategic Initiatives & Projects</h2>
          <div className={layoutClass} style={{ gap: '1.5rem' }}>
            {portfolio.projects.map((proj, idx) => (
              <div key={proj.id || idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>{proj.title}</h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.description}</p>
                </div>
                <div>
                  {proj.technologies && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '1rem' }}>
                      {proj.technologies}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    {proj.demoUrl && <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm"><ExternalLink size={13} /> Live System</a>}
                    {proj.repositoryUrl && <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm"><Github size={13} /> Repository</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {portfolio.experience && portfolio.experience.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>Leadership & Career History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {portfolio.experience.map((exp, idx) => (
              <div key={exp.id || idx} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{exp.role} &bull; <span style={{ color: 'var(--primary)' }}>{exp.company}</span></h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{exp.startDate} &mdash; {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                {exp.description && <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', margin: 0 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
