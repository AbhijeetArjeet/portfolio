import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Sun,
  Smile,
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function TemplateWarmPlayful({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-warm-playful">
      <div className="playful-container">
        {/* Top Navbar */}
        <header className="playful-nav">
          <div className="playful-logo">
            <span className="playful-sun-icon"><Sun size={20} /></span>
            <span className="playful-logo-text">{portfolio.title}</span>
          </div>
          <div className="playful-nav-actions">
            {portfolio.location && (
              <span className="playful-loc-pill">
                <MapPin size={13} /> {portfolio.location}
              </span>
            )}
            {portfolio.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`} className="playful-btn-sayhi">
                Say Hello! <span>👋</span>
              </a>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="playful-hero">
          <div className="playful-hero-left">
            <div className="playful-greeting-chip">
              <Sparkles size={14} /> WELCOME TO MY CORNER
            </div>
            <h1 className="playful-hero-title">
              Hello, my name is <br />
              <span className="playful-highlight-text">{portfolio.title}</span>
            </h1>
            <p className="playful-hero-headline">
              {portfolio.headline || 'Product Designer & Frontend Creator'}
            </p>
            <p className="playful-hero-bio">
              {portfolio.bio ||
                'I design playful, delightful user interfaces and build friendly digital experiences that make people smile.'}
            </p>

            <div className="playful-hero-actions">
              {portfolio.contactEmail && (
                <a href={`mailto:${portfolio.contactEmail}`} className="playful-btn-primary">
                  Let's Work Together <ArrowRight size={16} />
                </a>
              )}
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="playful-btn-soft">
                  <Github size={16} /> GitHub
                </a>
              )}
              {portfolio.linkedinUrl && (
                <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="playful-btn-soft">
                  <Linkedin size={16} /> LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className="playful-hero-right">
            <div className="playful-sun-frame">
              <div className="playful-sun-backdrop"></div>
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600'}
                alt={portfolio.title}
                className="playful-avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600';
                }}
              />
              <div className="playful-floating-badge">
                <Smile size={16} /> <span>Open to Fun Projects</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="playful-section">
            <div className="playful-sec-head">
              <span className="playful-sec-pill">✨ Toolkit</span>
              <h2 className="playful-sec-title">What I Bring to the Table</h2>
            </div>
            <div className="playful-skills-grid">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="playful-skill-card">
                  <span className="playful-skill-title">{skill.name}</span>
                  {skill.proficiency && (
                    <span className="playful-skill-badge">{skill.proficiency}%</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="playful-section">
            <div className="playful-sec-head">
              <span className="playful-sec-pill">🎨 Portfolio</span>
              <h2 className="playful-sec-title">Recent Creations &amp; Goodies</h2>
            </div>

            <div className={layoutClass}>
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="playful-proj-card portfolio-project-card">
                  {proj.imageUrl && (
                    <div className="playful-proj-img-wrap">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="playful-proj-img"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="playful-proj-body">
                    <h3 className="playful-proj-title">{proj.title}</h3>
                    <p className="playful-proj-desc">{proj.description}</p>
                    <div className="playful-tech-tags">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="playful-tech-tag">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="playful-proj-links">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="playful-link-warm">
                          Live Demo <ExternalLink size={13} />
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="playful-link-subtle">
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

        {/* Experience & Education */}
        {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
          <section className="playful-section">
            <div className="playful-sec-head">
              <span className="playful-sec-pill">🌱 Growth</span>
              <h2 className="playful-sec-title">My Journey &amp; Milestones</h2>
            </div>

            <div className="playful-timeline-duo">
              {portfolio.experience?.length > 0 && (
                <div>
                  <h3 className="playful-col-title"><Briefcase size={16} /> Work Adventure</h3>
                  <div className="playful-timeline">
                    {portfolio.experience.map((exp) => (
                      <div key={exp.id} className="playful-timeline-card">
                        <span className="playful-time-pill">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                        <h4 className="playful-time-role">{exp.role}</h4>
                        <span className="playful-time-company">{exp.company}</span>
                        {exp.description && <p className="playful-time-desc">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolio.education?.length > 0 && (
                <div>
                  <h3 className="playful-col-title"><GraduationCap size={16} /> Learning Path</h3>
                  <div className="playful-timeline">
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="playful-timeline-card">
                        <span className="playful-time-pill">{edu.startDate} – {edu.endDate}</span>
                        <h4 className="playful-time-role">{edu.degree}</h4>
                        <span className="playful-time-company">{edu.institution}</span>
                        {edu.description && <p className="playful-time-desc">{edu.description}</p>}
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
