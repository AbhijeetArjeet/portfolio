import React from 'react';
import SocialAndResumeBar from './SocialAndResumeBar';
import CertificatesSection from './CertificatesSection';
import {
  ExternalLink,
  Github,
  Compass,
  Layers,
  Users,
  Target,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Eye,
  FileText
} from 'lucide-react';

export default function TemplateUxCaseStudy({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  const uxStages = [
    { title: '01. Discovery', desc: 'User interviews & field research' },
    { title: '02. Architecture', desc: 'Information hierarchy & user flows' },
    { title: '03. Prototyping', desc: 'Wireframes to high-fidelity UI' },
    { title: '04. Validation', desc: 'Usability testing & metric audits' }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', fontFamily: 'var(--font-sans)', padding: '2.5rem 1.5rem 5rem' }}>
      <div className="container" style={{ maxWidth: 1040 }}>
        
        {/* Navigation & Status Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#0284c7' }}></div>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0369a1' }}>
              UX &amp; Product Design Architecture
            </span>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0284c7', display: 'inline-block' }}></span>
            Open for UX Research &amp; Product Design Roles
          </div>
        </div>

        {/* Hero Section */}
        <header style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              User Experience &bull; Design Systems &bull; Interaction
            </span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, margin: '0.75rem 0 1rem', color: '#0f172a', letterSpacing: '-0.03em' }}>
              {portfolio.title || 'Senior UX / Product Designer'}
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', fontWeight: 600, marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {portfolio.headline || 'Bridging complex technical capabilities with intuitive user outcomes.'}
            </p>
            <p style={{ fontSize: '0.98rem', color: '#64748b', lineHeight: 1.7, marginBottom: '2rem' }}>
              {portfolio.bio || 'Specializing in end-to-end product design, wireframe prototyping, user journey mapping, and measurable conversion metrics.'}
            </p>

            <SocialAndResumeBar portfolio={portfolio} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 260, height: 260, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.25)', border: '4px solid #ffffff' }}>
                <img
                  src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500'}
                  alt={portfolio.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500'; }}
                />
              </div>
              <div style={{ position: 'absolute', bottom: -15, right: -15, background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 10px 20px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={18} color="#0284c7" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>Case Study Driven</span>
              </div>
            </div>
          </div>
        </header>

        {/* 4-Stage UX Process Ribbon */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {uxStages.map((stage, i) => (
              <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.25rem', borderTop: '3px solid #0284c7' }}>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#0284c7', marginBottom: '4px' }}>{stage.title}</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{stage.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies Showcase */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section style={{ marginBottom: '4.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Featured Works</span>
                <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>UX Case Studies &amp; Product Artifacts</h2>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{portfolio.projects.length} Documented Projects</span>
            </div>

            <div className={`projects-container ${layoutClass}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {portfolio.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  {proj.imageUrl && (
                    <div style={{ height: 200, width: '100%', overflow: 'hidden', background: '#f1f5f9' }}>
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                      <span style={{ background: '#f0f9ff', color: '#0369a1', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                        Case Study 0{idx + 1}
                      </span>
                      {proj.featured && (
                        <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>{proj.description}</p>

                    {proj.technologies && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                        {proj.technologies.split(',').map((tech, i) => (
                          <span key={i} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '6px' }}>
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                          <ExternalLink size={13} /> View Prototype
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-secondary">
                          <Github size={13} /> Repository
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Design Competencies */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section style={{ marginBottom: '4.5rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="#0284c7" /> UX Methodologies &amp; Tools
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {portfolio.skills.map((skill, idx) => (
                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{skill.name}</strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284c7' }}>{skill.proficiency || 85}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: '#e2e8f0', borderRadius: 9999, marginTop: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.proficiency || 85}%`, height: '100%', background: '#0284c7', borderRadius: 9999 }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {portfolio.experience && portfolio.experience.length > 0 && (
          <section style={{ marginBottom: '4.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={20} color="#0284c7" /> Career Experience &bull; Design Roles
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {portfolio.experience.map((exp, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{exp.role}</h3>
                    <div style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: 700, marginTop: '2px' }}>{exp.company}</div>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.75rem', lineHeight: 1.6 }}>{exp.description}</p>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', background: '#f8fafc', padding: '4px 10px', borderRadius: '6px', height: 'fit-content' }}>
                    {exp.startDate} &mdash; {exp.isCurrent ? 'Present' : exp.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates & Credentials Section */}
        <CertificatesSection portfolio={portfolio} />

        {/* Footer Contact Callout */}
        <footer style={{ marginTop: '5rem', background: '#0f172a', color: '#ffffff', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Have a product to build or scale?</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: 600, margin: '0 auto 2rem' }}>
            Available for consulting, contract engagements, and full-time design leadership roles.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SocialAndResumeBar portfolio={portfolio} />
          </div>
        </footer>

      </div>
    </div>
  );
}
