import React from 'react';
import SocialAndResumeBar from './SocialAndResumeBar';
import CertificatesSection from './CertificatesSection';
import {
  ExternalLink,
  Github,
  Award,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function TemplateDesignAgency({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  const partnerLogos = ['Google', 'Trello', 'Monday.com', 'Notion', 'Slack', 'Stripe'];

  const services = [
    { title: 'Full-Stack Development', desc: 'Scalable web and mobile applications engineered with modern cloud frameworks.' },
    { title: 'UI/UX Design Systems', desc: 'Design tokens, accessible component suites, and high-fidelity interactive prototypes.' },
    { title: 'Product Architecture', desc: 'Performance optimization, technical roadmaps, and resilient cloud infrastructure.' }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#0f172a', minHeight: '100vh', fontFamily: 'var(--font-sans)', padding: '2rem 1.5rem 5rem' }}>
      <div className="container" style={{ maxWidth: 1080 }}>

        {/* Agency Top Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, fontSize: '0.9rem' }}>
              ✦
            </div>
            <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>{portfolio.title ? portfolio.title.split(' ')[0] : 'Design'} Studio</strong>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '4px 14px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></span>
            Accepting Q1/Q2 Client Projects &amp; Tech Leadership
          </div>
        </div>

        {/* Agency Hero Section */}
        <header style={{ background: '#ecfdf5', borderRadius: '32px', padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 4vw, 3.5rem)', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#ffffff', color: '#047857', border: '1px solid #a7f3d0', borderRadius: '20px', padding: '4px 14px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                ✦ Premium Digital Solutions
              </span>

              <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 900, color: '#064e3b', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 1.25rem' }}>
                {portfolio.title || 'Increase Your Brand Value'} <br/>
                <span style={{ color: '#059669' }}>&amp; Digital Presence.</span>
              </h1>

              <p style={{ fontSize: '1.1rem', color: '#047857', lineHeight: 1.6, marginBottom: '2rem', maxWidth: 540 }}>
                {portfolio.headline || portfolio.bio || 'We help ambitious businesses scale through world-class engineering, custom design systems, and resilient cloud architecture.'}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <SocialAndResumeBar portfolio={portfolio} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 280, height: 320, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.3)', border: '6px solid #ffffff', background: '#047857' }}>
                  <img
                    src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500'}
                    alt={portfolio.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500'; }}
                  />
                </div>
                <div style={{ position: 'absolute', bottom: -15, left: -15, background: '#ffffff', border: '1px solid #a7f3d0', borderRadius: '14px', padding: '10px 16px', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#047857' }}>99%</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Brand / Partner Ticker */}
        <section style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Trusted by Modern Product Teams &amp; Clients
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '1.25rem', opacity: 0.7 }}>
            {partnerLogos.map((brand, i) => (
              <span key={i} style={{ fontSize: '1.05rem', fontWeight: 800, color: '#64748b', letterSpacing: '-0.02em' }}>
                {brand}
              </span>
            ))}
          </div>
        </section>

        {/* Services & Capabilities */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 2.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Capabilities</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>Services &amp; Specializations</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {services.map((svc, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.75rem', transition: 'all 0.2s' }}>
                <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: 900 }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{svc.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Case Studies / Projects */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section style={{ marginBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Proven Results</span>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>Featured Client Works</h2>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{portfolio.projects.length} Works Delivered</span>
            </div>

            <div className={`projects-container ${layoutClass}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {portfolio.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                  }}
                >
                  {proj.imageUrl && (
                    <div style={{ height: 210, width: '100%', overflow: 'hidden', background: '#f1f5f9' }}>
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
                      <span style={{ background: '#ecfdf5', color: '#047857', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                        DELIVERY 0{idx + 1}
                      </span>
                      {proj.featured && (
                        <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                          Featured Work
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{proj.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>{proj.description}</p>

                    {proj.technologies && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                        {proj.technologies.split(',').map((tech, i) => (
                          <span key={i} style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '6px' }}>
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary" style={{ flex: 1, justifyContent: 'center', background: '#10b981', borderColor: '#10b981' }}>
                          <ExternalLink size={13} /> View Live Case
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">
                          <Github size={13} /> Source Code
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
          <section style={{ marginBottom: '5rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>
              ✦ Agency Technical Toolkit
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {portfolio.skills.map((skill, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{skill.name}</strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>{skill.proficiency || 90}%</span>
                  </div>
                  <div style={{ width: '100%', height: 5, background: '#e2e8f0', borderRadius: 9999, marginTop: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.proficiency || 90}%`, height: '100%', background: '#10b981', borderRadius: 9999 }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolio.experience && portfolio.experience.length > 0 && (
          <section style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>
              ✦ Organizational Leadership &amp; History
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {portfolio.experience.map((exp, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{exp.role}</h3>
                    <div style={{ fontSize: '0.92rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>{exp.company}</div>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.75rem', lineHeight: 1.6 }}>{exp.description}</p>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#047857', background: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', height: 'fit-content' }}>
                    {exp.startDate} &mdash; {exp.isCurrent ? 'Present' : exp.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Verified Credentials */}
        <CertificatesSection portfolio={portfolio} />

        {/* Footer Contact Banner */}
        <footer style={{ marginTop: '5rem', background: '#064e3b', color: '#ffffff', borderRadius: '32px', padding: 'clamp(2.5rem, 5vw, 4rem) 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.75rem' }}>Ready to elevate your digital presence?</h2>
          <p style={{ color: '#a7f3d0', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto 2.5rem' }}>
            Get in touch directly via WhatsApp or review credentials and book an introductory consultation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SocialAndResumeBar portfolio={portfolio} />
          </div>
        </footer>

      </div>
    </div>
  );
}
