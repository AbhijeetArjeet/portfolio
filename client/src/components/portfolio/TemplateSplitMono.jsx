import React from 'react';
import SocialAndResumeBar from './SocialAndResumeBar';
import CertificatesSection from './CertificatesSection';
import {
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Terminal,
  Layers,
  Award,
  Briefcase,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

export default function TemplateSplitMono({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* 50/50 Split Hero Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', minHeight: '85vh', borderBottom: '1px solid #e2e8f0' }}>
        
        {/* Left Side: Dark High-Contrast Statement */}
        <div style={{ background: '#090a0f', color: '#ffffff', padding: 'clamp(2.5rem, 6vw, 5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: '2.5rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></span>
              AVAILABLE FOR NEW ENGAGEMENTS
            </div>

            <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', margin: '0 0 1.25rem' }}>
              Hi, I am <br/>
              <span style={{ color: '#ffffff', borderBottom: '4px solid #10b981' }}>
                {portfolio.title || 'Tomasz Gajda'}
              </span>
            </h1>

            <p style={{ fontSize: '1.25rem', color: '#94a3b8', fontWeight: 600, marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {portfolio.headline || 'Frontend Developer / UI Designer based in Central Europe.'}
            </p>

            <p style={{ fontSize: '0.98rem', color: '#64748b', lineHeight: 1.7, maxWidth: 480, marginBottom: '2.5rem' }}>
              {portfolio.bio || 'I strive to build immersive and beautiful web applications through carefully crafted code and user-centric design principles.'}
            </p>
          </div>

          <div>
            <SocialAndResumeBar portfolio={portfolio} />
          </div>
        </div>

        {/* Right Side: Clean Portrait & Tech Specs */}
        <div style={{ background: '#f8fafc', padding: 'clamp(2.5rem, 6vw, 5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 360, textAlign: 'center' }}>
            <div style={{ width: '100%', height: 420, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0', background: '#090a0f' }}>
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'}
                alt={portfolio.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'; }}
              />
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Direct Contact</span>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0f172a' }}>{portfolio.contactEmail || 'creator@portfolio.dev'}</strong>
              </div>
              {portfolio.location && (
                <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} /> {portfolio.location}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Main Container Content */}
      <div className="container" style={{ maxWidth: 1040, padding: '5rem 1.5rem' }}>

        {/* Featured Projects */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section style={{ marginBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', borderBottom: '2px solid #0f172a', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>[ PORTFOLIO / WORKS ]</span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>Selected Projects</h2>
              </div>
              <span style={{ fontSize: '0.9rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>0{portfolio.projects.length} Total</span>
            </div>

            <div className={`projects-container ${layoutClass}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {portfolio.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  style={{
                    border: '1px solid #0f172a',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '4px 4px 0px #0f172a',
                    background: '#ffffff'
                  }}
                >
                  {proj.imageUrl && (
                    <div style={{ height: 210, width: '100%', overflow: 'hidden', borderBottom: '1px solid #0f172a' }}>
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800 }}>PROJECT 0{idx + 1}</span>
                      {proj.featured && (
                        <span style={{ background: '#0f172a', color: '#ffffff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '2px' }}>
                          FEATURED
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>{proj.description}</p>

                    {proj.technologies && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                        {proj.technologies.split(',').map((tech, i) => (
                          <span key={i} style={{ border: '1px solid #cbd5e1', color: '#334155', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem', marginTop: 'auto' }}>
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                          <ExternalLink size={13} /> Live Preview
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">
                          <Github size={13} /> Repo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Competencies */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section style={{ marginBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '2px solid #0f172a', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Skills &amp; Technologies</h2>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>Capabilities</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {portfolio.skills.map((skill, idx) => (
                <div key={idx} style={{ padding: '8px 16px', background: '#090a0f', color: '#ffffff', borderRadius: '4px', fontSize: '0.88rem', fontWeight: 700, fontFamily: 'var(--font-mono)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span>{skill.name}</span>
                  <span style={{ color: '#10b981', fontSize: '0.75rem' }}>({skill.proficiency || 85}%)</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {portfolio.experience && portfolio.experience.length > 0 && (
          <section style={{ marginBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '2px solid #0f172a', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Work Experience</h2>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>Career Timeline</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {portfolio.experience.map((exp, idx) => (
                <div key={idx} style={{ borderLeft: '3px solid #0f172a', paddingLeft: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -7, top: 4, width: 11, height: 11, borderRadius: '50%', background: '#0f172a' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>{exp.role}</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#64748b' }}>
                      {exp.startDate} &mdash; {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#10b981', fontSize: '0.92rem', marginTop: '2px' }}>{exp.company}</div>
                  <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginTop: '0.5rem' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Verified Credentials */}
        <CertificatesSection portfolio={portfolio} />

        {/* Footer */}
        <footer style={{ marginTop: '5rem', borderTop: '2px solid #0f172a', paddingTop: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem' }}>Say Hello</div>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Feel free to reach out for collaborations or direct project inquiries.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SocialAndResumeBar portfolio={portfolio} />
          </div>
        </footer>

      </div>
    </div>
  );
}
