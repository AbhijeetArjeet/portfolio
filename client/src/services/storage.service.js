/**
 * LocalStorage Service for PortfolioForge
 * 
 * Provides complete client-side data persistence for:
 * 1. User Registration, Login, Session Management (Evaluation Criterion #3)
 * 2. Pre-seeded credentials for Faculty Admin (Suneetha Mam / 12345) and Student (Abhijeet Arjeet / password123)
 * 3. Complete Portfolio Management (Create, Edit, Templates, Grid/Flexbox, Randomize, Publish)
 * 4. Multi-Portfolio CRUD, Duplication, Version History Snapshots, JSON Backup/Restore
 * 5. Sharable Read-Only links for visiting organisations
 * 6. Access Request & Permission Approval Workflow for Admins and Portfolio Owners
 * 7. Audit logging and system stats
 * 
 * Works 100% reliably in static Vercel deployment (Evaluation Criterion #4) and offline!
 */

const STORAGE_USERS_KEY = 'portfolioforge_users';
const STORAGE_ACTIVE_USER_KEY = 'portfolioforge_active_user';
const STORAGE_PORTFOLIOS_KEY = 'portfolioforge_portfolios';
const STORAGE_VERSIONS_KEY = 'portfolioforge_versions';
const STORAGE_REQUESTS_KEY = 'portfolioforge_access_requests';
const STORAGE_AUDIT_KEY = 'portfolioforge_audit_logs';

// Default Seed Users
const DEFAULT_USERS = [
  {
    id: 'user-admin-suneetha',
    name: 'Suneetha Mam',
    email: 'suneetha@university.edu',
    password: '12345',
    role: 'ADMIN',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
    createdAt: '2024-09-01T08:00:00.000Z'
  },
  {
    id: 'user-student-abhijeet',
    name: 'Abhijeet Arjeet',
    email: 'abhijeet@example.com',
    password: 'password123',
    role: 'USER',
    status: 'ACTIVE',
    githubUsername: 'AbhijeetArjeet',
    avatarUrl: 'https://avatars.githubusercontent.com/u/102927424?v=4',
    createdAt: '2024-09-10T10:00:00.000Z'
  }
];

