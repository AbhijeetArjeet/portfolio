import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Cpu,
  Layers,
  Check,
  Plus,
  Briefcase,
  Award,
  Zap,
  Code
} from 'lucide-react';

export default function PreGivenMaterialsLibrary({ portfolio, onApplyPreset, onAddProject, onAddSkill }) {
  const [copiedNotification, setCopiedNotification] = useState('');

  const notify = (msg) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(''), 3000);
  };

  // 1. Domain Starter Profiles
  const domainPresets = [
    {
      title: 'Full-Stack Software Engineer',
      badge: 'Most Popular',
      headline: 'Full-Stack Software Engineer & Distributed Systems Enthusiast',
      bio: 'Full-stack software developer with proven experience architecting scalable React web applications and reliable Node.js/PostgreSQL microservices. Dedicated to performance optimization, clean code, and zero-downtime CI/CD delivery.',
      templateId: 'developer',
      layoutType: 'grid',
      color: '#ffffff',
      suggestedSkills: ['React 18', 'Node.js & Express', 'PostgreSQL & Prisma', 'TypeScript', 'Docker', 'CSS Grid & Flexbox']
    },
    {
      title: 'AI / Machine Learning Specialist',
      badge: 'High Demand',
      headline: 'Machine Learning Researcher & Deep Learning Engineer',
      bio: 'Specialized in computer vision, generative AI transcription, and neural network optimization. Experienced with PyTorch, FastAPI microservices, and high-throughput vector similarity search.',
      templateId: 'academic',
      layoutType: 'grid',
      color: '#059669',
      suggestedSkills: ['Python 3', 'PyTorch & TensorFlow', 'FastAPI', 'Pandas & NumPy', 'HuggingFace', 'Docker']
    },
    {
      title: 'UI/UX & Creative Product Designer',
      badge: 'Visual Design',
      headline: 'Product Designer & Frontend Design Technologist',
      bio: 'Creating human-centered digital experiences through disciplined design systems, responsive typography, and delightful micro-interactions. Blending aesthetic polish with engineering precision.',
      templateId: 'creative',
      layoutType: 'flexbox',
      color: '#e11d48',
      suggestedSkills: ['Figma Design Systems', 'React UI', 'CSS Grid', 'Design Tokens', 'Accessibility (WCAG)', 'Prototyping']
    },
    {
      title: 'Thought Leader / Tech Writer',
      badge: 'Editorial',
      headline: 'Software Architect, Researcher & Technology Essayist',
      bio: 'Writing on the intersection of distributed systems, browser architecture, and engineering management. Published author and speaker with a passion for deep technical synthesis.',
      templateId: 'editorial',
      layoutType: 'grid',
      color: '#7c3aed',
      suggestedSkills: ['Technical Writing', 'System Architecture', 'React & Vite', 'Distributed Databases', 'Open Source']
    },
    {
      title: 'Corporate / Engineering Lead',
      badge: 'Executive',
      headline: 'Lead Software Engineer & Technical Project Manager',
      bio: 'Driving technical strategy, cross-functional collaboration, and mission-critical enterprise platforms. Focused on high-availability cloud architecture and mentoring high-performing engineering squads.',
      templateId: 'executive',
      layoutType: 'grid',
      color: '#0f172a',
      suggestedSkills: ['Cloud Infrastructure', 'Agile & Scrum', 'Microservices', 'PostgreSQL', 'System Design', 'Team Leadership']
    }
  ];

  // 2. Pre-made Project Blueprints
  const preMadeProjects = [
    {
      title: 'Distributed Edge Telemetry Hub',
      description: 'High-throughput sensor ingestion and telemetry streaming engine processing over 10,000 UDP/WebSocket events per second with sub-5ms latency.',
      technologies: 'React 18, Node.js, C++, WebSockets, Redis',
      demoUrl: 'https://portfolioforge.vercel.app',
      repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'
    },
    {
      title: 'PortfolioForge Multi-User Platform',
      description: 'Production-ready custom portfolio creation platform with live reactive preview, CSS Grid/Flexbox toggle, role-based access control, and organization sharing.',
      technologies: 'React 18, Vite, Express, Prisma ORM, PostgreSQL',
      demoUrl: 'https://portfolioforge.vercel.app',
      repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600'
    },
    {
      title: 'AI Multi-Modal Script Transcriber',
      description: 'Real-time speech-to-text pipeline featuring speaker diarization, automatic punctuation, and semantic semantic embedding generation.',
      technologies: 'Python, PyTorch, FastAPI, React, Whisper',
      demoUrl: 'https://portfolioforge.vercel.app',
      repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600'
    },
    {
      title: 'Decentralized Digital Asset Escrow',
      description: 'Zero-knowledge verified escrow protocol with automated arbitration timeouts and event verification listeners.',
      technologies: 'Solidity, Web3.js, React, Node.js',
      demoUrl: 'https://portfolioforge.vercel.app',
      repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600'
    }
  ];

  // 3. Pre-made Skill Packages
  const skillPackages = [
    {
      name: 'Full-Stack Web Suite',
      category: 'Frontend & Backend',
      skills: [
        { name: 'React 18 & Hooks', category: 'Frontend', proficiency: 95 },
        { name: 'JavaScript / ES6+', category: 'Frontend', proficiency: 92 },
        { name: 'Node.js & Express', category: 'Backend', proficiency: 88 },
        { name: 'Prisma ORM & PostgreSQL', category: 'Backend', proficiency: 85 },
        { name: 'CSS Grid & Flexbox', category: 'Frontend', proficiency: 95 }
      ]
    },
    {
      name: 'AI, Data & Python Suite',
      category: 'Data Science',
      skills: [
        { name: 'Python 3', category: 'Languages', proficiency: 94 },
        { name: 'PyTorch', category: 'AI/ML', proficiency: 86 },
        { name: 'FastAPI Microservices', category: 'Backend', proficiency: 88 },
        { name: 'Pandas & Data Processing', category: 'Data', proficiency: 90 },
        { name: 'Vector Search & LangChain', category: 'AI/ML', proficiency: 82 }
      ]
    },
    {
      name: 'DevOps & Systems Suite',
      category: 'Infrastructure',
      skills: [
        { name: 'Git & Version Control', category: 'DevOps', proficiency: 92 },
        { name: 'Docker & Containers', category: 'DevOps', proficiency: 85 },
        { name: 'Linux / Bash Scripting', category: 'Systems', proficiency: 88 },
        { name: 'CI/CD Pipelines (GitHub Actions)', category: 'DevOps', proficiency: 84 },
        { name: 'Nginx & Reverse Proxies', category: 'DevOps', proficiency: 80 }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {copiedNotification && (
        <div style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
          <Check size={16} /> {copiedNotification}
        </div>
      )}

      {/* Intro */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
          <Sparkles size={16} /> Pre-Given Materials & Feature Library
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Select From Curated Building Blocks</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
          Instantly accelerate your custom portfolio by picking pre-written domain profiles, verified technical skill packages, or complete project blueprints with a single click.
        </p>
      </div>

      {/* 1. Domain Starter Profiles */}
      <div>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Briefcase size={16} color="var(--primary)" /> 1. One-Click Domain Starter Profiles
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {domainPresets.map((dp, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', background: 'var(--primary-subtle)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    {dp.badge}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Template: {dp.templateId}</span>
                </div>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.3rem' }}>{dp.title}</h5>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {dp.headline}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onApplyPreset({
                    headline: dp.headline,
                    bio: dp.bio,
                    templateId: dp.templateId,
                    layoutType: dp.layoutType,
                    themeConfig: JSON.stringify({
                      primaryColor: dp.color,
                      fontFamily: 'inter',
                      darkTheme: false,
                      showGithubStats: true
                    })
                  });
                  notify(`Applied "${dp.title}" profile!`);
                }}
                className="btn btn-outline btn-sm"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                <Zap size={14} /> Apply Profile Preset
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Project Blueprints */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.75rem' }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Code size={16} color="var(--primary)" /> 2. Pre-Given Project Blueprints
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Click &ldquo;Insert Into Portfolio&rdquo; to add these comprehensive engineering projects to your showcase.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {preMadeProjects.map((p, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.4rem' }}>{p.title}</h5>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {p.description}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {p.technologies}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddProject(p);
                  notify(`Added "${p.title}" to projects!`);
                }}
                className="btn btn-primary btn-sm"
                style={{ width: '100%' }}
              >
                <Plus size={14} /> Insert Into Portfolio
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Skill Packages */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.75rem' }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Cpu size={16} color="var(--primary)" /> 3. Curated Skill Packages
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {skillPackages.map((sp, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{sp.name}</h5>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sp.skills.length} skills</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '1rem' }}>
                  {sp.skills.map((s, i) => (
                    <span key={i} style={{ fontSize: '0.72rem', background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '3px', color: 'var(--text-secondary)' }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sp.skills.forEach((s) => onAddSkill(s));
                  notify(`Added ${sp.skills.length} skills from "${sp.name}"!`);
                }}
                className="btn btn-outline btn-sm"
                style={{ width: '100%' }}
              >
                <Plus size={14} /> Add Entire Skill Set
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
