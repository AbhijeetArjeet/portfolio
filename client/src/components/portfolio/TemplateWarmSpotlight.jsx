import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Flame,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function TemplateWarmSpotlight({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-warm-spotlight">
      {/* Background Radiant Spotlight */}
      <div className="spotlight-radial-glow"></div>

      <div className="spotlight-container">
        {/* Top Minimal Bar */}
        <div className="spotlight-top-bar">
          <div className="spotlight-brand">
            <span className="spotlight-dot"></span>
            <span>{portfolio.title || 'Portfolio'}</span>
          </div>
          {portfolio.location && (
            <div className="spotlight-location">
              <MapPin size={14} /> {portfolio.location}
            </div>
          )}
        </div>

        {/* Hero Section */}
        <header className="spotlight-hero">
          <div className="spotlight-hero-content">
            <div className="spotlight-badge">
              <Flame size={14} className="spotlight-badge-icon" />
              <span>Available for Creative Projects</span>
            </div>

            <h1 className="spotlight-headline">
              {portfolio.headline || 'Creative Director & Designer'}
            </h1>

            <p className="spotlight-statement">
              {portfolio.bio ||
                'Shaping experiences that make life simpler. Transforming complex engineering into effortless, human-centric design.'}
            </p>

            <div className="spotlight-hero-actions">
              {portfolio.contactEmail && (
                <a href={`mailto:${portfolio.contactEmail}`} className="spotlight-btn-primary">
                  Get in Touch <ArrowUpRight size={16} />
                </a>
              )}
              {portfolio.resumeUrl && (
                <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer" className="spotlight-btn-secondary">
                  View Resume
                </a>
              )}
              <div className="spotlight-social-links">
                {portfolio.githubUrl && (
                  <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="spotlight-social-btn" title="GitHub">
                    <Github size={18} />
                  </a>
                )}
                {portfolio.linkedinUrl && (
                  <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="spotlight-social-btn" title="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                )}
                {portfolio.websiteUrl && (
                  <a href={portfolio.websiteUrl} target="_blank" rel="noreferrer" className="spotlight-social-btn" title="Website">
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="spotlight-hero-visual">
            <div className="spotlight-portrait-wrap">
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600'}
                alt={portfolio.title}
                className="spotlight-portrait"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600';
                }}
              />
              <div className="spotlight-portrait-overlay"></div>
            </div>
          </div>
        </header>

        {/* Skills & Expertise */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="spotlight-section">
            <div className="spotlight-section-heading-wrap">
              <span className="spotlight-section-tag">Expertise</span>
              <h2 className="spotlight-section-title">Specialized Skills</h2>
            </div>
            <div className="spotlight-skills-grid">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="spotlight-skill-card">
                  <div className="spotlight-skill-top">
                    <span className="spotlight-skill-name">{skill.name}</span>
                    {skill.proficiency && (
                      <span className="spotlight-skill-val">{skill.proficiency}%</span>
                    )}
                  </div>
                  {skill.proficiency && (
                    <div className="spotlight-progress-bg">
                      <div
                        className="spotlight-progress-bar"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="spotlight-section">
            <div className="spotlight-section-heading-wrap">
              <span className="spotlight-section-tag">Case Studies</span>
              <h2 className="spotlight-section-title">Featured Works</h2>
            </div>
            <div className={layoutClass}>
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="spotlight-project-card portfolio-project-card">
                  {proj.imageUrl && (
                    <div className="spotlight-proj-thumb-wrap">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="spotlight-proj-thumb"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="spotlight-proj-details">
                    <h3 className="spotlight-proj-name">{proj.title}</h3>
                    <p className="spotlight-proj-desc">{proj.description}</p>
                    <div className="spotlight-tag-list">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="spotlight-tag">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="spotlight-proj-actions">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="spotlight-action-primary">
                          Launch <ArrowUpRight size={14} />
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="spotlight-action-ghost">
                          <Github size={14} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
          <section className="spotlight-section">
            <div className="spotlight-section-heading-wrap">
              <span className="spotlight-section-tag">Trajectory</span>
              <h2 className="spotlight-section-title">Career &amp; Education</h2>
            </div>
            <div className="spotlight-exp-container">
              {portfolio.experience?.length > 0 && (
                <div className="spotlight-exp-col">
                  <h3 className="spotlight-exp-heading"><Briefcase size={16} /> Experience</h3>
                  <div className="spotlight-timeline-list">
                    {portfolio.experience.map((exp) => (
                      <div key={exp.id} className="spotlight-timeline-card">
                        <div className="spotlight-card-header">
                          <span className="spotlight-role-title">{exp.role}</span>
                          <span className="spotlight-date-tag">
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="spotlight-company-name">{exp.company}</p>
                        {exp.description && <p className="spotlight-role-desc">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolio.education?.length > 0 && (
                <div className="spotlight-exp-col">
                  <h3 className="spotlight-exp-heading"><GraduationCap size={16} /> Education</h3>
                  <div className="spotlight-timeline-list">
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="spotlight-timeline-card">
                        <div className="spotlight-card-header">
                          <span className="spotlight-role-title">{edu.degree}</span>
                          <span className="spotlight-date-tag">
                            {edu.startDate} – {edu.endDate}
                          </span>
                        </div>
                        <p className="spotlight-company-name">{edu.institution}</p>
                        {edu.description && <p className="spotlight-role-desc">{edu.description}</p>}
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