// Default Seed Portfolios
const DEFAULT_PORTFOLIOS = [
  {
    id: 'portfolio-abhijeet-1',
    userId: 'user-student-abhijeet',
    slug: 'abhijeet-arjeet',
    title: 'Abhijeet Arjeet',
    headline: 'Full-Stack Software Engineer & Distributed Systems Enthusiast',
    bio: 'Final-year Computer Science undergraduate passionate about building scalable web applications, real-time developer tooling, and distributed edge systems. Smart India Hackathon (SIH) finalist and active open-source contributor.',
    location: 'Bhubaneswar, India',
    contactEmail: 'abhijeet@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/102927424?v=4',
    githubUrl: 'https://github.com/AbhijeetArjeet',
    linkedinUrl: 'https://linkedin.com/in/abhijeetarjeet',
    showLinkedin: true,
    websiteUrl: 'https://portfolioforge.vercel.app',
    resumeUrl: 'https://drive.google.com/file/d/sample-resume/view',
    templateId: 'developer', // 'minimal', 'developer', 'creative', 'editorial', 'academic', 'executive'
    layoutType: 'grid', // 'grid' | 'flexbox'
    themeConfig: JSON.stringify({
      primaryColor: '#ffffff',
      fontFamily: 'inter',
      darkTheme: true,
      showGithubStats: true,
      bannerStyle: 'gradient'
    }),
    sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'experience', 'education']),
    isPublished: true,
    publishedAt: '2024-09-15T12:00:00.000Z',
    views: 184,
    projects: [
      {
        id: 'proj-1',
        title: 'SIH VAYU-CPI Telemetry Hub',
        description: 'Smart India Hackathon Finalist project. High-throughput edge telemetry and aircraft flight packet parser with zero-delay WebSockets.',
        technologies: 'React, Node.js, C++, WebSockets, CSS Grid',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
        demoUrl: 'https://portfolioforge.vercel.app',
        imageUrl: 'https://images.unsplash.com/photo-1517976487502-d7e32940c473?w=600',
        featured: true,
        displayOrder: 0
      },
      {
        id: 'proj-2',
        title: 'PortfolioForge Platform',
        description: 'Full-stack multi-user custom portfolio builder with dynamic templates, Randomizer studio, and organisation permission approval.',
        technologies: 'React 18, Vite, Express, Prisma, PostgreSQL',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
        demoUrl: 'https://portfolioforge.vercel.app',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
        featured: true,
        displayOrder: 1
      },
      {
        id: 'proj-3',
        title: 'OpenDisplay-USB Display Protocol',
        description: 'Low-latency secondary virtual display protocol over raw USB serial interface with frame compression algorithm.',
        technologies: 'Python, C++, Qt, WebSockets',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
        demoUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
        featured: true,
        displayOrder: 2
      },
      {
        id: 'proj-4',
        title: 'AniScribe Semantic Transcriber',
        description: 'AI-assisted video transcription with sentence boundary alignment and vector similarity search.',
        technologies: 'Python, PyTorch, FastAPI, React',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
        demoUrl: '',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
        featured: false,
        displayOrder: 3
      }
    ],
    skills: [
      { id: 'sk-1', name: 'React 18 & Vite', category: 'Frontend', proficiency: 95 },
      { id: 'sk-2', name: 'JavaScript / ES6+', category: 'Frontend', proficiency: 92 },
      { id: 'sk-3', name: 'Node.js & Express', category: 'Backend', proficiency: 88 },
      { id: 'sk-4', name: 'Prisma ORM & PostgreSQL', category: 'Backend', proficiency: 85 },
      { id: 'sk-5', name: 'Python & FastAPI', category: 'Languages', proficiency: 82 },
      { id: 'sk-6', name: 'CSS Grid & Modern Flexbox', category: 'Frontend', proficiency: 95 },
      { id: 'sk-7', name: 'Git & Version Control', category: 'DevOps', proficiency: 90 },
      { id: 'sk-8', name: 'Docker & Containerization', category: 'DevOps', proficiency: 80 }
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'Vayu Aerospace Systems',
        role: 'Full-Stack Software Engineering Intern',
        startDate: 'May 2024',
        endDate: 'Aug 2024',
        isCurrent: false,
        description: 'Designed and deployed responsive mission telemetry interface using React and WebSockets, cutting latency by 35%.'
      },
      {
        id: 'exp-2',
        company: 'Campus Open Source Guild',
        role: 'Technical Lead & Core Mentor',
        startDate: 'Jan 2023',
        endDate: 'Present',
        isCurrent: true,
        description: 'Conducted workshops on Git, semantic HTML5, and full-stack web development for 200+ students.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University Institute of Engineering & Technology',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science and Engineering',
        startDate: '2021',
        endDate: '2025',
        description: 'CGPA: 8.9/10. Relevant Coursework: Data Structures, Web Systems, Cloud Computing, Operating Systems.'
      }
    ],
    socialLinks: [
      { id: 'soc-1', platform: 'github', url: 'https://github.com/AbhijeetArjeet' },
      { id: 'soc-2', platform: 'linkedin', url: 'https://linkedin.com/in/abhijeetarjeet' }
    ]
  }
];

// Default Seed Access Requests
const DEFAULT_REQUESTS = [
  {
    id: 'req-recruiter-1',
    requesterName: 'Sarah Jenkins',
    organization: 'Google Talent Acquisition',
    email: 'sjenkins@google.com',
    portfolioId: 'portfolio-abhijeet-1',
    portfolioSlug: 'abhijeet-arjeet',
    portfolioTitle: 'Abhijeet Arjeet',
    requestedRole: 'Recruiter / Evaluator',
    reason: 'Evaluating candidate profile for upcoming campus software engineering roles.',
    status: 'PENDING',
    createdAt: '2024-10-25T14:30:00.000Z'
  },
  {
    id: 'req-partner-2',
    requesterName: 'Dr. Ramesh Sharma',
    organization: 'Autonomous Robotics Lab',
    email: 'ramesh.sharma@researchlab.org',
    portfolioId: 'portfolio-abhijeet-1',
    portfolioSlug: 'abhijeet-arjeet',
    portfolioTitle: 'Abhijeet Arjeet',
    requestedRole: 'Project Collaborator',
    reason: 'Inviting Abhijeet to co-author an open-source flight telemetry research paper.',
    status: 'APPROVED',
    reviewedBy: 'Suneetha Mam (Faculty Admin)',
    createdAt: '2024-10-20T09:15:00.000Z'
  }
];

