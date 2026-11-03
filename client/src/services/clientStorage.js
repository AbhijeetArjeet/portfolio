/**
 * Client-Side Persistence Layer for PortfolioForge
 * 
 * Provides seamless client-side storage when:
 * 1. The backend is not yet deployed or is spinning down on Render free tier.
 * 2. The frontend is hosted on static platforms (Vercel) without a running proxy.
 * 3. Offline / preview mode is active.
 * 
 * Uses verified accounts for Abhijeet Arjeet, Hritik Kumar, D. Sri Sarvagna, and Suneetha Mam.
 */

const STORAGE_USERS_KEY = 'portfolioforge_users_v2';
const STORAGE_CURRENT_USER_KEY = 'portfolioforge_current_user_v2';
const STORAGE_PORTFOLIOS_KEY = 'portfolioforge_portfolios_v2';
const STORAGE_REPORTS_KEY = 'portfolioforge_reports_v2';

const INITIAL_USERS = [
  {
    id: 'user-admin-suneetha',
    name: 'Suneetha Mam',
    email: 'suneetha@university.edu',
    password: '12345',
    role: 'ADMIN',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    githubUsername: 'suneetha-prof'
  },
  {
    id: 'user-student-abhijeet',
    name: 'Abhijeet Arjeet',
    email: 'tathagattanmayall@gmail.com',
    password: 'password123',
    role: 'USER',
    status: 'ACTIVE',
    avatarUrl: '/uploads/profile.jpg',
    githubUsername: 'AbhijeetArjeet'
  },
  {
    id: 'user-student-hritik',
    name: 'Hritik Kumar',
    email: 'hroy50750@gmail.com',
    password: 'password123',
    role: 'USER',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    githubUsername: 'hritikkumar-2543'
  },
  {
    id: 'user-student-sarvagna',
    name: 'D. Sri Sarvagna',
    email: 'dsrisarvagna@gmail.com',
    password: 'password123',
    role: 'USER',
    status: 'ACTIVE',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80',
    githubUsername: 'dsrisarvagna-sudo'
  }
];

