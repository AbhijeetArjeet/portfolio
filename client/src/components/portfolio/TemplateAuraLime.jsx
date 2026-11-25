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
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function TemplateAuraLime({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  const defaultClients = ['FocalPoint', 'Screentime', 'Segment', 'Shutterframe', 'Lightspeed', 'Masterme'];

  return (
    <div className="tpl-aura-lime">
      {/* Top Banner / Award Badge */}
      <div className="aura-award-bar">
        <div className="aura-award-badge">
          <Award size={16} className="aura-award-icon" />
          <span>Google Website Of The Day 2025</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="aura-hero">
        <div className="aura-hero-glow"></div>

        <div className="aura-hero-content">
          <div className="aura-hero-headings">
            <h1 className="aura-title">Hi I'm {portfolio.title || 'Elian'}</h1>
            <p className="aura-headline">{portfolio.headline || 'Product Designer'}</p>
          </div>

          <div className="aura-hero-center">
            {/* Left Status Badge */}
            <div className="aura-status-badge">
              <span className="aura-pulse-dot"></span>
              <span>Available for new opportunities</span>
            </div>

            {/* Central Portrait with Glow */}
            <div className="aura-avatar-wrapper">
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'}
                alt={portfolio.title}
                className="aura-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600';
                }}
              />
            </div>

            {/* Right Intro Note */}
            <div className="aura-hero-intro">
              <p>
                {portfolio.bio
                  ? portfolio.bio.slice(0, 160) + (portfolio.bio.length > 160 ? '...' : '')
                  : 'Passionate about creating intuitive digital experiences that connect users with high value.'}
              </p>
            </div>
          </div>

          {/* Hero Bottom Actions & Trust Indicator */}
          <div className="aura-hero-bottom">
            <div className="aura-trust-block">
              <div className="aura-avatar-group">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Client 1" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Client 2" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Client 3" />
              </div>
              <p className="aura-trust-text">
                Trusted by over <strong>1,200+ clients</strong> across residential &amp; digital projects.
              </p>
            </div>

            <div className="aura-hero-buttons">
              {portfolio.contactEmail && (
                <a href={`mailto:${portfolio.contactEmail}`} className="aura-btn-primary">
                  Get In Touch <ArrowRight size={16} />
                </a>
              )}
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="aura-btn-outline">
                  <Github size={16} /> GitHub
                </a>
              )}
              {portfolio.linkedinUrl && (
                <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="aura-btn-outline">
                  <Linkedin size={16} /> LinkedIn
                </a>
              )}
            </div>

            <SocialAndResumeBar portfolio={portfolio} />
          </div>
        </div>

        {/* Client Brands Ticker */}
        <div className="aura-ticker-container">
          <div className="aura-ticker">
            {defaultClients.map((client, i) => (
              <span key={i} className="aura-ticker-item">
                <Sparkles size={14} className="aura-ticker-icon" /> {client}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* About & Bio Section */}
      {portfolio.bio && (
        <section className="aura-section aura-about-section">
          <div className="aura-section-header">
            <span className="aura-section-pill">About Me</span>
            <h2 className="aura-section-heading">Design Philosophy &amp; Vision</h2>
          </div>
          <div className="aura-about-content">
            <p>{portfolio.bio}</p>
            {portfolio.location && (
              <div className="aura-location-tag">
                <MapPin size={16} /> Based in {portfolio.location}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section className="aura-section">
          <div className="aura-section-header">
            <span className="aura-section-pill">Portfolio Showcase</span>
            <h2 className="aura-section-heading">Selected Creations</h2>
          </div>

          <div className={layoutClass}>
            {portfolio.projects.map((proj) => (
              <div key={proj.id} className="aura-project-card portfolio-project-card">
                {proj.imageUrl && (
                  <div className="aura-project-img-wrapper">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="aura-project-img"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div className="aura-project-body">
                  <h3 className="aura-project-title">{proj.title}</h3>
                  <p className="aura-project-desc">{proj.description}</p>
                  <div className="aura-tech-tags">
                    {proj.technologies.split(',').map((tech, i) => (
                      <span key={i} className="aura-tech-tag">{tech.trim()}</span>
                    ))}
                  </div>
                  <div className="aura-project-links">
                    {proj.demoUrl && (
                      <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="aura-btn-link">
                        Live Demo <ExternalLink size={13} />
                      </a>
                    )}
                    {proj.repositoryUrl && (
                      <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="aura-btn-subtle">
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

      {/* Skills Matrix */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section className="aura-section">
          <div className="aura-section-header">
            <span className="aura-section-pill">Capabilities</span>
            <h2 className="aura-section-heading">Core Skills &amp; Stack</h2>
          </div>
          <div className="aura-skills-grid">
            {portfolio.skills.map((skill) => (
              <div key={skill.id} className="aura-skill-badge">
                <CheckCircle size={15} className="aura-skill-check" />
                <span className="aura-skill-name">{skill.name}</span>
                {skill.proficiency && (
                  <span className="aura-skill-pct">{skill.proficiency}%</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience & Education */}
      {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
        <section className="aura-section">
          <div className="aura-timeline-grid">
            {portfolio.experience?.length > 0 && (
              <div>
                <div className="aura-section-header">
                  <span className="aura-section-pill"><Briefcase size={13} /> Journey</span>
                  <h3 className="aura-timeline-title">Work Experience</h3>
                </div>
                <div className="aura-timeline-list">
                  {portfolio.experience.map((exp) => (
                    <div key={exp.id} className="aura-timeline-item">
                      <div className="aura-timeline-point"></div>
                      <h4 className="aura-timeline-role">{exp.role}</h4>
                      <p className="aura-timeline-company">{exp.company}</p>
                      <span className="aura-timeline-date">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                      {exp.description && <p className="aura-timeline-desc">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {portfolio.education?.length > 0 && (
              <div>
                <div className="aura-section-header">
                  <span className="aura-section-pill"><GraduationCap size={13} /> Academics</span>
                  <h3 className="aura-timeline-title">Education</h3>
                </div>
                <div className="aura-timeline-list">
                  {portfolio.education.map((edu) => (
                    <div key={edu.id} className="aura-timeline-item">
                      <div className="aura-timeline-point"></div>
                      <h4 className="aura-timeline-role">{edu.degree}</h4>
                      <p className="aura-timeline-company">{edu.institution}</p>
                      <span className="aura-timeline-date">{edu.startDate} – {edu.endDate}</span>
                      {edu.description && <p className="aura-timeline-desc">{edu.description}</p>}
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
  );
}
