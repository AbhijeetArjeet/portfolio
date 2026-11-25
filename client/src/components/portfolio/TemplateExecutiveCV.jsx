import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function TemplateExecutiveCV({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-executive-cv">
      <div className="exec-container">
        {/* Top Header Banner */}
        <header className="exec-header">
          <div className="exec-status">CONFIDENTIAL CURRICULUM VITAE &bull; PORTFOLIO ARCHIVE</div>
          <div className="exec-header-links">
            {portfolio.location && (
              <span className="exec-loc-chip">
                <MapPin size={13} /> {portfolio.location}
              </span>
            )}
            {portfolio.resumeUrl && (
              <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer" className="exec-btn-resume">
                <FileText size={14} /> Resume PDF
              </a>
            )}
          </div>
        </header>

        {/* Two-Column Dossier Layout */}
        <div className="exec-grid">
          {/* Left Sticky Profile Column */}
          <aside className="exec-sidebar">
            <div className="exec-photo-card">
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600'}
                alt={portfolio.title}
                className="exec-photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600';
                }}
              />
              <div className="exec-profile-title">
                <h2>{portfolio.title}</h2>
                <p className="exec-profile-sub">{portfolio.headline || 'Chief Technology Officer / Senior Leader'}</p>
              </div>
            </div>

            {/* Quick Contact & Links */}
            <div className="exec-info-card">
              <h3 className="exec-info-heading">Executive Contact</h3>
              <ul className="exec-contact-list">
                {portfolio.contactEmail && (
                  <li>
                    <Mail size={14} className="exec-icon-green" />
                    <a href={`mailto:${portfolio.contactEmail}`}>{portfolio.contactEmail}</a>
                  </li>
                )}
                {portfolio.location && (
                  <li>
                    <MapPin size={14} className="exec-icon-green" />
                    <span>{portfolio.location}</span>
                  </li>
                )}
                {portfolio.websiteUrl && (
                  <li>
                    <Globe size={14} className="exec-icon-green" />
                    <a href={portfolio.websiteUrl} target="_blank" rel="noreferrer">Website</a>
                  </li>
                )}
                {portfolio.linkedinUrl && (
                  <li>
                    <Linkedin size={14} className="exec-icon-green" />
                    <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn Profile</a>
                  </li>
                )}
                {portfolio.githubUrl && (
                  <li>
                    <Github size={14} className="exec-icon-green" />
                    <a href={portfolio.githubUrl} target="_blank" rel="noreferrer">GitHub Repository</a>
                  </li>
                )}
              </ul>
            </div>

            {/* Core Competencies in Sidebar */}
            {portfolio.skills && portfolio.skills.length > 0 && (
              <div className="exec-info-card">
                <h3 className="exec-info-heading">Competencies</h3>
                <div className="exec-skills-list">
                  {portfolio.skills.map((skill) => (
                    <div key={skill.id} className="exec-skill-entry">
                      <CheckCircle2 size={13} className="exec-icon-green" />
                      <span className="exec-skill-name">{skill.name}</span>
                      {skill.proficiency && (
                        <span className="exec-skill-pct">{skill.proficiency}%</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Right Main Content Pane */}
          <main className="exec-main">
            {/* Executive Summary */}
            <section className="exec-section">
              <div className="exec-sec-title-bar">
                <span className="exec-sec-tag">EXECUTIVE PROFILE</span>
                <h2>Summary &amp; Leadership Philosophy</h2>
              </div>
              <p className="exec-bio-text">
                {portfolio.bio ||
                  'Accomplished leader and engineer with a track record of driving scalable system architectures, building high-performing cross-functional teams, and delivering mission-critical applications on time and with architectural elegance.'}
              </p>
            </section>

            {/* Career History */}
            {portfolio.experience && portfolio.experience.length > 0 && (
              <section className="exec-section">
                <div className="exec-sec-title-bar">
                  <span className="exec-sec-tag">CHRONOLOGY</span>
                  <h2>Professional Experience</h2>
                </div>
                <div className="exec-timeline">
                  {portfolio.experience.map((exp) => (
                    <div key={exp.id} className="exec-timeline-node">
                      <div className="exec-node-marker"></div>
                      <div className="exec-node-header">
                        <h3 className="exec-node-role">{exp.role}</h3>
                        <span className="exec-node-dates">
                          {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div className="exec-node-company">{exp.company}</div>
                      {exp.description && <p className="exec-node-desc">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Portfolio / Key Projects */}
            {portfolio.projects && portfolio.projects.length > 0 && (
              <section className="exec-section">
                <div className="exec-sec-title-bar">
                  <span className="exec-sec-tag">DELIVERABLES</span>
                  <h2>Key Projects &amp; Initiatives</h2>
                </div>
                <div className={layoutClass}>
                  {portfolio.projects.map((proj) => (
                    <div key={proj.id} className="exec-project-card portfolio-project-card">
                      {proj.imageUrl && (
                        <div className="exec-project-img-box">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="exec-project-img"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      )}
                      <div className="exec-project-body">
                        <h4 className="exec-project-title">{proj.title}</h4>
                        <p className="exec-project-desc">{proj.description}</p>
                        <div className="exec-tech-chips">
                          {proj.technologies.split(',').map((tech, i) => (
                            <span key={i} className="exec-tech-chip">{tech.trim()}</span>
                          ))}
                        </div>
                        <div className="exec-project-links">
                          {proj.demoUrl && (
                            <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="exec-link-primary">
                              Live Showcase <ExternalLink size={13} />
                            </a>
                          )}
                          {proj.repositoryUrl && (
                            <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="exec-link-secondary">
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

            {/* Education & Credentials */}
            {portfolio.education && portfolio.education.length > 0 && (
              <section className="exec-section">
                <div className="exec-sec-title-bar">
                  <span className="exec-sec-tag">ACADEMIA</span>
                  <h2>Education &amp; Credentials</h2>
                </div>
                <div className="exec-timeline">
                  {portfolio.education.map((edu) => (
                    <div key={edu.id} className="exec-timeline-node">
                      <div className="exec-node-marker"></div>
                      <div className="exec-node-header">
                        <h3 className="exec-node-role">{edu.degree}</h3>
                        <span className="exec-node-dates">{edu.startDate} – {edu.endDate}</span>
                      </div>
                      <div className="exec-node-company">{edu.institution}</div>
                      {edu.description && <p className="exec-node-desc">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
