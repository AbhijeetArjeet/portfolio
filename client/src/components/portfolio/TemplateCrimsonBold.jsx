import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Flame,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Layers,
  Zap
} from 'lucide-react';

export default function TemplateCrimsonBold({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-crimson-bold">
      <div className="crimson-container">
        {/* Top Header */}
        <header className="crimson-header">
          <div className="crimson-brand">
            <span className="crimson-brand-tag">PORTFOLIO</span>
            <span className="crimson-brand-name">{portfolio.title}</span>
          </div>
          <div className="crimson-header-actions">
            {portfolio.location && (
              <span className="crimson-loc-badge">
                <MapPin size={13} /> {portfolio.location}
              </span>
            )}
            {portfolio.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`} className="crimson-btn-accent">
                Let's Connect
              </a>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="crimson-hero">
          <div className="crimson-hero-grid">
            <div className="crimson-hero-left">
              <span className="crimson-eyebrow">HELLO I AM</span>
              <h1 className="crimson-name">{portfolio.title}</h1>
              <div className="crimson-headline-badge">
                <Zap size={14} />
                <span>{portfolio.headline || 'Senior UI/UX & Interaction Designer'}</span>
              </div>
              <p className="crimson-bio">
                {portfolio.bio ||
                  'Driven to build high-converting interfaces, bold interactive experiences, and meaningful user connections.'}
              </p>

              <div className="crimson-btn-group">
                {portfolio.contactEmail && (
                  <a href={`mailto:${portfolio.contactEmail}`} className="crimson-btn-primary">
                    Hire Me Now <ArrowRight size={15} />
                  </a>
                )}
                {portfolio.githubUrl && (
                  <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="crimson-btn-dark">
                    <Github size={15} /> GitHub
                  </a>
                )}
                {portfolio.linkedinUrl && (
                  <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="crimson-btn-dark">
                    <Linkedin size={15} /> LinkedIn
                  </a>
                )}
              </div>
            </div>

            <div className="crimson-hero-right">
              <div className="crimson-portrait-frame">
                <img
                  src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'}
                  alt={portfolio.title}
                  className="crimson-portrait-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600';
                  }}
                />
              </div>

              {/* Stat Badges Float */}
              <div className="crimson-stat-strip">
                <div className="crimson-stat-item">
                  <span className="crimson-stat-num">10k+</span>
                  <span className="crimson-stat-label">Hours Coded</span>
                </div>
                <div className="crimson-stat-item">
                  <span className="crimson-stat-num">55k</span>
                  <span className="crimson-stat-label">Users Impacted</span>
                </div>
                <div className="crimson-stat-item">
                  <span className="crimson-stat-num">99+</span>
                  <span className="crimson-stat-label">Projects Completed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="crimson-section">
            <div className="crimson-section-title">
              <span className="crimson-section-num">01</span>
              <h2>Tech Skills &amp; Superpowers</h2>
            </div>
            <div className="crimson-skills-grid">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="crimson-skill-pill">
                  <span className="crimson-skill-name">{skill.name}</span>
                  {skill.proficiency && (
                    <span className="crimson-skill-bar-num">{skill.proficiency}%</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="crimson-section">
            <div className="crimson-section-title">
              <span className="crimson-section-num">02</span>
              <h2>Featured Case Studies</h2>
            </div>
            <div className={layoutClass}>
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="crimson-proj-card portfolio-project-card">
                  {proj.imageUrl && (
                    <div className="crimson-proj-media">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="crimson-proj-body">
                    <h3 className="crimson-proj-title">{proj.title}</h3>
                    <p className="crimson-proj-desc">{proj.description}</p>
                    <div className="crimson-tech-row">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="crimson-tech-tag">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="crimson-proj-links">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="crimson-link-action">
                          Live Demo <ExternalLink size={13} />
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="crimson-link-code">
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

        {/* Experience & Education */}
        {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
          <section className="crimson-section">
            <div className="crimson-section-title">
              <span className="crimson-section-num">03</span>
              <h2>History &amp; Experience</h2>
            </div>

            <div className="crimson-timeline-duo">
              {portfolio.experience?.length > 0 && (
                <div>
                  <h3 className="crimson-col-head"><Briefcase size={16} /> Work Record</h3>
                  <div className="crimson-timeline">
                    {portfolio.experience.map((exp) => (
                      <div key={exp.id} className="crimson-timeline-box">
                        <span className="crimson-box-date">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        <h4 className="crimson-box-role">{exp.role}</h4>
                        <span className="crimson-box-company">{exp.company}</span>
                        {exp.description && <p className="crimson-box-desc">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolio.education?.length > 0 && (
                <div>
                  <h3 className="crimson-col-head"><GraduationCap size={16} /> Academics</h3>
                  <div className="crimson-timeline">
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="crimson-timeline-box">
                        <span className="crimson-box-date">{edu.startDate} – {edu.endDate}</span>
                        <h4 className="crimson-box-role">{edu.degree}</h4>
                        <span className="crimson-box-company">{edu.institution}</span>
                        {edu.description && <p className="crimson-box-desc">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
