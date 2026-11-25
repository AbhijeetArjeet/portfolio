import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Terminal,
  Crosshair,
  Layers,
  ArrowRight,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function TemplateBrutalistTech({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-brutalist-tech">
      <div className="brutalist-container">
        {/* Top Blueprint Bar */}
        <div className="brutalist-top-bar">
          <div className="brutalist-coord">
            <Crosshair size={14} />
            <span>SPEC: 2026.REL &bull; DESIGN_DNA</span>
          </div>
          <div className="brutalist-geo">
            {portfolio.location ? (
              <span>LOC // {portfolio.location.toUpperCase()}</span>
            ) : (
              <span>NODE // GLOBAL</span>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <section className="brutalist-hero">
          <div className="brutalist-hero-meta">
            <span className="brutalist-eyebrow">[ TECH_ARCHITECT // CREATIVE ]</span>
            <h1 className="brutalist-title">{portfolio.title || 'MOHAMED RADY'}</h1>
            <p className="brutalist-role">{portfolio.headline || 'Senior Frontend Engineer &amp; UI Designer'}</p>
            <p className="brutalist-summary">
              {portfolio.bio ||
                'Obsessed with high-performance architectures, mathematical precision, and uncompromising aesthetics.'}
            </p>

            <div className="brutalist-hero-btns">
              {portfolio.contactEmail && (
                <a href={`mailto:${portfolio.contactEmail}`} className="brutalist-btn-yellow">
                  CONNECT_NOW <ArrowRight size={15} />
                </a>
              )}
              {portfolio.githubUrl && (
                <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="brutalist-btn-raw">
                  <Github size={15} /> GITHUB
                </a>
              )}
              {portfolio.linkedinUrl && (
                <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="brutalist-btn-raw">
                  <Linkedin size={15} /> LINKEDIN
                </a>
              )}
            </div>
          </div>

          <div className="brutalist-hero-visual">
            <div className="brutalist-portrait-box">
              <div className="brutalist-corner brutalist-tl"></div>
              <div className="brutalist-corner brutalist-tr"></div>
              <div className="brutalist-corner brutalist-bl"></div>
              <div className="brutalist-corner brutalist-br"></div>
              <img
                src={portfolio.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600'}
                alt={portfolio.title}
                className="brutalist-portrait-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600';
                }}
              />
              <div className="brutalist-stamp">LIVE_STATUS: ENGAGED</div>
            </div>
          </div>
        </section>

        {/* Technical DNA / Skills */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="brutalist-section">
            <div className="brutalist-section-head">
              <span className="brutalist-section-num">01 //</span>
              <h2>TECHNICAL_DNA</h2>
            </div>
            <div className="brutalist-skills-grid">
              {portfolio.skills.map((skill) => (
                <div key={skill.id} className="brutalist-skill-card">
                  <div className="brutalist-skill-meta">
                    <span className="brutalist-skill-name">{skill.name}</span>
                    {skill.proficiency && (
                      <span className="brutalist-skill-val">{skill.proficiency}%</span>
                    )}
                  </div>
                  {skill.proficiency && (
                    <div className="brutalist-bar-outer">
                      <div className="brutalist-bar-inner" style={{ width: `${skill.proficiency}%` }}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selected Systems / Projects */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <section className="brutalist-section">
            <div className="brutalist-section-head">
              <span className="brutalist-section-num">02 //</span>
              <h2>PROJECT_MANIFEST</h2>
            </div>
            <div className={layoutClass}>
              {portfolio.projects.map((proj) => (
                <div key={proj.id} className="brutalist-project-card portfolio-project-card">
                  {proj.imageUrl && (
                    <div className="brutalist-proj-img-wrap">
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="brutalist-proj-img"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="brutalist-proj-body">
                    <h3 className="brutalist-proj-title">{proj.title}</h3>
                    <p className="brutalist-proj-desc">{proj.description}</p>
                    <div className="brutalist-tech-tags">
                      {proj.technologies.split(',').map((tech, i) => (
                        <span key={i} className="brutalist-tech-tag">[{tech.trim()}]</span>
                      ))}
                    </div>
                    <div className="brutalist-proj-actions">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="brutalist-action-yellow">
                          LIVE_SYSTEM <ExternalLink size={13} />
                        </a>
                      )}
                      {proj.repositoryUrl && (
                        <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="brutalist-action-outline">
                          <Github size={13} /> REPO
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Career Timeline */}
        {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
          <section className="brutalist-section">
            <div className="brutalist-section-head">
              <span className="brutalist-section-num">03 //</span>
              <h2>DEPLOYMENT_HISTORY</h2>
            </div>

            <div className="brutalist-split-timeline">
              {portfolio.experience?.length > 0 && (
                <div>
                  <h3 className="brutalist-sub-head"><Briefcase size={16} /> COMMERCIAL_TENURE</h3>
                  <div className="brutalist-records">
                    {portfolio.experience.map((exp) => (
                      <div key={exp.id} className="brutalist-record-card">
                        <span className="brutalist-rec-period">
                          {exp.startDate} – {exp.isCurrent ? 'PRESENT' : exp.endDate}
                        </span>
                        <h4 className="brutalist-rec-title">{exp.role}</h4>
                        <div className="brutalist-rec-org">{exp.company}</div>
                        {exp.description && <p className="brutalist-rec-desc">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portfolio.education?.length > 0 && (
                <div>
                  <h3 className="brutalist-sub-head"><GraduationCap size={16} /> ACCREDITATION</h3>
                  <div className="brutalist-records">
                    {portfolio.education.map((edu) => (
                      <div key={edu.id} className="brutalist-record-card">
                        <span className="brutalist-rec-period">{edu.startDate} – {edu.endDate}</span>
                        <h4 className="brutalist-rec-title">{edu.degree}</h4>
                        <div className="brutalist-rec-org">{edu.institution}</div>
                        {edu.description && <p className="brutalist-rec-desc">{edu.description}</p>}
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