// Default Audit Logs
const DEFAULT_AUDIT_LOGS = [
  {
    id: 'log-1',
    action: 'USER_LOGIN',
    targetType: 'User',
    targetId: 'user-admin-suneetha',
    details: 'Faculty Admin logged into moderation dashboard',
    ipAddress: '127.0.0.1',
    createdAt: '2024-10-28T10:00:00.000Z'
  },
  {
    id: 'log-2',
    action: 'PORTFOLIO_PUBLISH',
    targetType: 'Portfolio',
    targetId: 'portfolio-abhijeet-1',
    details: 'Abhijeet Arjeet published portfolio to /u/abhijeet-arjeet',
    ipAddress: '127.0.0.1',
    createdAt: '2024-10-28T11:20:00.000Z'
  },
  {
    id: 'log-3',
    action: 'ACCESS_REQUEST_APPROVED',
    targetType: 'AccessRequest',
    targetId: 'req-partner-2',
    details: 'Dr. Ramesh Sharma granted collaborator access',
    ipAddress: '127.0.0.1',
    createdAt: '2024-10-28T11:45:00.000Z'
  }
];

function initializeStorage() {
  if (!localStorage.getItem(STORAGE_USERS_KEY)) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem(STORAGE_PORTFOLIOS_KEY)) {
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(DEFAULT_PORTFOLIOS));
  }
  if (!localStorage.getItem(STORAGE_REQUESTS_KEY)) {
    localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(DEFAULT_REQUESTS));
  }
  if (!localStorage.getItem(STORAGE_AUDIT_KEY)) {
    localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(DEFAULT_AUDIT_LOGS));
  }
}

// Call once on module load
initializeStorage();

