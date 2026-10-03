import React from 'react';
import {
  Github,
  Linkedin,
  Globe,
  Terminal,
  ExternalLink,
  Code2,
  GitBranch,
  Star,
  MapPin,
  Mail,
  Cpu
} from 'lucide-react';

export default function TemplateDeveloper({ portfolio }) {
  const layoutClass = portfolio.layoutType === 'flexbox' ? 'project-layout-flexbox' : 'project-layout-grid';

  return (
    <div className="tpl-developer">
      {/* Dev Status Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div className="dev-header-badge">
          <span className="dev-pulse-dot" />
          <span>STATUS: OPEN FOR NEW OPPORTUNITIES</span>
        </div>
        <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          ENV: PRODUCTION // DEV_SYS
        </div>
      </div>

      {/* Hero Section */}
      <div className="dev-hero-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            {portfolio.avatarUrl && (
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.title}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '2px solid var(--primary)'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://avatars.githubusercontent.com/u/213563458?v=4';
                }}
              />
            )}
            <div>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {portfolio.title}
              </h1>
              {portfolio.headline && (
                <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.05rem', marginTop: '0.25rem' }}>
                  {portfolio.headline}
                </div>
              )}
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {portfolio.bio || 'Software and systems engineer focused on high-throughput applications, algorithmic data processing, and modern full-stack development.'}
          </p>

          {/* Location and email */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {portfolio.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} /> {portfolio.location}
              </span>
            )}
            {portfolio.contactEmail && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={14} /> {portfolio.contactEmail}
              </span>
            )}
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {portfolio.githubUrl && (
              <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                <Github size={15} /> GitHub Profile
              </a>
            )}
            {portfolio.linkedinUrl && (
              <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <Linkedin size={15} /> LinkedIn
              </a>
            )}
            {portfolio.websiteUrl && (
              <a href={portfolio.websiteUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <Globe size={15} /> Live Portal
              </a>
            )}
          </div>
        </div>

        {/* Developer Terminal Card */}
        <div className="terminal-window">
          <div className="terminal-bar">
            <span className="term-btn term-btn-red"></span>
            <span className="term-btn term-btn-yellow"></span>
            <span className="term-btn term-btn-green"></span>
            <span style={{ fontSize: '0.78rem', color: '#8b949e', fontFamily: 'var(--font-mono)', marginLeft: '0.5rem' }}>
              bash ~ developer-spec.sh
            </span>
          </div>
          <div className="terminal-body">
            <p><span className="term-prompt">$</span> curl -s https://api.github.com/users/{portfolio.slug}</p>
            <p style={{ color: '#8b949e', margin: '4px 0' }}>// Parsing core attributes...</p>
            <p><span className="term-keyword">const</span> developer = &#123;</p>
            <p style={{ paddingLeft: '1.25rem' }}>role: <span className="term-string">"{portfolio.headline || 'Full-Stack Developer'}"</span>,</p>
            <p style={{ paddingLeft: '1.25rem' }}>status: <span className="term-string">"Active &bull; Verified"</span>,</p>
            <p style={{ paddingLeft: '1.25rem' }}>tools: [<span className="term-string">"React"</span>, <span className="term-string">"Node.js"</span>, <span className="term-string">"Prisma"</span>],</p>
            <p style={{ paddingLeft: '1.25rem' }}>focus: <span className="term-string">"Systems Architecture &amp; Web Engineering"</span></p>
            <p>&#125;;</p>
            <p style={{ marginTop: '0.5rem' }}><span className="term-prompt">$</span> echo <span className="term-string">"Ready to compile and deploy."</span></p>
            <p style={{ color: '#3fb950' }}>Ready to compile and deploy.</p>
          </div>
        </div>
      </div>

      {/* Skills Showcase */}
      {portfolio.skills && portfolio.skills.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} color="var(--primary)" /> Technical Stack &amp; Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            {portfolio.skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem 0.9rem',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <Code2 size={14} color="var(--primary)" />
                <span style={{ fontWeight: 600 }}>{skill.name}</span>
                {skill.proficiency && (
                  <span style={{ fontSize: '0.75rem', background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px' }}>
                    {skill.proficiency}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {portfolio.projects && portfolio.projects.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GitBranch size={20} color="var(--primary)" /> Repositories &amp; Engineering Projects
            </h2>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Layout: {portfolio.layoutType === 'flexbox' ? 'Flexbox Rows' : 'CSS Grid'}
            </span>
          </div>

          <div className={layoutClass}>
            {portfolio.projects.map((proj) => (
              <div key={proj.id} className="dev-project-card portfolio-project-card">
                {proj.imageUrl && (
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{proj.title}</h3>
                  {proj.featured && (
                    <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>
                      <Star size={10} /> Featured
                    </span>
                  )}
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
                  {proj.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {proj.technologies.split(',').map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        background: 'var(--bg-secondary)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.9rem' }}>
                  {proj.repositoryUrl && (
                    <a href={proj.repositoryUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                      <Github size={13} /> Code
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <ExternalLink size={13} /> Live Preview
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience & Education */}
      {(portfolio.experience?.length > 0 || portfolio.education?.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {portfolio.experience?.length > 0 && (
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', fontWeight: 700 }}>Experience &amp; Leadership</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {portfolio.experience.map((exp) => (
                  <div key={exp.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    <div style={{ fontWeight: 700 }}>{exp.role}</div>
                    <div style={{ color: 'var(--primary)', fontSize: '0.88rem' }}>{exp.company}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.5rem' }}>
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                    </div>
                    {exp.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {portfolio.education?.length > 0 && (
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', fontWeight: 700 }}>Academic Credentials</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {portfolio.education.map((edu) => (
                  <div key={edu.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                    <div style={{ color: 'var(--primary)', fontSize: '0.88rem' }}>{edu.institution}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0.5rem' }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.description && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
