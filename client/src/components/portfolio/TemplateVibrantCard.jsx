import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Layers,
  Heart
} from 'lucide-react';

export default function TemplateVibrantCard({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';
  const firstName = portfolio.title ? portfolio.title.split(' ')[0] : 'Nomi';

  return (
    <div className="tpl-vibrant-card">
      {/* Ambient background glow */}
      <div className="vibrant-bg-glow"></div>

      <div className="vibrant-container">
        {/* Floating In-App Navigation Bar */}
        <nav className="vibrant-nav">
          <div className="vibrant-brand">
            <span className="vibrant-brand-icon">
              {portfolio.title ? portfolio.title.charAt(0) : 'P'}
            </span>
            <span className="vibrant-brand-name">Portfolio</span>
          </div>
          <div className="vibrant-nav-links">
            <a href="#about" className="vibrant-nav-link">About</a>
            <a href="#skills" className="vibrant-nav-link">Skills</a>
            <a href="#projects" className="vibrant-nav-link">Projects</a>
            <a href="#experience" className="vibrant-nav-link">Experience</a>
          </div>
          {portfolio.contactEmail && (
            <a href={`mailto:${portfolio.contactEmail}`} className="vibrant-btn-contact">
              Contact
            </a>
          )}
        </nav>

        {/* Hero Section */}
        <header className="vibrant-hero" id="about">
          <div className="vibrant-hero-text">
            {/* Floating Persona Badge */}
            <div className="vibrant-badge-float">
              <span>{firstName} Here</span>
            </div>

            <h1 className="vibrant-hero-title">
              Hello, I'm <br />
              <span className="vibrant-gradient-text">{portfolio.title || 'Rana Noman'}</span>
            </h1>

            <p className="vibrant-hero-subtitle">
              {portfolio.headline || 'Freelance UI/UX Designer & Developer'}
            </p>

            <p className="vibrant-hero-bio">
              {portfolio.bio ||
                'I strive to build immersive and beautiful web applications through carefully crafted code and user-centric design.'}
            </p>

            <div className="vibrant-hero-actions">
              {portfolio.contactEmail ? (
                <a href={`mailto:${portfolio.contactEmail}`} className="vibrant-btn-primary">
                  Say Hello! <ArrowRight size={15} />
                </a>
              ) : (
                <span className="vibrant-btn-primary">Get in Touch</span>
              )}
              {portfolio.resumeUrl && (
                <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer" className="vibrant-btn-secondary">
                  Resume
                </a>
              )}
            </div>

            {/* Social links */}
            <div className="vibrant-social-row">
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="vibrant-social-link" title="GitHub">
                  <Github size={17} />
                </a>
              )}
              {portfolio.linkedinUrl && (
                <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="vibrant-social-link" title="LinkedIn">
                  <Linkedin size={17} />
                </a>
              )}
              {portfolio.websiteUrl && (
                <a href={portfolio.websiteUrl} target="_blank" rel="noreferrer" className="vibrant-social-link" title="Website">
                  <Globe size={17} />
                </a>
              )}
              {portfolio.location && (
                <span className="vibrant-location">
                  <MapPin size={15} /> {portfolio.location}
                </span>
              )}
            </div>
          </div>

          {/* Framed Right Portrait */}
          <div className="vibrant-hero-image-wrap">
            <div className="vibrant-image-frame">
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'}
                alt={portfolio.title}
                className="vibrant-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600';
                }}
              />
            </div>
          </div>
        </header>

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="vibrant-section" id="skills">
            <div className="vibrant-section-header">
              <span className="vibrant-section-pill">Competencies</span>
              <h2 className="vibrant-section-title">My Capabilities</h2>
            </div>
            <div className="vibrant-skills-cloud">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="vibrant-skill-chip">
                  <span className="vibrant-skill-dot"></span>
                  <span className="vibrant-skill-text">{skill.name}</span>
                  {skill.proficiency && (
                    <span className="vibrant-skill-lvl">{skill.proficiency}%</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="vibrant-section" id="projects">
            <div className="vibrant-section-header">
              <span className="vibrant-section-pill">Selected Works</span>
              <h2 className="vibrant-section-title">Featured Projects</h2>
            </div>
            <div className={layoutClass}>
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="vibrant-project-card portfolio-project-card">
                  {proj.imageUrl && (
                    <div className="vibrant-proj-img-wrap">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="vibrant-proj-img"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="vibrant-proj-content">
                    <h3 className="vibrant-proj-title">{proj.title}</h3>
                    <p className="vibrant-proj-desc">{proj.description}</p>
                    <div className="vibrant-proj-tags">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="vibrant-proj-tag">{tech.trim()}</span>
                      ))}
                    </div>
                    <div className="vibrant-proj-links">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="vibrant-link-btn">
                          Visit Project <ExternalLink size={13} />
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="vibrant-link-subtle">
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
          <section className="vibrant-section" id="experience">
            <div className="vibrant-timeline-two-col">
              {portfolio.experience?.length > 0 && (
                <div className="vibrant-col">
                  <h3 className="vibrant-subheading">
                    <Briefcase size={18} className="vibrant-icon-accent" /> Work History
                  </h3>
                  <div className="vibrant-timeline">
                    {portfolio.experience.map((exp) => (
                      <div key={exp.id} className="vibrant-timeline-item">
                        <div className="vibrant-timeline-dot"></div>
                        <h4 className="vibrant-timeline-role">{exp.role}</h4>
                        <div className="vibrant-timeline-meta">
                          <strong>{exp.company}</strong> &bull; {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                        </div>
                        {exp.description && <p className="vibrant-timeline-desc">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolio.education?.length > 0 && (
                <div className="vibrant-col">
                  <h3 className="vibrant-subheading">
                    <GraduationCap size={18} className="vibrant-icon-accent" /> Education
                  </h3>
                  <div className="vibrant-timeline">
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="vibrant-timeline-item">
                        <div className="vibrant-timeline-dot"></div>
                        <h4 className="vibrant-timeline-role">{edu.degree}</h4>
                        <div className="vibrant-timeline-meta">
                          <strong>{edu.institution}</strong> &bull; {edu.startDate} – {edu.endDate}
                        </div>
                        {edu.description && <p className="vibrant-timeline-desc">{edu.description}</p>}
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
