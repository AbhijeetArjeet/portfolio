import React from 'react';
import SocialAndResumeBar from './SocialAndResumeBar';
import CertificatesSection from './CertificatesSection';
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Award,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Play,
  ArrowUpRight,
  Figma
} from 'lucide-react';

export default function TemplateProductDesigner({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  const defaultStats = [
    { label: 'Interactive Prototypes', val: '24+' },
    { label: 'Design System Tokens', val: '180+' },
    { label: 'Design Satisfaction', val: '99%' },
    { label: 'Design Awards', val: '04' }
  ];

  return (
    <div style={{ backgroundColor: '#090a0f', color: '#f8fafc', minHeight: '100vh', fontFamily: 'var(--font-sans)', padding: '2.5rem 1.5rem 5rem' }}>
      <div className="container" style={{ maxWidth: 1060 }}>

        {/* Ambient Top Glow */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 400, height: 200, background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }}></div>
        </div>

        {/* Navbar pill */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {portfolio.title ? portfolio.title.split(' ')[0] : 'Product'}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', borderLeft: '1px solid #334155', paddingLeft: '8px' }}>Product Designer</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24', padding: '5px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 10px #fbbf24' }}></span>
            Available for Q1/Q2 Design Contracts &amp; Roles
          </div>
        </div>

        {/* Hero Section */}
        <header style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 4rem', position: 'relative' }}>
          <div style={{ display: 'inline-block', position: 'relative', marginBottom: '1.5rem' }}>
            <div style={{ width: 140, height: 140, borderRadius: '50%', padding: '4px', background: 'linear-gradient(135deg, #f59e0b, #ec4899, #6366f1)', margin: '0 auto' }}>
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'}
                alt={portfolio.title}
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'; }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '3px 10px', fontSize: '0.72rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={11} /> Prototyper
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.04em', marginBottom: '1rem', color: '#ffffff' }}>
            I'm {portfolio.title || 'Product Designer'}, <br/>
            <span style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              crafting digital experiences that connect.
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: 680, margin: '0 auto 2rem' }}>
            {portfolio.headline || portfolio.bio || 'Designing high-converting consumer products, complex design systems, and animated interactive prototypes.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SocialAndResumeBar portfolio={portfolio} />
          </div>
        </header>

        {/* Floating Metrics Counter Grid */}
        <section style={{ marginBottom: '4.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {defaultStats.map((st, i) => (
              <div key={i} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.07)', borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fbbf24', letterSpacing: '-0.02em' }}>{st.val}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects / Case Study Gallery */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section style={{ marginBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Portfolio Work</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '4px', color: '#ffffff' }}>Interactive Case Studies</h2>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{portfolio.projects.length} Works Featured</span>
            </div>

            <div className={`projects-container ${layoutClass}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {portfolio.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {proj.imageUrl && (
                    <div style={{ height: 210, width: '100%', overflow: 'hidden', background: '#020617' }}>
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}

                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase' }}>
                        Project 0{idx + 1}
                      </span>
                      {proj.featured && (
                        <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.6rem' }}>{proj.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>{proj.description}</p>

                    {proj.technologies && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                        {proj.technologies.split(',').map((tech, i) => (
                          <span key={i} style={{ background: 'rgba(255,255,255,0.06)', color: '#cbd5e1', fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '6px' }}>
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', marginTop: 'auto' }}>
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-sm" style={{ flex: 1, justifyContent: 'center', background: '#f59e0b', color: '#090a0f', fontWeight: 800 }}>
                          <Play size={13} fill="#090a0f" /> Interactive Prototype
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

        {/* Skills & Tools Grid */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section style={{ marginBottom: '4.5rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={22} color="#f59e0b" /> Core Design Stack &amp; Tools
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {portfolio.skills.map((sk, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#f8fafc' }}>{sk.name}</strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24' }}>{sk.proficiency || 88}%</span>
                  </div>
                  <div style={{ width: '100%', height: 4, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 9999, marginTop: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${sk.proficiency || 88}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', borderRadius: 9999 }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolio.experience && portfolio.experience.length > 0 && (
          <section style={{ marginBottom: '4.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={22} color="#f59e0b" /> Career Journey
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {portfolio.experience.map((exp, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{exp.role}</h3>
                    <div style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 700, marginTop: '2px' }}>{exp.company}</div>
                    <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.75rem', lineHeight: 1.6 }}>{exp.description}</p>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', height: 'fit-content' }}>
                    {exp.startDate} &mdash; {exp.isCurrent ? 'Present' : exp.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Verified Credentials */}
        <CertificatesSection portfolio={portfolio} />

        {/* Footer CTA */}
        <footer style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.5rem' }}>Let's build something remarkable.</h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '2rem' }}>Send a message directly via WhatsApp or connect on social platforms.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SocialAndResumeBar portfolio={portfolio} />
          </div>
        </footer>

      </div>
    </div>
  );
}