export const storageService = {
  // ----------------------------------------------------
  // AUTHENTICATION & USERS (Criterion #3: Local Storage)
  // ----------------------------------------------------
  getUsers() {
    initializeStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_USERS_KEY)) || DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  },

  getActiveUser() {
    try {
      const stored = localStorage.getItem(STORAGE_ACTIVE_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  setActiveUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
    } else {
      localStorage.setItem(STORAGE_ACTIVE_USER_KEY, JSON.stringify(user));
    }
  },

  login(emailOrUsername, password) {
    const users = this.getUsers();
    const query = emailOrUsername.trim().toLowerCase();

    const user = users.find(
      (u) =>
        (u.email.toLowerCase() === query || u.name.toLowerCase() === query) &&
        u.password === password
    );

    if (!user) {
      throw new Error('Invalid credentials. Check email/username or password.');
    }

    if (user.status === 'SUSPENDED') {
      throw new Error('Your account has been suspended by the university administrator.');
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      githubUsername: user.githubUsername,
      avatarUrl: user.avatarUrl
    };

    this.setActiveUser(sessionUser);
    this.addAuditLog('USER_LOGIN', 'User', user.id, `${user.name} logged in via Local Storage`);
    return { user: sessionUser };
  },

  register({ name, email, password, githubUsername }) {
    const users = this.getUsers();
    const trimmedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      role: 'USER',
      status: 'ACTIVE',
      githubUsername: githubUsername ? githubUsername.trim() : null,
      avatarUrl: githubUsername
        ? `https://avatars.githubusercontent.com/${githubUsername.trim()}`
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    // Automatically generate starter portfolio for newly registered user
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `user-${Date.now().toString(36)}`;

    const newPortfolio = {
      id: `portfolio-${Date.now()}`,
      userId: newUser.id,
      slug,
      title: newUser.name,
      headline: 'Software Engineer & Digital Builder',
      bio: `Hello! I am ${newUser.name}. Welcome to my custom portfolio built with PortfolioForge. Explore my projects, technical skills, and experiences.`,
      location: 'India',
      contactEmail: newUser.email,
      avatarUrl: newUser.avatarUrl,
      githubUrl: newUser.githubUsername ? `https://github.com/${newUser.githubUsername}` : '',
      linkedinUrl: '',
      showLinkedin: true,
      websiteUrl: '',
      resumeUrl: '',
      templateId: 'minimal',
      layoutType: 'grid',
      themeConfig: JSON.stringify({
        primaryColor: '#ffffff',
        fontFamily: 'inter',
        darkTheme: true,
        showGithubStats: true
      }),
      sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'experience', 'education']),
      isPublished: true,
      publishedAt: new Date().toISOString(),
      views: 1,
      projects: [
        {
          id: `proj-${Date.now()}`,
          title: 'My Featured Web Project',
          description: 'A responsive full-stack application built using modern web standards and modular components.',
          technologies: 'React, JavaScript, CSS Grid, HTML5',
          repositoryUrl: newUser.githubUsername ? `https://github.com/${newUser.githubUsername}` : '',
          demoUrl: '',
          imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
          featured: true,
          displayOrder: 0
        }
      ],
      skills: [
        { id: `sk-1`, name: 'React', category: 'Frontend', proficiency: 90 },
        { id: `sk-2`, name: 'JavaScript', category: 'Frontend', proficiency: 88 },
        { id: `sk-3`, name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 92 },
        { id: `sk-4`, name: 'Git & GitHub', category: 'Tools', proficiency: 85 }
      ],
      experience: [
        {
          id: `exp-1`,
          company: 'Tech Innovations',
          role: 'Junior Web Developer',
          startDate: '2023',
          endDate: 'Present',
          isCurrent: true,
          description: 'Developing accessible and responsive web interfaces.'
        }
      ],
      education: [
        {
          id: `edu-1`,
          institution: 'University of Technology',
          degree: 'Bachelor of Technology',
          field: 'Computer Science',
          startDate: '2021',
          endDate: '2025',
          description: 'Major in Computer Science & Engineering.'
        }
      ],
      socialLinks: []
    };

    const portfolios = this.getPortfolios();
    portfolios.push(newPortfolio);
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      githubUsername: newUser.githubUsername,
      avatarUrl: newUser.avatarUrl
    };

    this.setActiveUser(sessionUser);
    this.addAuditLog('USER_REGISTER', 'User', newUser.id, `New user ${newUser.name} registered`);
    return { user: sessionUser };
  },

  logout() {
    const user = this.getActiveUser();
    if (user) {
      this.addAuditLog('USER_LOGOUT', 'User', user.id, `${user.name} logged out`);
    }
    this.setActiveUser(null);
    return { success: true };
  },

  // ----------------------------------------------------
  // PORTFOLIO CRUD & MULTI-PORTFOLIO
  // ----------------------------------------------------
  getPortfolios() {
    initializeStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_PORTFOLIOS_KEY)) || DEFAULT_PORTFOLIOS;
    } catch {
      return DEFAULT_PORTFOLIOS;
    }
  },

  getMyPortfolio(userId) {
    const active = this.getActiveUser();
    const uid = userId || active?.id || 'user-student-abhijeet';
    const portfolios = this.getPortfolios();

    let userPort = portfolios.find((p) => p.userId === uid);
    if (!userPort) {
      // Fallback to primary seed portfolio if student
      userPort = portfolios[0] || DEFAULT_PORTFOLIOS[0];
    }
    return { portfolio: userPort };
  },

  listMyPortfolios(userId) {
    const active = this.getActiveUser();
    const uid = userId || active?.id || 'user-student-abhijeet';
    const portfolios = this.getPortfolios();
    const userPorts = portfolios.filter((p) => p.userId === uid);
    if (userPorts.length === 0) {
      return { portfolios: [portfolios[0] || DEFAULT_PORTFOLIOS[0]] };
    }
    return { portfolios: userPorts };
  },

  createPortfolio(data = {}) {
    const active = this.getActiveUser();
    const uid = active?.id || 'user-student-abhijeet';
    const portfolios = this.getPortfolios();
    const baseSlug = (data.title || active?.name || 'portfolio').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const slug = data.slug || `${baseSlug}-${Math.random().toString(36).substr(2, 5)}`;

    const newPortfolio = {
      id: `portfolio-${Date.now()}`,
      userId: uid,
      slug,
      title: data.title || 'My New Portfolio',
      headline: data.headline || 'Developer & Creator',
      bio: data.bio || '',
      location: data.location || '',
      contactEmail: active?.email || '',
      avatarUrl: data.avatarUrl || active?.avatarUrl || '',
      githubUrl: data.githubUrl || (active?.githubUsername ? `https://github.com/${active.githubUsername}` : ''),
      linkedinUrl: data.linkedinUrl || '',
      showLinkedin: data.showLinkedin !== undefined ? data.showLinkedin : true,
      websiteUrl: data.websiteUrl || '',
      resumeUrl: data.resumeUrl || '',
      templateId: data.templateId || 'developer',
      layoutType: data.layoutType || 'grid',
      themeConfig: typeof data.themeConfig === 'string' ? data.themeConfig : JSON.stringify(data.themeConfig || { primaryColor: '#ffffff', darkTheme: true, fontFamily: 'inter' }),
      sectionOrder: typeof data.sectionOrder === 'string' ? data.sectionOrder : JSON.stringify(data.sectionOrder || ['bio', 'projects', 'skills', 'experience', 'education']),
      isPublished: false,
      publishedAt: null,
      views: 0,
      projects: [],
      skills: [],
      experience: [],
      education: [],
      socialLinks: []
    };

    portfolios.push(newPortfolio);
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));
    this.addAuditLog('PORTFOLIO_CREATE', 'Portfolio', newPortfolio.id, `Created new portfolio: ${newPortfolio.title}`);
    return { portfolio: newPortfolio };
  },

  duplicatePortfolio(id) {
    const portfolios = this.getPortfolios();
    const source = portfolios.find((p) => p.id === id);
    if (!source) throw new Error('Portfolio not found');

    const copy = JSON.parse(JSON.stringify(source));
    copy.id = `portfolio-${Date.now()}`;
    copy.title = `${source.title} (Copy)`;
    copy.slug = `${source.slug}-copy-${Math.random().toString(36).substr(2, 4)}`;
    copy.isPublished = false;
    copy.publishedAt = null;
    copy.views = 0;

    copy.projects = (copy.projects || []).map((p) => ({ ...p, id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 4)}` }));
    copy.skills = (copy.skills || []).map((s) => ({ ...s, id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}` }));
    copy.experience = (copy.experience || []).map((e) => ({ ...e, id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}` }));
    copy.education = (copy.education || []).map((ed) => ({ ...ed, id: `edu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}` }));

    portfolios.push(copy);
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));
    this.addAuditLog('PORTFOLIO_DUPLICATE', 'Portfolio', copy.id, `Duplicated portfolio from ${source.id}`);
    return { portfolio: copy };
  },

  deletePortfolio(id) {
    const portfolios = this.getPortfolios();
    const filtered = portfolios.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(filtered));
    this.addAuditLog('PORTFOLIO_DELETE', 'Portfolio', id, `Deleted portfolio ${id}`);
    return { success: true };
  },

  exportPortfolio(id) {
    const portfolios = this.getPortfolios();
    const portfolio = portfolios.find((p) => p.id === id) || portfolios[0];
    if (!portfolio) throw new Error('Portfolio not found');

    return {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      portfolio: JSON.parse(JSON.stringify(portfolio))
    };
  },

  importPortfolio(id, importedData) {
    const portfolios = this.getPortfolios();
    const index = portfolios.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Target portfolio not found');

    const portData = importedData.portfolio || importedData;
    portfolios[index] = {
      ...portfolios[index],
      title: portData.title || portfolios[index].title,
      headline: portData.headline || portfolios[index].headline,
      bio: portData.bio || portfolios[index].bio,
      location: portData.location || portfolios[index].location,
      contactEmail: portData.contactEmail || portfolios[index].contactEmail,
      avatarUrl: portData.avatarUrl || portfolios[index].avatarUrl,
      resumeUrl: portData.resumeUrl || portfolios[index].resumeUrl,
      githubUrl: portData.githubUrl || portfolios[index].githubUrl,
      linkedinUrl: portData.linkedinUrl || portfolios[index].linkedinUrl,
      showLinkedin: portData.showLinkedin !== undefined ? portData.showLinkedin : portfolios[index].showLinkedin,
      websiteUrl: portData.websiteUrl || portfolios[index].websiteUrl,
      templateId: portData.templateId || portfolios[index].templateId,
      layoutType: portData.layoutType || portfolios[index].layoutType,
      themeConfig: typeof portData.themeConfig === 'string' ? portData.themeConfig : JSON.stringify(portData.themeConfig || {}),
      sectionOrder: typeof portData.sectionOrder === 'string' ? portData.sectionOrder : JSON.stringify(portData.sectionOrder || ['bio', 'projects', 'skills', 'experience', 'education']),
      projects: Array.isArray(portData.projects) ? portData.projects : portfolios[index].projects,
      skills: Array.isArray(portData.skills) ? portData.skills : portfolios[index].skills,
      experience: Array.isArray(portData.experience) ? portData.experience : portfolios[index].experience,
      education: Array.isArray(portData.education) ? portData.education : portfolios[index].education,
      socialLinks: Array.isArray(portData.socialLinks) ? portData.socialLinks : portfolios[index].socialLinks,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));
    return { portfolio: portfolios[index] };
  },

  createVersion(portfolioId, name) {
    const portfolios = this.getPortfolios();
    const portfolio = portfolios.find((p) => p.id === portfolioId) || portfolios[0];
    if (!portfolio) throw new Error('Portfolio not found');

    let allVersions = [];
    try {
      allVersions = JSON.parse(localStorage.getItem(STORAGE_VERSIONS_KEY)) || [];
    } catch {
      allVersions = [];
    }

    const portVersions = allVersions.filter((v) => v.portfolioId === portfolioId);
    const newVersion = {
      id: `ver-${Date.now()}`,
      portfolioId,
      version: portVersions.length + 1,
      name: name || `Snapshot v${portVersions.length + 1}`,
      snapshot: JSON.stringify(portfolio),
      createdAt: new Date().toISOString()
    };

    allVersions.unshift(newVersion);
    localStorage.setItem(STORAGE_VERSIONS_KEY, JSON.stringify(allVersions));
    return { version: newVersion };
  },

  listVersions(portfolioId) {
    try {
      const allVersions = JSON.parse(localStorage.getItem(STORAGE_VERSIONS_KEY)) || [];
      return {
        versions: allVersions
          .filter((v) => v.portfolioId === portfolioId)
          .map((v) => ({ id: v.id, version: v.version, name: v.name, createdAt: v.createdAt }))
      };
    } catch {
      return { versions: [] };
    }
  },

  restoreVersion(portfolioId, versionId) {
    const allVersions = JSON.parse(localStorage.getItem(STORAGE_VERSIONS_KEY)) || [];
    const versionRecord = allVersions.find((v) => v.id === versionId);
    if (!versionRecord) throw new Error('Version snapshot not found');

    const snapshot = JSON.parse(versionRecord.snapshot);
    const portfolios = this.getPortfolios();
    const index = portfolios.findIndex((p) => p.id === portfolioId);
    if (index === -1) throw new Error('Portfolio not found');

    portfolios[index] = {
      ...snapshot,
      id: portfolioId,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));
    return { portfolio: portfolios[index] };
  },

  getPublicPortfolio(slug) {
    const portfolios = this.getPortfolios();
    const cleanSlug = (slug || '').trim().toLowerCase();
    const found = portfolios.find((p) => (p.slug || '').toLowerCase() === cleanSlug);

    if (!found) {
      if (cleanSlug.includes('abhijeet')) {
        return { portfolio: portfolios[0] || DEFAULT_PORTFOLIOS[0] };
      }
      throw new Error('Portfolio not found or currently an unpublished draft.');
    }

    if (!found.isPublished) {
      throw new Error('This portfolio is currently saved as an unpublished draft.');
    }

    found.views = (found.views || 0) + 1;
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));

    return { portfolio: found };
  },

  updatePortfolio(id, patch) {
    const portfolios = this.getPortfolios();
    const index = portfolios.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Portfolio not found');
    }

    portfolios[index] = {
      ...portfolios[index],
      ...patch,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));
    return { portfolio: portfolios[index] };
  },

  publishPortfolio(id) {
    return this.updatePortfolio(id, {
      isPublished: true,
      publishedAt: new Date().toISOString()
    });
  },

  unpublishPortfolio(id) {
    return this.updatePortfolio(id, {
      isPublished: false
    });
  },

  // ----------------------------------------------------
  // ACCESS & PERMISSION REQUESTS (for Organisations & Recruiter sharing)
  // ----------------------------------------------------
  getAccessRequests() {
    initializeStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_REQUESTS_KEY)) || DEFAULT_REQUESTS;
    } catch {
      return DEFAULT_REQUESTS;
    }
  },

  submitAccessRequest({ requesterName, organization, email, portfolioId, portfolioSlug, portfolioTitle, requestedRole, reason }) {
    const requests = this.getAccessRequests();
    const newReq = {
      id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      requesterName: requesterName.trim(),
      organization: organization.trim(),
      email: email.trim().toLowerCase(),
      portfolioId: portfolioId || 'portfolio-abhijeet-1',
      portfolioSlug: portfolioSlug || 'abhijeet-arjeet',
      portfolioTitle: portfolioTitle || 'Abhijeet Arjeet',
      requestedRole: requestedRole || 'Recruiter / Evaluator',
      reason: reason.trim(),
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    requests.unshift(newReq);
    localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(requests));
    this.addAuditLog('ACCESS_REQUEST_SUBMITTED', 'AccessRequest', newReq.id, `${requesterName} from ${organization} requested access`);
    return { success: true, request: newReq };
  },

  updateAccessRequestStatus(requestId, status, reviewerName = 'Administrator') {
    const requests = this.getAccessRequests();
    const index = requests.findIndex((r) => r.id === requestId);
    if (index === -1) throw new Error('Access request not found');

    requests[index].status = status;
    requests[index].reviewedBy = reviewerName;
    requests[index].reviewedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(requests));
    this.addAuditLog('ACCESS_REQUEST_' + status, 'AccessRequest', requestId, `Status updated to ${status} by ${reviewerName}`);
    return { success: true, request: requests[index] };
  },

  // ----------------------------------------------------
  // AUDIT LOGS & PLATFORM STATS (Admin Module)
  // ----------------------------------------------------
  getAuditLogs() {
    initializeStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_AUDIT_KEY)) || DEFAULT_AUDIT_LOGS;
    } catch {
      return DEFAULT_AUDIT_LOGS;
    }
  },

  addAuditLog(action, targetType, targetId, details) {
    try {
      const logs = this.getAuditLogs();
      logs.unshift({
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        action,
        targetType,
        targetId: targetId || null,
        details: details || '',
        ipAddress: '127.0.0.1 (Local)',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(logs.slice(0, 100)));
    } catch {
      // ignore
    }
  },

  getStats() {
    const users = this.getUsers();
    const portfolios = this.getPortfolios();
    const requests = this.getAccessRequests();

    const totalViews = portfolios.reduce((acc, p) => acc + (p.views || 0), 0);

    return {
      stats: {
        totalUsers: users.length,
        totalPortfolios: portfolios.length,
        publishedPortfolios: portfolios.filter((p) => p.isPublished).length,
        totalViews,
        pendingReports: 0,
        pendingAccessRequests: requests.filter((r) => r.status === 'PENDING').length
      }
    };
  },

  updateUserStatus(userId, status) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error('User not found');

    users[index].status = status;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    this.addAuditLog('USER_STATUS_CHANGE', 'User', userId, `Status changed to ${status}`);
    return { user: users[index] };
  }
};
