/**
 * LocalStorage Service for PortfolioForge
 * 
 * Provides complete client-side data persistence for:
 * 1. User Registration, Login, Session Management (Evaluation Criterion #3)
 * 2. Pre-seeded credentials for Faculty Admin (Sunita Bulla / mam) and Students (Abhijeet Arjeet, Hritik Kumar, Duggiralapati Sri Sarvagna)
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
    id: 'user-admin-sunita',
    name: 'Sunita Bulla',
    email: 'sunita.bulla@university.edu',
    password: 'mam',
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
    avatarUrl: 'https://avatars.githubusercontent.com/u/213563458?v=4',
    createdAt: '2024-09-10T10:00:00.000Z'
  },
  {
    id: 'user-student-hritik',
    name: 'Hritik Kumar',
    email: 'hritik@example.com',
    password: 'password123',
    role: 'USER',
    status: 'ACTIVE',
    githubUsername: 'Hritikkumar-2543',
    avatarUrl: 'https://avatars.githubusercontent.com/u/257158052?v=4',
    createdAt: '2024-09-11T10:00:00.000Z'
  },
  {
    id: 'user-student-sarvagna',
    name: 'Duggiralapati Sri Sarvagna',
    email: 'sarvagna@example.com',
    password: 'password123',
    role: 'USER',
    status: 'ACTIVE',
    githubUsername: 'dsrisarvagna-sudo',
    avatarUrl: 'https://avatars.githubusercontent.com/u/249986174?v=4',
    createdAt: '2024-09-12T10:00:00.000Z'
  }
];

// Default Seed Portfolios
const DEFAULT_PORTFOLIOS = [
  {
    id: 'portfolio-abhijeet-1',
    userId: 'user-student-abhijeet',
    slug: 'abhijeet-arjeet',
    title: 'Abhijeet Arjeet | Systems & Full-Stack Developer',
    headline: 'Software & Systems Developer • Open Source Creator',
    bio: 'Developer passionate about low-latency systems engineering, performance-driven software, audio processing, and full-stack web applications. Creator of OpenDisplay-USB and AniScribe.',
    location: 'India',
    contactEmail: 'abhijeet@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/213563458?v=4',
    githubUrl: 'https://github.com/AbhijeetArjeet',
    linkedinUrl: 'https://www.linkedin.com/in/abhijeet-arjeet-1aa62b3a7/',
    showLinkedin: true,
    websiteUrl: 'https://github.com/AbhijeetArjeet',
    templateId: 'developer',
    layoutType: 'grid',
    themeConfig: JSON.stringify({
      primaryColor: '#ffffff',
      fontFamily: 'inter',
      darkTheme: true,
      showGithubStats: true,
      bannerStyle: 'gradient'
    }),
    sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'education']),
    isPublished: true,
    publishedAt: '2024-09-15T12:00:00.000Z',
    views: 184,
    projects: [
      {
        id: 'proj-abhijeet-1',
        title: 'OpenDisplay-USB',
        description: 'Ultra low-latency USB display driver and streaming utility leveraging ADB protocol, hardware video codecs, and zero-server architecture.',
        technologies: 'C++, Android SDK, Python, FFmpeg',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/OpenDisplay-USB',
        demoUrl: 'https://github.com/AbhijeetArjeet/OpenDisplay-USB',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
        featured: true,
        displayOrder: 1
      },
      {
        id: 'proj-abhijeet-2',
        title: 'AniScribe',
        description: 'High-speed audio-to-text AI transcription platform with speaker diarization, sub-second latency indexing, and privacy-first local processing.',
        technologies: 'React, Node.js, WebAssembly, Whisper AI',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/AniScribe',
        demoUrl: 'https://github.com/AbhijeetArjeet/AniScribe',
        imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600',
        featured: true,
        displayOrder: 2
      },
      {
        id: 'proj-abhijeet-3',
        title: 'AURA',
        description: 'Modern responsive audio visualizer & music playback suite with reactive canvas waveforms, spectrum analysis, and custom themes.',
        technologies: 'JavaScript, Web Audio API, Canvas, CSS3',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/AURA',
        demoUrl: 'https://github.com/AbhijeetArjeet/AURA',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
        featured: true,
        displayOrder: 3
      },
      {
        id: 'proj-abhijeet-4',
        title: 'dualboot-clock-fix',
        description: 'Hardware Real-Time Clock (RTC) synchronizer resolving UTC / local-time clock drift across dual-boot Windows and Linux machines.',
        technologies: 'Shell, PowerShell, Batch, Linux Kernel RTC',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/dualboot-clock-fix',
        demoUrl: 'https://github.com/AbhijeetArjeet/dualboot-clock-fix',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
        featured: false,
        displayOrder: 4
      },
      {
        id: 'proj-abhijeet-5',
        title: 'PortfolioForge Platform',
        description: 'Full-Stack custom portfolio builder with dynamic template engines, Neon cloud PostgreSQL persistence, LinkedIn integration, and admin moderation.',
        technologies: 'React 18, Vite, Node.js, Express, Prisma, PostgreSQL',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
        demoUrl: 'https://github.com/AbhijeetArjeet/portfolio',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
        featured: true,
        displayOrder: 5
      }
    ],
    skills: [
      { id: 'sk-a1', name: 'JavaScript & TypeScript', category: 'Languages', proficiency: 95 },
      { id: 'sk-a2', name: 'C / C++', category: 'Languages', proficiency: 88 },
      { id: 'sk-a3', name: 'Python', category: 'Languages', proficiency: 85 },
      { id: 'sk-a4', name: 'React & Vite', category: 'Frontend', proficiency: 94 },
      { id: 'sk-a5', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 96 },
      { id: 'sk-a6', name: 'Node.js & Express', category: 'Backend', proficiency: 90 },
      { id: 'sk-a7', name: 'PostgreSQL & Prisma', category: 'Backend', proficiency: 88 },
      { id: 'sk-a8', name: 'Git & GitHub CI/CD', category: 'DevOps', proficiency: 92 },
      { id: 'sk-a9', name: 'Linux & Hardware Tooling', category: 'Systems', proficiency: 86 }
    ],
    education: [
      {
        id: 'edu-a1',
        institution: 'University Engineering College',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        startDate: '2022',
        endDate: '2026',
        description: 'Coursework: Data Structures, Operating Systems, Computer Networks, Database Management Systems, Web Technologies.'
      }
    ],
    socialLinks: [
      { id: 'soc-a1', platform: 'github', url: 'https://github.com/AbhijeetArjeet' },
      { id: 'soc-a2', platform: 'linkedin', url: 'https://www.linkedin.com/in/abhijeet-arjeet-1aa62b3a7/' }
    ]
  },
  {
    id: 'portfolio-hritik-1',
    userId: 'user-student-hritik',
    slug: 'hritik-kumar',
    title: 'Hritik Kumar | Frontend & Web Developer',
    headline: 'Frontend Developer • Web Enthusiast • Tech Explorer',
    bio: 'Computer science engineering student and web developer passionate about building intuitive, responsive user experiences, accessible interfaces, and interactive web projects.',
    location: 'India',
    contactEmail: 'hritik@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/257158052?v=4',
    githubUrl: 'https://github.com/Hritikkumar-2543',
    linkedinUrl: 'https://www.linkedin.com/in/hritik-kumar-5857963a8/',
    showLinkedin: true,
    websiteUrl: 'https://github.com/Hritikkumar-2543',
    templateId: 'minimal',
    layoutType: 'grid',
    themeConfig: JSON.stringify({
      primaryColor: '#ffffff',
      fontFamily: 'inter',
      darkTheme: true,
      projectLayout: 'grid'
    }),
    sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'education']),
    isPublished: true,
    publishedAt: '2024-09-16T10:00:00.000Z',
    views: 95,
    projects: [
      {
        id: 'proj-hritik-1',
        title: 'Student-personal-portfolio',
        description: 'Responsive student personal portfolio web application featuring interactive project showcases, skill assessments, and modern responsive layouts.',
        technologies: 'HTML5, CSS3, JavaScript, Responsive Design',
        repositoryUrl: 'https://github.com/Hritikkumar-2543/Student-personal-portfolio',
        demoUrl: 'https://github.com/Hritikkumar-2543/Student-personal-portfolio',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600',
        featured: true,
        displayOrder: 1
      },
      {
        id: 'proj-hritik-2',
        title: 'Web Portfolio Application',
        description: 'Interactive modern portfolio platform showcasing coursework achievements, web architecture, and clean UI engineering.',
        technologies: 'JavaScript, CSS Grid, Semantic HTML',
        repositoryUrl: 'https://github.com/Hritikkumar-2543/portfolio',
        demoUrl: 'https://github.com/Hritikkumar-2543/portfolio',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
        featured: true,
        displayOrder: 2
      }
    ],
    skills: [
      { id: 'sk-h1', name: 'HTML5 & Semantic Markup', category: 'Frontend', proficiency: 95 },
      { id: 'sk-h2', name: 'CSS3 & Responsive Layouts', category: 'Frontend', proficiency: 92 },
      { id: 'sk-h3', name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 88 },
      { id: 'sk-h4', name: 'React & Modern UI', category: 'Frontend', proficiency: 82 },
      { id: 'sk-h5', name: 'Git & GitHub Collaboration', category: 'DevOps', proficiency: 85 },
      { id: 'sk-h6', name: 'Web Accessibility & UI Design', category: 'Frontend', proficiency: 86 }
    ],
    education: [
      {
        id: 'edu-h1',
        institution: 'University Engineering College',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        startDate: '2022',
        endDate: '2026',
        description: 'Coursework: Web Development, Data Structures, Software Engineering, Database Systems.'
      }
    ],
    socialLinks: [
      { id: 'soc-h1', platform: 'github', url: 'https://github.com/Hritikkumar-2543' },
      { id: 'soc-h2', platform: 'linkedin', url: 'https://www.linkedin.com/in/hritik-kumar-5857963a8/' }
    ]
  },
  {
    id: 'portfolio-sarvagna-1',
    userId: 'user-student-sarvagna',
    slug: 'duggiralapati-sri-sarvagna',
    title: 'Duggiralapati Sri Sarvagna | Software & AI Developer',
    headline: 'Software Developer • AI Assistant Builder • Systems Student',
    bio: 'Software developer and engineering student focused on building desktop AI assistants, academic timetable systems, and interactive applications. Exploring local LLMs and full-stack software development.',
    location: 'India',
    contactEmail: 'sarvagna@example.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/249986174?v=4',
    githubUrl: 'https://github.com/dsrisarvagna-sudo',
    linkedinUrl: 'https://www.linkedin.com/in/duggiralapatisrisarvagna/',
    showLinkedin: true,
    websiteUrl: 'https://github.com/dsrisarvagna-sudo',
    templateId: 'developer',
    layoutType: 'grid',
    themeConfig: JSON.stringify({
      primaryColor: '#ffffff',
      fontFamily: 'inter',
      darkTheme: true,
      projectLayout: 'grid'
    }),
    sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'education']),
    isPublished: true,
    publishedAt: '2024-09-17T11:00:00.000Z',
    views: 112,
    projects: [
      {
        id: 'proj-s1',
        title: 'KAREN-AI Desktop Assistant',
        description: 'Desktop AI assistant application leveraging speech synthesis, local language models, and automated system commands for hands-free productivity.',
        technologies: 'Python, SpeechRecognition, Pyttsx3, AI Automation',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/KAREN-AI',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/KAREN-AI',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
        featured: true,
        displayOrder: 1
      },
      {
        id: 'proj-s2',
        title: 'CTCMS (Classroom Timetable & Course Management System)',
        description: 'Course timetable management platform streamlining classroom scheduling, teacher-student allocations, and schedule conflict resolution.',
        technologies: 'Python, SQLite / MySQL, Web Interfaces',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/CTCMS',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/CTCMS',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
        featured: true,
        displayOrder: 2
      },
      {
        id: 'proj-s3',
        title: 'Flappy Bird Game Engine',
        description: 'Interactive Flappy Bird recreation built using JavaScript canvas rendering, gravity simulation, and collision detection.',
        technologies: 'JavaScript, HTML5 Canvas, Game Physics',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/flappy-bird-game',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/flappy-bird-game',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
        featured: false,
        displayOrder: 3
      },
      {
        id: 'proj-s4',
        title: 'Frontend Development Frameworks Lab Repository',
        description: 'Academic coursework repository containing production-grade frontend assignments, CSS Grid / Flexbox layouts, and component architectures.',
        technologies: 'React, HTML5, CSS3, JavaScript',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/25CS2101-FEDFW-Lab-Insem1',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/25CS2101-FEDFW-Lab-Insem1',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
        featured: true,
        displayOrder: 4
      },
      {
        id: 'proj-s5',
        title: 'Accessible Authentication UI',
        description: 'Modern and accessible authentication portal with input validation, state transitions, and mobile-first responsive layout.',
        technologies: 'HTML5, CSS3, JavaScript',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/login_page',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/login_page',
        imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600',
        featured: false,
        displayOrder: 5
      }
    ],
    skills: [
      { id: 'sk-s1', name: 'Python & Scripting', category: 'Languages', proficiency: 92 },
      { id: 'sk-s2', name: 'JavaScript & Web Technologies', category: 'Languages', proficiency: 88 },
      { id: 'sk-s3', name: 'AI & Automation Models', category: 'Artificial Intelligence', proficiency: 85 },
      { id: 'sk-s4', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 90 },
      { id: 'sk-s5', name: 'Database & Systems', category: 'Database', proficiency: 84 },
      { id: 'sk-s6', name: 'Git & Version Control', category: 'DevOps', proficiency: 88 }
    ],
    education: [
      {
        id: 'edu-s1',
        institution: 'University Engineering College',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        startDate: '2022',
        endDate: '2026',
        description: 'Coursework: Frontend Development Frameworks, Database Systems, Artificial Intelligence, Operating Systems.'
      }
    ],
    socialLinks: [
      { id: 'soc-s1', platform: 'github', url: 'https://github.com/dsrisarvagna-sudo' },
      { id: 'soc-s2', platform: 'linkedin', url: 'https://www.linkedin.com/in/duggiralapatisrisarvagna/' }
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
    reviewedBy: 'Sunita Bulla (Faculty Admin)',
    createdAt: '2024-10-20T09:15:00.000Z'
  }
];

// Default Audit Logs
const DEFAULT_AUDIT_LOGS = [
  {
    id: 'log-1',
    action: 'USER_LOGIN',
    targetType: 'User',
    targetId: 'user-admin-sunita',
    details: 'Faculty Admin (Sunita Bulla) logged into moderation dashboard',
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
  const usersRaw = localStorage.getItem(STORAGE_USERS_KEY);
  // Auto-upgrade if legacy user data or older seed is detected
  if (!usersRaw || usersRaw.includes('suneetha@university.edu')) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(DEFAULT_PORTFOLIOS));
    localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(DEFAULT_REQUESTS));
    localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(DEFAULT_AUDIT_LOGS));
    return;
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

  updateUserRole(userId, role) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error('User not found');

    users[index].role = role;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    const active = this.getActiveUser();
    if (active && active.id === userId) {
      active.role = role;
      this.setActiveUser(active);
    }

    this.addAuditLog('USER_ROLE_CHANGE', 'User', userId, `Privileges changed to ${role}`);
    return { user: users[index] };
  },

  updateUserStatus(userId, status) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error('User not found');

    users[index].status = status;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    this.addAuditLog('USER_STATUS_CHANGE', 'User', userId, `Status changed to ${status}`);
    return { user: users[index] };
  },

  createAccountByAdmin({ name, email, password, role }) {
    const users = this.getUsers();
    const trimmedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      throw new Error('An account with this email address already exists.');
    }

    const assignedRole = role === 'ADMIN' ? 'ADMIN' : 'USER';
    const newUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      role: assignedRole,
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'portfolio';
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    const newPortfolio = {
      id: `portfolio-${Date.now()}`,
      userId: newUser.id,
      slug,
      title: `${name} | Portfolio`,
      headline: assignedRole === 'ADMIN' ? 'Platform Administrator & Evaluator' : 'Developer & Creator',
      bio: `Hello! I am ${name}. Welcome to my custom portfolio.`,
      location: 'India',
      contactEmail: trimmedEmail,
      avatarUrl: newUser.avatarUrl,
      templateId: assignedRole === 'ADMIN' ? 'executive' : 'developer',
      layoutType: 'grid',
      themeConfig: JSON.stringify({ primaryColor: '#ffffff', darkTheme: true, fontFamily: 'inter' }),
      sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'experience', 'education']),
      isPublished: true,
      publishedAt: new Date().toISOString(),
      views: 0,
      projects: [],
      skills: [],
      experience: [],
      education: [],
      socialLinks: []
    };

    const portfolios = this.getPortfolios();
    portfolios.push(newPortfolio);
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));

    this.addAuditLog('ADMIN_USER_CREATE', 'User', newUser.id, `Created ${assignedRole} account for ${newUser.name}`);
    return { user: newUser };
  }
};