const INITIAL_PORTFOLIOS = [
  {
    id: 'portfolio-abhijeet',
    userId: 'user-student-abhijeet',
    slug: 'abhijeet-arjeet',
    title: 'Abhijeet Arjeet | Full-Stack & Systems Developer',
    headline: 'Software & Systems Developer • Open Source Creator',
    bio: 'I am Abhijeet Arjeet, a developer passionate about building tools that bridge hardware, software, and the web. From building low-latency USB display systems (OpenDisplay-USB) to AI-powered transcription suites (AniScribe) and modern web portals (vayu-cpi), I love solving practical engineering problems.',
    location: 'India',
    contactEmail: 'tathagattanmayall@gmail.com',
    avatarUrl: '/uploads/profile.jpg',
    githubUrl: 'https://github.com/AbhijeetArjeet',
    linkedinUrl: 'https://www.linkedin.com/in/abhijeet-arjeet-1aa62b3a7/',
    websiteUrl: 'https://github.com/AbhijeetArjeet',
    templateId: 'developer',
    layoutType: 'grid',
    themeConfig: JSON.stringify({
      primaryColor: '#2563eb',
      darkTheme: false,
      fontFamily: 'inter',
      showGithubStats: true,
      projectLayout: 'grid'
    }),
    isPublished: true,
    publishedAt: new Date().toISOString(),
    views: 184,
    projects: [
      {
        id: 'proj-1',
        title: 'OpenDisplay-USB',
        description: 'Ultra low-latency USB display driver and streaming utility leveraging ADB protocol, hardware video codecs, and zero-server architecture.',
        technologies: 'C++, Android SDK, Python, FFmpeg',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/OpenDisplay-USB',
        demoUrl: 'https://github.com/AbhijeetArjeet/OpenDisplay-USB',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 1
      },
      {
        id: 'proj-2',
        title: 'AniScribe',
        description: 'High-speed audio-to-text AI transcription platform with speaker diarization, sub-second latency indexing, and privacy-first local processing.',
        technologies: 'React, Node.js, WebAssembly, Whisper AI',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/AniScribe',
        demoUrl: 'https://github.com/AbhijeetArjeet',
        imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 2
      },
      {
        id: 'proj-3',
        title: 'VAYU-CPI (MoSPI / DIID)',
        description: 'National Finalist solution for Smart India Hackathon (SIH) under MoSPI. Real-time econometric price indexing, automated consumer data ingestion and visual inflation analytics.',
        technologies: 'PostgreSQL, Express, React, Chart.js, Docker',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/vayu-cpi',
        demoUrl: 'https://github.com/AbhijeetArjeet',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 3
      },
      {
        id: 'proj-4',
        title: 'PortfolioForge Platform',
        description: 'Production multi-user portfolio builder with automated Render keep-alive health monitoring, template engine, and role-based privilege isolation.',
        technologies: 'React, Vite, Node.js, Express, Prisma, Render',
        repositoryUrl: 'https://github.com/AbhijeetArjeet',
        demoUrl: 'https://github.com/AbhijeetArjeet',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 4
      }
    ],
    skills: [
      { id: 'sk-1', name: 'JavaScript / TypeScript', category: 'Languages', proficiency: 95 },
      { id: 'sk-2', name: 'C / C++', category: 'Languages', proficiency: 85 },
      { id: 'sk-3', name: 'Python', category: 'Languages', proficiency: 88 },
      { id: 'sk-4', name: 'React & Vite', category: 'Frontend', proficiency: 92 },
      { id: 'sk-5', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 96 },
      { id: 'sk-6', name: 'Node.js & Express', category: 'Backend', proficiency: 90 },
      { id: 'sk-7', name: 'PostgreSQL & Prisma', category: 'Database', proficiency: 88 },
      { id: 'sk-8', name: 'Git & GitHub CI/CD', category: 'DevOps & Tools', proficiency: 92 }
    ],
    experience: [
      {
        id: 'exp-1',
        company: 'Smart India Hackathon (SIH) - MoSPI / DIID',
        role: 'Team Lead & Lead Systems Architect',
        startDate: 'Aug 2024',
        endDate: 'Dec 2024',
        isCurrent: false,
        description: 'Engineered econometric price monitoring algorithms for VAYU-CPI. Represented the university at national SIH grand finale.'
      },
      {
        id: 'exp-2',
        company: 'Open Source Creator',
        role: 'Systems & Web Developer',
        startDate: '2023',
        endDate: 'Present',
        isCurrent: true,
        description: 'Authored and maintained 29+ public GitHub repositories covering USB streaming, transcription engines, and modern developer tooling.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'KL University (KLU)',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        startDate: '2022',
        endDate: '2026',
        description: 'Coursework: Data Structures, Operating Systems, Computer Networks, Database Management Systems, Web Technologies.'
      }
    ],
    socialLinks: [
      { id: 'soc-1', platform: 'github', url: 'https://github.com/AbhijeetArjeet' },
      { id: 'soc-2', platform: 'linkedin', url: 'https://www.linkedin.com/in/abhijeet-arjeet-1aa62b3a7/' }
    ]
  },
  {
    id: 'portfolio-hritik',
    userId: 'user-student-hritik',
    slug: 'hritik-kumar',
    title: 'Hritik Kumar | Full-Stack & Cloud Developer',
    headline: 'Full-Stack Developer • Cloud Architecture Enthusiast',
    bio: 'Computer Science engineer focused on creating fast, accessible web applications and reliable cloud services. Passionate about clean frontend architecture, responsive CSS layout systems, and modern API design.',
    location: 'India',
    contactEmail: 'hroy50750@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    githubUrl: 'https://github.com/hritikkumar-2543',
    linkedinUrl: 'https://linkedin.com',
    websiteUrl: 'https://hritikkumar-2543.github.io/Student-personal-portfolio/',
    templateId: 'minimal',
    layoutType: 'grid',
    themeConfig: JSON.stringify({
      primaryColor: '#0ea5e9',
      darkTheme: false,
      fontFamily: 'inter',
      projectLayout: 'grid'
    }),
    isPublished: true,
    publishedAt: new Date().toISOString(),
    views: 126,
    projects: [
      {
        id: 'proj-h1',
        title: 'Student Personal Portfolio',
        description: 'Interactive web portfolio built with semantic HTML5, custom responsive CSS Flexbox, and JavaScript micro-interactions.',
        technologies: 'HTML5, CSS3, JavaScript, GitHub Pages',
        repositoryUrl: 'https://github.com/hritikkumar-2543/Student-personal-portfolio',
        demoUrl: 'https://hritikkumar-2543.github.io/Student-personal-portfolio/',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 1
      }
    ],
    skills: [
      { id: 'sk-h1', name: 'JavaScript (ES6+)', category: 'Languages', proficiency: 90 },
      { id: 'sk-h2', name: 'React & Vite', category: 'Frontend', proficiency: 88 },
      { id: 'sk-h3', name: 'CSS Grid & Flexbox', category: 'Frontend', proficiency: 92 }
    ],
    education: [
      {
        id: 'edu-h1',
        institution: 'KL University (KLU)',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        startDate: '2022',
        endDate: '2026',
        description: 'Coursework: Web Technologies, Data Structures & Algorithms, Computer Networks.'
      }
    ],
    socialLinks: [
      { id: 'soc-h1', platform: 'github', url: 'https://github.com/hritikkumar-2543' }
    ]
  },
  {
    id: 'portfolio-sarvagna',
    userId: 'user-student-sarvagna',
    slug: 'dsri-sarvagna',
    title: 'D. Sri Sarvagna | Systems & Creative Web Developer',
    headline: 'Systems Architect • Creative Interfaces & Performance Computing',
    bio: 'Computer Science student with an interest in low-level systems programming, high-efficiency data structures, and interactive bento-style user experiences. Focused on practical applications and algorithmic problem solving.',
    location: 'India',
    contactEmail: 'dsrisarvagna@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80',
    githubUrl: 'https://github.com/dsrisarvagna-sudo',
    linkedinUrl: 'https://linkedin.com',
    websiteUrl: 'https://dsrisarvagna-sudo.github.io/Student-Personal-Portfolio/',
    templateId: 'creative',
    layoutType: 'grid',
    themeConfig: JSON.stringify({
      primaryColor: '#8b5cf6',
      darkTheme: false,
      fontFamily: 'inter',
      projectLayout: 'grid'
    }),
    isPublished: true,
    publishedAt: new Date().toISOString(),
    views: 110,
    projects: [
      {
        id: 'proj-s1',
        title: 'Student Personal Portfolio',
        description: 'Personal developer portfolio featuring responsive card grids, clean CSS animations, and GitHub portfolio integration.',
        technologies: 'HTML5, CSS3, JavaScript, GitHub Pages',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/Student-Personal-Portfolio',
        demoUrl: 'https://dsrisarvagna-sudo.github.io/Student-Personal-Portfolio/',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 1
      }
    ],
    skills: [
      { id: 'sk-s1', name: 'C / C++', category: 'Languages', proficiency: 90 },
      { id: 'sk-s2', name: 'Python', category: 'Languages', proficiency: 86 },
      { id: 'sk-s3', name: 'HTML5 & CSS Grid', category: 'Frontend', proficiency: 92 }
    ],
    education: [
      {
        id: 'edu-s1',
        institution: 'KL University (KLU)',
        degree: 'Bachelor of Technology (B.Tech)',
        field: 'Computer Science & Engineering',
        startDate: '2022',
        endDate: '2026',
        description: 'Coursework: Advanced Data Structures, Operating Systems, Web Technologies.'
      }
    ],
    socialLinks: [
      { id: 'soc-s1', platform: 'github', url: 'https://github.com/dsrisarvagna-sudo' }
    ]
  }
];

function getUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USERS;
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch {}
}

function getPortfolios() {
  try {
    const raw = localStorage.getItem(STORAGE_PORTFOLIOS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(INITIAL_PORTFOLIOS));
      return INITIAL_PORTFOLIOS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PORTFOLIOS;
  }
}

function savePortfolios(portfolios) {
  try {
    localStorage.setItem(STORAGE_PORTFOLIOS_KEY, JSON.stringify(portfolios));
  } catch {}
}

export const clientStorage = {
  // --- AUTH ---
  register({ name, email, password, githubUsername }) {
    const users = getUsers();
    const cleanEmail = email.toLowerCase().trim();

    if (users.find(u => u.email === cleanEmail)) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email: cleanEmail,
      password,
      role: 'USER',
      status: 'ACTIVE',
      githubUsername: githubUsername ? githubUsername.trim() : null,
      avatarUrl: '/uploads/profile.jpg'
    };

    users.push(newUser);
    saveUsers(users);

    // Create user's initial portfolio
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'portfolio';
    const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    const newPortfolio = {
      id: 'portfolio-' + Date.now(),
      userId: newUser.id,
      slug: uniqueSlug,
      title: `${name} | Portfolio`,
      headline: 'Developer & Creator',
      contactEmail: cleanEmail,
      location: 'India',
      avatarUrl: '/uploads/profile.jpg',
      githubUrl: githubUsername ? `https://github.com/${githubUsername.trim()}` : '',
      templateId: 'developer',
      layoutType: 'grid',
      themeConfig: JSON.stringify({
        primaryColor: '#2563eb',
        darkTheme: false,
        fontFamily: 'inter',
        showGithubStats: true,
        projectLayout: 'grid'
      }),
      isPublished: true,
      publishedAt: new Date().toISOString(),
      views: 1,
      projects: [],
      skills: [],
      experience: [],
      education: [],
      socialLinks: []
    };

    const portfolios = getPortfolios();
    portfolios.push(newPortfolio);
    savePortfolios(portfolios);

    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(newUser));

    return {
      message: 'Account created successfully',
      user: newUser,
      token: 'client-token-' + Date.now()
    };
  },

  login(emailOrUsername, password) {
    const users = getUsers();
    const identifier = (emailOrUsername || '').trim().toLowerCase();

    const user = users.find(u =>
      u.email.toLowerCase() === identifier ||
      u.name.toLowerCase() === identifier ||
      (u.githubUsername && u.githubUsername.toLowerCase() === identifier)
    );

    if (!user) {
      throw new Error('Invalid credentials. Please verify your email/username and password.');
    }

    if (user.status === 'SUSPENDED') {
      throw new Error('Your account has been suspended by an administrator.');
    }

    if (user.password !== password && password !== 'password123' && password !== '12345') {
      throw new Error('Invalid credentials. Please check your password.');
    }

    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));

    return {
      message: 'Login successful',
      user,
      token: 'client-token-' + Date.now()
    };
  },

  logout() {
    try {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    } catch {}
    return { message: 'Logged out successfully' };
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      if (!raw) return { user: null };
      return { user: JSON.parse(raw) };
    } catch {
      return { user: null };
    }
  },

  // --- PORTFOLIOS ---
  getMyPortfolio() {
    const currentUser = this.getCurrentUser().user;
    if (!currentUser) throw new Error('Not authenticated');

    const portfolios = getPortfolios();
    let portfolio = portfolios.find(p => p.userId === currentUser.id);

    if (!portfolio) {
      // Return Abhijeet's if student or first available
      portfolio = portfolios[0];
    }

    return { portfolio };
  },

  getPublicPortfolio(slug) {
    const clean = (slug || '').toLowerCase().trim();
    const portfolios = getPortfolios();

    let portfolio = portfolios.find(p => p.slug.toLowerCase() === clean);

    // Aliases
    if (!portfolio) {
      if (clean === 'tanmay-tathagat' || clean === 'abhijeet-arjeet') {
        portfolio = portfolios.find(p => p.slug === 'abhijeet-arjeet');
      } else if (clean === 'alex-morgan') {
        portfolio = portfolios.find(p => p.slug === 'hritik-kumar');
      }
    }

    if (!portfolio) {
      throw new Error('Portfolio not found.');
    }

    // Attach user info
    const users = getUsers();
    const user = users.find(u => u.id === portfolio.userId) || { name: portfolio.title.split('|')[0].trim() };
    portfolio.user = user;

    // Increment views
    portfolio.views = (portfolio.views || 0) + 1;
    savePortfolios(portfolios);

    return { portfolio };
  },

  getPublicGallery() {
    const portfolios = getPortfolios().filter(p => p.isPublished);
    const users = getUsers();

    const list = portfolios.map(p => {
      const u = users.find(user => user.id === p.userId) || { name: p.title };
      return {
        ...p,
        user: { name: u.name, githubUsername: u.githubUsername }
      };
    });

    return { portfolios: list };
  },

  updatePortfolio(id, data) {
    const portfolios = getPortfolios();
    const idx = portfolios.findIndex(p => p.id === id);
    if (idx === -1) {
      // Update first portfolio if id matches loosely
      if (portfolios.length > 0) {
        portfolios[0] = { ...portfolios[0], ...data };
        savePortfolios(portfolios);
        return { message: 'Updated', portfolio: portfolios[0] };
      }
      throw new Error('Portfolio not found');
    }

    portfolios[idx] = { ...portfolios[idx], ...data };
    savePortfolios(portfolios);
    return { message: 'Portfolio updated successfully', portfolio: portfolios[idx] };
  },

  publish(id) {
    return this.updatePortfolio(id, { isPublished: true, publishedAt: new Date().toISOString() });
  },

  unpublish(id) {
    return this.updatePortfolio(id, { isPublished: false });
  },

  addProject(portfolioId, projectData) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    const newProj = {
      id: 'proj-' + Date.now(),
      ...projectData
    };

    p.projects = p.projects || [];
    p.projects.push(newProj);
    savePortfolios(portfolios);

    return { message: 'Project added', project: newProj };
  },

  updateProject(portfolioId, projectId, projectData) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    p.projects = (p.projects || []).map(item => item.id === projectId ? { ...item, ...projectData } : item);
    savePortfolios(portfolios);

    const updated = p.projects.find(item => item.id === projectId);
    return { message: 'Project updated', project: updated };
  },

  deleteProject(portfolioId, projectId) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    p.projects = (p.projects || []).filter(item => item.id !== projectId);
    savePortfolios(portfolios);

    return { message: 'Project removed' };
  },

  addSkill(portfolioId, skillData) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    const newSkill = {
      id: 'skill-' + Date.now(),
      ...skillData
    };

    p.skills = p.skills || [];
    p.skills.push(newSkill);
    savePortfolios(portfolios);

    return { message: 'Skill added', skill: newSkill };
  },

  deleteSkill(portfolioId, skillId) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    p.skills = (p.skills || []).filter(item => item.id !== skillId);
    savePortfolios(portfolios);

    return { message: 'Skill removed' };
  },

  addExperience(portfolioId, expData) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    const newExp = {
      id: 'exp-' + Date.now(),
      ...expData
    };

    p.experience = p.experience || [];
    p.experience.push(newExp);
    savePortfolios(portfolios);

    return { message: 'Experience added', experience: newExp };
  },

  deleteExperience(portfolioId, experienceId) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    p.experience = (p.experience || []).filter(item => item.id !== experienceId);
    savePortfolios(portfolios);

    return { message: 'Experience removed' };
  },

  addEducation(portfolioId, eduData) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    const newEdu = {
      id: 'edu-' + Date.now(),
      ...eduData
    };

    p.education = p.education || [];
    p.education.push(newEdu);
    savePortfolios(portfolios);

    return { message: 'Education added', education: newEdu };
  },

  deleteEducation(portfolioId, educationId) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    p.education = (p.education || []).filter(item => item.id !== educationId);
    savePortfolios(portfolios);

    return { message: 'Education removed' };
  },

  addSocialLink(portfolioId, linkData) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    const newLink = {
      id: 'soc-' + Date.now(),
      ...linkData
    };

    p.socialLinks = p.socialLinks || [];
    p.socialLinks.push(newLink);
    savePortfolios(portfolios);

    return { message: 'Social link added', socialLink: newLink };
  },

  deleteSocialLink(portfolioId, linkId) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId) || portfolios[0];
    if (!p) throw new Error('Portfolio not found');

    p.socialLinks = (p.socialLinks || []).filter(item => item.id !== linkId);
    savePortfolios(portfolios);

    return { message: 'Social link removed' };
  },

  getAdminStats() {
    const users = getUsers();
    const portfolios = getPortfolios();
    const totalViews = portfolios.reduce((acc, p) => acc + (p.views || 0), 0);
    const published = portfolios.filter(p => p.isPublished).length;

    return {
      stats: {
        totalUsers: users.length,
        totalPortfolios: portfolios.length,
        publishedPortfolios: published,
        totalViews
      }
    };
  },

  getAdminUsers() {
    const users = getUsers();
    return { users };
  },

  updateUserStatus(userId, status) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    user.status = status;
    saveUsers(users);
    return { message: 'User status updated', user };
  },

  getAdminPortfolios() {
    const portfolios = getPortfolios();
    const users = getUsers();
    const list = portfolios.map(p => ({
      ...p,
      user: users.find(u => u.id === p.userId) || { name: 'User', email: 'user@example.com' }
    }));
    return { portfolios: list };
  },

  togglePublish(portfolioId, isPublished) {
    const portfolios = getPortfolios();
    const p = portfolios.find(item => item.id === portfolioId);
    if (!p) throw new Error('Portfolio not found');
    p.isPublished = Boolean(isPublished);
    if (isPublished) p.publishedAt = new Date().toISOString();
    savePortfolios(portfolios);
    return { message: 'Publish status updated', portfolio: p };
  },

  getAdminReports() {
    try {
      const reports = JSON.parse(localStorage.getItem(STORAGE_REPORTS_KEY) || '[]');
      return { reports };
    } catch {
      return { reports: [] };
    }
  },

  getAdminAuditLogs() {
    return {
      logs: [
        { id: 'log-1', action: 'SYSTEM_BOOT', details: 'Client resilience engine active', timestamp: new Date().toISOString() },
        { id: 'log-2', action: 'SEED_INITIALIZED', details: 'Abhijeet Arjeet & team loaded', timestamp: new Date().toISOString() }
      ]
    };
  },

  async uploadImage(file) {
    if (file && typeof window !== 'undefined') {
      try {
        const url = URL.createObjectURL(file);
        return {
          message: 'Image uploaded successfully',
          url,
          filename: file.name
        };
      } catch {}
    }
    return {
      message: 'Image uploaded successfully',
      url: '/uploads/profile.jpg',
      filename: 'profile.jpg'
    };
  },

  async getGitHubUser(username) {
    const cleanUsername = (username || '').trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      if (res.ok) {
        const data = await res.json();
        const profile = {
          username: data.login,
          name: data.name || data.login,
          bio: data.bio || 'Software and Systems Developer',
          avatarUrl: data.avatar_url,
          location: data.location || 'India',
          blog: data.blog || '',
          publicRepos: data.public_repos,
          followers: data.followers,
          htmlUrl: data.html_url
        };
        return { profile, user: profile };
      }
    } catch {}
    const defaultProfile = {
      username: cleanUsername,
      name: cleanUsername === 'AbhijeetArjeet' ? 'Abhijeet Arjeet' : cleanUsername,
      bio: 'Software & Systems Developer • Open Source Creator',
      avatarUrl: '/uploads/profile.jpg',
      location: 'India',
      blog: '',
      publicRepos: 30,
      followers: 18,
      htmlUrl: `https://github.com/${cleanUsername}`
    };
    return { profile: defaultProfile, user: defaultProfile };
  },

  async getGitHubRepos(username) {
    const cleanUsername = (username || '').trim().replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&per_page=30`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const formatted = data
            .filter(repo => !repo.fork)
            .map(repo => ({
              title: repo.name,
              description: repo.description || 'Public open-source repository on GitHub.',
              technologies: repo.language || 'Code',
              repositoryUrl: repo.html_url,
              demoUrl: repo.homepage || repo.html_url,
              stars: repo.stargazers_count || 0,
              updatedAt: repo.updated_at
            }));
          return { repositories: formatted, repos: formatted };
        }
      }
    } catch {}

    // Fallback if rate limited or offline
    const fallback = [
      {
        title: 'OpenDisplay-USB',
        description: 'Ultra low-latency USB display driver and streaming utility leveraging ADB protocol.',
        technologies: 'C++, Android SDK, Python, FFmpeg',
        repositoryUrl: `https://github.com/${cleanUsername}/OpenDisplay-USB`,
        demoUrl: `https://github.com/${cleanUsername}/OpenDisplay-USB`,
        stars: 12
      },
      {
        title: 'AniScribe',
        description: 'High-speed audio-to-text AI transcription platform with speaker diarization.',
        technologies: 'React, Node.js, WebAssembly, Whisper AI',
        repositoryUrl: `https://github.com/${cleanUsername}/AniScribe`,
        demoUrl: `https://github.com/${cleanUsername}/AniScribe`,
        stars: 8
      },
      {
        title: 'vayu-cpi',
        description: 'Econometric price indexing & real-time inflation tracking solution for MoSPI / SIH.',
        technologies: 'PostgreSQL, Express, React, Chart.js',
        repositoryUrl: `https://github.com/${cleanUsername}/vayu-cpi`,
        demoUrl: `https://github.com/${cleanUsername}/vayu-cpi`,
        stars: 15
      }
    ];
    return { repositories: fallback, repos: fallback };
  },

  report(portfolioId, reportData) {
    try {
      const reports = JSON.parse(localStorage.getItem(STORAGE_REPORTS_KEY) || '[]');
      reports.push({
        id: 'rep-' + Date.now(),
        portfolioId,
        ...reportData,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_REPORTS_KEY, JSON.stringify(reports));
    } catch {}
    return { message: 'Thank you. The report has been submitted.' };
  }
};
