import React from 'react';
import SocialAndResumeBar from './SocialAndResumeBar';
import CertificatesSection from './CertificatesSection';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function TemplateCyberNeon({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-cyber-neon">
      {/* Grid Pattern Background */}
      <div className="cyber-grid-overlay"></div>

      <div className="cyber-container">
        {/* Top Tech Status Bar */}
        <div className="cyber-status-bar">
          <div className="cyber-system-id">
            <span className="cyber-status-indicator"></span>
            <code>SYS.ONLINE // PORTFOLIO_V2</code>
          </div>
          <div className="cyber-coords">
            {portfolio.location ? (
              <span><MapPin size={12} /> {portfolio.location}</span>
            ) : (
              <span>GLOBAL NODE</span>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <header className="cyber-hero">
          {/* Glowing Avatar Frame */}
          <div className="cyber-avatar-container">
            <div className="cyber-avatar-ring">
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600'}
                alt={portfolio.title}
                className="cyber-avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600';
                }}
              />
            </div>
          </div>

          <div className="cyber-hero-text">
            <h1 className="cyber-hero-title">{portfolio.title || 'James Smith'}</h1>
            <p className="cyber-hero-headline">{portfolio.headline || 'Senior Full-Stack Architect'}</p>
            <p className="cyber-hero-bio">
              {portfolio.bio ||
                'Passionate software engineer building resilient, distributed systems and performant user interfaces.'}
            </p>

            <div className="cyber-hero-actions">
              {portfolio.contactEmail && (
                <a href={`mailto:${portfolio.contactEmail}`} className="cyber-btn-cyan">
                  Initialize Contact <ArrowRight size={15} />
                </a>
              )}
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="cyber-btn-tech">
                  <Github size={15} /> GitHub
                </a>
              )}
              {portfolio.linkedinUrl && (
                <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="cyber-btn-tech">
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
            </div>

            <SocialAndResumeBar portfolio={portfolio} />
          </div>

          {/* Metric Stats Cards */}
          <div className="cyber-stats-row">
            <div className="cyber-stat-card">
              <span className="cyber-stat-val">30+</span>
              <span className="cyber-stat-lbl">Projects Shipped</span>
            </div>
            <div className="cyber-stat-card">
              <span className="cyber-stat-val">2.5k</span>
              <span className="cyber-stat-lbl">GitHub Commits</span>
            </div>
            <div className="cyber-stat-card">
              <span className="cyber-stat-val">99.9%</span>
              <span className="cyber-stat-lbl">Code Quality</span>
            </div>
            <div className="cyber-stat-card">
              <span className="cyber-stat-val">5+</span>
              <span className="cyber-stat-lbl">Years Industry</span>
            </div>
          </div>
        </header>

        {/* Skills & Stack */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="cyber-section">
            <div className="cyber-section-header">
              <Cpu size={18} className="cyber-icon-glow" />
              <h2>Technology Stack</h2>
            </div>
            <div className="cyber-skills-grid">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="cyber-skill-card">
                  <div className="cyber-skill-info">
                    <span className="cyber-skill-name">{skill.name}</span>
                    <span className="cyber-skill-cat">{skill.category || 'Core'}</span>
                  </div>
                  {skill.proficiency && (
                    <div className="cyber-bar-track">
                      <div className="cyber-bar-fill" style={{ width: `${skill.proficiency}%` }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="cyber-section">
            <div className="cyber-section-header">
              <Terminal size={18} className="cyber-icon-glow" />
              <h2>Deployed Systems</h2>
            </div>
            <div className={layoutClass}>
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="cyber-project-card portfolio-project-card">
                  {proj.imageUrl && (
                    <div className="cyber-proj-img-wrap">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="cyber-proj-img"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="cyber-proj-body">
                    <h3 className="cyber-proj-title">{proj.title}</h3>
                    <p className="cyber-proj-desc">{proj.description}</p>
                    <div className="cyber-tech-pills">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="cyber-tech-pill">`{tech.trim()}`</span>
                      ))}
                    </div>
                    <div className="cyber-proj-footer">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="cyber-link-neon">
                          Execute Demo <ExternalLink size={13} />
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="cyber-link-subtle">
                          <Github size={13} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Career */}
        {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
          <section className="cyber-section">
            <div className="cyber-two-col">
              {portfolio.experience?.length > 0 && (
                <div>
                  <h3 className="cyber-col-title"><Briefcase size={16} /> Production Experience</h3>
                  <div className="cyber-timeline">
                    {portfolio.experience.map((exp) => (
                      <div key={exp.id} className="cyber-timeline-item">
                        <div className="cyber-timeline-dot"></div>
                        <h4 className="cyber-timeline-role">{exp.role}</h4>
                        <span className="cyber-timeline-company">{exp.company}</span>
                        <span className="cyber-timeline-date">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        {exp.description && <p className="cyber-timeline-desc">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolio.education?.length > 0 && (
                <div>
                  <h3 className="cyber-col-title"><GraduationCap size={16} /> Credentials &amp; Degrees</h3>
                  <div className="cyber-timeline">
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="cyber-timeline-item">
                        <div className="cyber-timeline-dot"></div>
                        <h4 className="cyber-timeline-role">{edu.degree}</h4>
                        <span className="cyber-timeline-company">{edu.institution}</span>
                        <span className="cyber-timeline-date">{edu.startDate} – {edu.endDate}</span>
                        {edu.description && <p className="cyber-timeline-desc">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Verified Certificates & Achievements */}
        <CertificatesSection portfolio={portfolio} />
      </div>
    </div>
  );
}
