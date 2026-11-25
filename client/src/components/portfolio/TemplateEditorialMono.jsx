import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  ArrowDownRight,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function TemplateEditorialMono({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-editorial-mono">
      <div className="editorial-container">
        {/* Editorial Top Masthead */}
        <header className="editorial-masthead">
          <div className="editorial-issue-tag">VOL. 2026 // ISSUE 01</div>
          <div className="editorial-brand-name">{portfolio.title || 'PORTFOLIO'}</div>
          <div className="editorial-city">{portfolio.location || 'GLOBAL'}</div>
        </header>

        {/* Hero Section */}
        <section className="editorial-hero">
          <div className="editorial-hero-banner">
            <h1 className="editorial-hero-display">
              EXPLORE MY <br />
              <span className="editorial-outline-text">PORTFOLIO</span>
            </h1>
          </div>

          <div className="editorial-hero-grid">
            <div className="editorial-hero-media">
              <div className="editorial-portrait-frame">
                <img
                  src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'}
                  alt={portfolio.title}
                  className="editorial-portrait-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600';
                  }}
                />
              </div>
            </div>

            <div className="editorial-hero-content">
              <div className="editorial-section-tag">ABOUT / PHILOSOPHY</div>
              <h2 className="editorial-hero-role">{portfolio.headline || 'Independent Designer & Architect'}</h2>
              <p className="editorial-hero-bio">
                {portfolio.bio ||
                  'Committed to ruthless clarity, restrained aesthetics, and durable architectural integrity across digital surfaces.'}
              </p>

              <div className="editorial-hero-links">
                {portfolio.contactEmail && (
                  <a href={`mailto:${portfolio.contactEmail}`} className="editorial-btn-dark">
                    Contact Studio <ArrowDownRight size={15} />
                  </a>
                )}
                {portfolio.resumeUrl && (
                  <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer" className="editorial-btn-outline">
                    Curriculum Vitae
                  </a>
                )}
                {portfolio.githubUrl && (
                  <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="editorial-btn-outline">
                    <Github size={15} /> GitHub
                  </a>
                )}
                {portfolio.linkedinUrl && (
                  <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="editorial-btn-outline">
                    <Linkedin size={15} /> LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works Lookbook */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="editorial-section">
            <div className="editorial-section-head">
              <span className="editorial-head-tag">CATALOGUE</span>
              <h2 className="editorial-head-title">Selected Works</h2>
            </div>

            <div className={layoutClass}>
              {portfolio.projects.map((proj, idx) => (
                <article key={proj.id} className="editorial-proj-card portfolio-project-card">
                  <div className="editorial-proj-index">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  {proj.imageUrl && (
                    <div className="editorial-proj-img-wrap">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="editorial-proj-img"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="editorial-proj-body">
                    <h3 className="editorial-proj-title">{proj.title}</h3>
                    <p className="editorial-proj-desc">{proj.description}</p>
                    <div className="editorial-proj-tech">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="editorial-tech-tag">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="editorial-proj-actions">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="editorial-link-primary">
                          View Work <ExternalLink size={13} />
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="editorial-link-subtle">
                          <Github size={13} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Disciplines */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="editorial-section">
            <div className="editorial-section-head">
              <span className="editorial-head-tag">DISCIPLINES</span>
              <h2 className="editorial-head-title">Core Competencies</h2>
            </div>
            <div className="editorial-skills-grid">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="editorial-skill-row">
                  <span className="editorial-skill-title">{skill.name}</span>
                  <span className="editorial-skill-cat">{skill.category || 'General'}</span>
                  {skill.proficiency && (
                    <span className="editorial-skill-index">P.{skill.proficiency}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Chronology / Experience */}
        {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
          <section className="editorial-section">
            <div className="editorial-section-head">
              <span className="editorial-head-tag">RECORD</span>
              <h2 className="editorial-head-title">Chronology</h2>
            </div>

            <div className="editorial-two-col">
              {portfolio.experience?.length > 0 && (
                <div>
                  <h3 className="editorial-col-title"><Briefcase size={15} /> Professional Appointments</h3>
                  <div className="editorial-timeline">
                    {portfolio.experience.map((exp) => (
                      <div key={exp.id} className="editorial-timeline-item">
                        <div className="editorial-time-dates">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</div>
                        <h4 className="editorial-time-role">{exp.role}</h4>
                        <div className="editorial-time-company">{exp.company}</div>
                        {exp.description && <p className="editorial-time-desc">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolio.education?.length > 0 && (
                <div>
                  <h3 className="editorial-col-title"><GraduationCap size={15} /> Academic Background</h3>
                  <div className="editorial-timeline">
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="editorial-timeline-item">
                        <div className="editorial-time-dates">{edu.startDate} – {edu.endDate}</div>
                        <h4 className="editorial-time-role">{edu.degree}</h4>
                        <div className="editorial-time-company">{edu.institution}</div>
                        {edu.description && <p className="editorial-time-desc">{edu.description}</p>}
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
