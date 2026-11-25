import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowUpRight,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function TemplateGlassSlate({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-glass-slate">
      {/* Ambient background glows */}
      <div className="glass-ambient-purple"></div>
      <div className="glass-ambient-cyan"></div>

      <div className="glass-container">
        {/* Top Navbar */}
        <header className="glass-nav">
          <div className="glass-logo">
            <span className="glass-logo-badge">
              <Sparkles size={16} />
            </span>
            <span className="glass-logo-title">{portfolio.title}</span>
          </div>

          <div className="glass-nav-actions">
            {portfolio.location && (
              <span className="glass-loc-badge">
                <MapPin size={13} /> {portfolio.location}
              </span>
            )}
            {portfolio.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`} className="glass-btn-contact">
                Get In Touch <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="glass-hero">
          <div className="glass-hero-left">
            <div className="glass-pill-tag">
              <Layers size={14} /> IMMERSIVE DIGITAL CRAFT
            </div>
            <h1 className="glass-hero-title">
              Visual Designer &amp; <br />
              <span className="glass-glow-text">{portfolio.title}</span>
            </h1>
            <p className="glass-hero-sub">
              {portfolio.headline || 'Product Designer & Design System Specialist'}
            </p>
            <p className="glass-hero-bio">
              {portfolio.bio ||
                'Designing high-fidelity, interactive digital interfaces at the intersection of modern aesthetics, design systems, and frontend engineering.'}
            </p>

            <div className="glass-hero-actions">
              {portfolio.contactEmail && (
                <a href={`mailto:${portfolio.contactEmail}`} className="glass-btn-primary">
                  Start Project <ArrowUpRight size={15} />
                </a>
              )}
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="glass-btn-ghost">
                  <Github size={15} /> GitHub
                </a>
              )}
              {portfolio.linkedinUrl && (
                <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="glass-btn-ghost">
                  <Linkedin size={15} /> LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className="glass-hero-right">
            <div className="glass-card-frame">
              <div className="glass-frame-backdrop"></div>
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'}
                alt={portfolio.title}
                className="glass-avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600';
                }}
              />
              <div className="glass-floating-pill">
                <Sparkles size={14} className="glass-sparkle-icon" />
                <span>Crafting Next-Gen Interfaces</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="glass-section">
            <div className="glass-sec-head">
              <span className="glass-badge-pill">COMPETENCIES</span>
              <h2 className="glass-sec-title">Skills &amp; Technologies</h2>
            </div>
            <div className="glass-skills-grid">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="glass-skill-card">
                  <div className="glass-skill-header">
                    <span className="glass-skill-title">{skill.name}</span>
                    {skill.proficiency && (
                      <span className="glass-skill-pct">{skill.proficiency}%</span>
                    )}
                  </div>
                  {skill.proficiency && (
                    <div className="glass-bar-track">
                      <div className="glass-bar-fill" style={{ width: `${skill.proficiency}%` }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="glass-section">
            <div className="glass-sec-head">
              <span className="glass-badge-pill">PORTFOLIO</span>
              <h2 className="glass-sec-title">Selected Projects</h2>
            </div>

            <div className={layoutClass}>
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="glass-proj-card portfolio-project-card">
                  {proj.imageUrl && (
                    <div className="glass-proj-img-wrap">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="glass-proj-img"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="glass-proj-body">
                    <h3 className="glass-proj-title">{proj.title}</h3>
                    <p className="glass-proj-desc">{proj.description}</p>
                    <div className="glass-tech-tags">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="glass-tech-tag">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="glass-proj-links">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="glass-link-primary">
                          Preview <ExternalLink size={13} />
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="glass-link-ghost">
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

        {/* Experience & Education */}
        {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
          <section className="glass-section">
            <div className="glass-sec-head">
              <span className="glass-badge-pill">TRAJECTORY</span>
              <h2 className="glass-sec-title">Experience &amp; Education</h2>
            </div>

            <div className="glass-duo-timeline">
              {portfolio.experience?.length > 0 && (
                <div>
                  <h3 className="glass-timeline-head"><Briefcase size={16} /> Work History</h3>
                  <div className="glass-timeline-list">
                    {portfolio.experience.map((exp) => (
                      <div key={exp.id} className="glass-timeline-card">
                        <span className="glass-time-date">
                          {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                        </span>
                        <h4 className="glass-time-role">{exp.role}</h4>
                        <span className="glass-time-company">{exp.company}</span>
                        {exp.description && <p className="glass-time-desc">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolio.education?.length > 0 && (
                <div>
                  <h3 className="glass-timeline-head"><GraduationCap size={16} /> Academics</h3>
                  <div className="glass-timeline-list">
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="glass-timeline-card">
                        <span className="glass-time-date">{edu.startDate} – {edu.endDate}</span>
                        <h4 className="glass-time-role">{edu.degree}</h4>
                        <span className="glass-time-company">{edu.institution}</span>
                        {edu.description && <p className="glass-time-desc">{edu.description}</p>}
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
