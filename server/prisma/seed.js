const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial platform data with verified team profiles...');

  // Clean existing data for clean seed
  await prisma.portfolioReport.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.upload.deleteMany({});
  await prisma.socialLink.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.education.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.portfolio.deleteMany({});
  await prisma.user.deleteMany({});

  const adminPasswordHash = await bcrypt.hash('12345', 10);
  const userPasswordHash = await bcrypt.hash('password123', 10);

  // =========================================================================
  // 1. Faculty Evaluator / Admin (Suneetha Mam)
  // =========================================================================
  const admin = await prisma.user.create({
    data: {
      name: 'Suneetha Mam',
      email: 'suneetha@university.edu',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      githubUsername: 'suneetha-prof'
    }
  });
  console.log(`Created Admin: ${admin.name} (${admin.email})`);

  // =========================================================================
  // 2. Primary Creator / Student: Abhijeet Arjeet
  // =========================================================================
  const abhijeet = await prisma.user.create({
    data: {
      name: 'Abhijeet Arjeet',
      email: 'tathagattanmayall@gmail.com',
      passwordHash: userPasswordHash,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: '/uploads/profile.jpg',
      githubUsername: 'AbhijeetArjeet'
    }
  });
  console.log(`Created User: ${abhijeet.name} (${abhijeet.email})`);

  // Create Abhijeet's published Portfolio (Modern Developer Template)
  const abhijeetPortfolio = await prisma.portfolio.create({
    data: {
      userId: abhijeet.id,
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
      publishedAt: new Date(),
      views: 184
    }
  });

  // Projects for Abhijeet
  await prisma.project.createMany({
    data: [
      {
        portfolioId: abhijeetPortfolio.id,
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
        portfolioId: abhijeetPortfolio.id,
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
        portfolioId: abhijeetPortfolio.id,
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
        portfolioId: abhijeetPortfolio.id,
        title: 'PortfolioForge Platform',
        description: 'Production multi-user portfolio builder with automated Render keep-alive health monitoring, template engine, and role-based privilege isolation.',
        technologies: 'React, Vite, Node.js, Express, Prisma, Render',
        repositoryUrl: 'https://github.com/AbhijeetArjeet',
        demoUrl: 'https://portfolio-api-sample.onrender.com',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 4
      }
    ]
  });

  // Skills for Abhijeet
  await prisma.skill.createMany({
    data: [
      { portfolioId: abhijeetPortfolio.id, name: 'JavaScript / TypeScript', category: 'Languages', proficiency: 95, displayOrder: 1 },
      { portfolioId: abhijeetPortfolio.id, name: 'C / C++', category: 'Languages', proficiency: 85, displayOrder: 2 },
      { portfolioId: abhijeetPortfolio.id, name: 'Python', category: 'Languages', proficiency: 88, displayOrder: 3 },
      { portfolioId: abhijeetPortfolio.id, name: 'React & Vite', category: 'Frontend', proficiency: 92, displayOrder: 4 },
      { portfolioId: abhijeetPortfolio.id, name: 'HTML5 & CSS3 (Grid/Flexbox)', category: 'Frontend', proficiency: 96, displayOrder: 5 },
      { portfolioId: abhijeetPortfolio.id, name: 'Node.js & Express', category: 'Backend', proficiency: 90, displayOrder: 6 },
      { portfolioId: abhijeetPortfolio.id, name: 'PostgreSQL & Prisma', category: 'Database', proficiency: 88, displayOrder: 7 },
      { portfolioId: abhijeetPortfolio.id, name: 'Git & GitHub CI/CD', category: 'DevOps & Tools', proficiency: 92, displayOrder: 8 },
      { portfolioId: abhijeetPortfolio.id, name: 'Linux & Docker', category: 'DevOps & Tools', proficiency: 84, displayOrder: 9 }
    ]
  });

  // Experience for Abhijeet
  await prisma.experience.createMany({
    data: [
      {
        portfolioId: abhijeetPortfolio.id,
        company: 'Smart India Hackathon (SIH) - MoSPI / DIID',
        role: 'Team Lead & Lead Systems Architect',
        startDate: 'Aug 2024',
        endDate: 'Dec 2024',
        isCurrent: false,
        description: 'Engineered econometric price monitoring algorithms for VAYU-CPI. Represented the university at national SIH grand finale.'
      },
      {
        portfolioId: abhijeetPortfolio.id,
        company: 'Open Source Creator',
        role: 'Systems & Web Developer',
        startDate: '2023',
        endDate: 'Present',
        isCurrent: true,
        description: 'Authored and maintained 29+ public GitHub repositories covering USB streaming, transcription engines, and modern developer tooling.'
      }
    ]
  });

  // Education for Abhijeet
  await prisma.education.create({
    data: {
      portfolioId: abhijeetPortfolio.id,
      institution: 'KL University (KLU)',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      description: 'Coursework: Data Structures, Operating Systems, Computer Networks, Database Management Systems, Web Technologies (CO-1 / CO-2 compliant).'
    }
  });

  // Social Links for Abhijeet
  await prisma.socialLink.createMany({
    data: [
      { portfolioId: abhijeetPortfolio.id, platform: 'github', url: 'https://github.com/AbhijeetArjeet' },
      { portfolioId: abhijeetPortfolio.id, platform: 'linkedin', url: 'https://www.linkedin.com/in/abhijeet-arjeet-1aa62b3a7/' }
    ]
  });

  // =========================================================================
  // 3. Contributor & Student: Hritik Kumar
  // =========================================================================
  const hritik = await prisma.user.create({
    data: {
      name: 'Hritik Kumar',
      email: 'hroy50750@gmail.com',
      passwordHash: userPasswordHash,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      githubUsername: 'hritikkumar-2543'
    }
  });
  console.log(`Created User: ${hritik.name} (${hritik.email})`);

  // Create Hritik's published Portfolio (Minimal Professional Template)
  const hritikPortfolio = await prisma.portfolio.create({
    data: {
      userId: hritik.id,
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
      publishedAt: new Date(),
      views: 126
    }
  });

  await prisma.project.createMany({
    data: [
      {
        portfolioId: hritikPortfolio.id,
        title: 'Student Personal Portfolio',
        description: 'Interactive web portfolio built with semantic HTML5, custom responsive CSS Flexbox, and JavaScript micro-interactions.',
        technologies: 'HTML5, CSS3, JavaScript, GitHub Pages',
        repositoryUrl: 'https://github.com/hritikkumar-2543/Student-personal-portfolio',
        demoUrl: 'https://hritikkumar-2543.github.io/Student-personal-portfolio/',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 1
      },
      {
        portfolioId: hritikPortfolio.id,
        title: 'Cloud Microservices & API Gateway',
        description: 'Resilient API gateway with token-based rate limiting, circuit breaker patterns, and automated telemetry.',
        technologies: 'Node.js, Express, Redis, Docker',
        repositoryUrl: 'https://github.com/hritikkumar-2543',
        demoUrl: 'https://github.com/hritikkumar-2543',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 2
      }
    ]
  });

  await prisma.skill.createMany({
    data: [
      { portfolioId: hritikPortfolio.id, name: 'JavaScript (ES6+)', category: 'Languages', proficiency: 90, displayOrder: 1 },
      { portfolioId: hritikPortfolio.id, name: 'React & Vite', category: 'Frontend', proficiency: 88, displayOrder: 2 },
      { portfolioId: hritikPortfolio.id, name: 'CSS Grid & Flexbox', category: 'Frontend', proficiency: 92, displayOrder: 3 },
      { portfolioId: hritikPortfolio.id, name: 'Node.js & Express', category: 'Backend', proficiency: 86, displayOrder: 4 },
      { portfolioId: hritikPortfolio.id, name: 'PostgreSQL / SQL', category: 'Database', proficiency: 82, displayOrder: 5 }
    ]
  });

  await prisma.education.create({
    data: {
      portfolioId: hritikPortfolio.id,
      institution: 'KL University (KLU)',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      description: 'Coursework: Web Technologies, Data Structures & Algorithms, Computer Networks, Operating Systems.'
    }
  });

  await prisma.socialLink.createMany({
    data: [
      { portfolioId: hritikPortfolio.id, platform: 'github', url: 'https://github.com/hritikkumar-2543' },
      { portfolioId: hritikPortfolio.id, platform: 'website', url: 'https://hritikkumar-2543.github.io/Student-personal-portfolio/' }
    ]
  });

  // =========================================================================
  // 4. Contributor & Student: D. Sri Sarvagna
  // =========================================================================
  const sarvagna = await prisma.user.create({
    data: {
      name: 'D. Sri Sarvagna',
      email: 'dsrisarvagna@gmail.com',
      passwordHash: userPasswordHash,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80',
      githubUsername: 'dsrisarvagna-sudo'
    }
  });
  console.log(`Created User: ${sarvagna.name} (${sarvagna.email})`);

  // Create Sarvagna's published Portfolio (Creative Bento Showcase Template)
  const sarvagnaPortfolio = await prisma.portfolio.create({
    data: {
      userId: sarvagna.id,
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
      publishedAt: new Date(),
      views: 110
    }
  });

  await prisma.project.createMany({
    data: [
      {
        portfolioId: sarvagnaPortfolio.id,
        title: 'Student Personal Portfolio',
        description: 'Personal developer portfolio featuring responsive card grids, clean CSS animations, and GitHub portfolio integration.',
        technologies: 'HTML5, CSS3, JavaScript, GitHub Pages',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/Student-Personal-Portfolio',
        demoUrl: 'https://dsrisarvagna-sudo.github.io/Student-Personal-Portfolio/',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 1
      },
      {
        portfolioId: sarvagnaPortfolio.id,
        title: 'High-Performance Algorithmic Suite',
        description: 'Optimized graph search, tree traversal, and algorithmic simulation tools built with modern C++ and WebAssembly bindings.',
        technologies: 'C++, WebAssembly, Python, Algorithms',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo',
        demoUrl: 'https://github.com/dsrisarvagna-sudo',
        imageUrl: 'https://images.unsplash.com/photo-1516116211227-bbc045b85e05?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 2
      }
    ]
  });

  await prisma.skill.createMany({
    data: [
      { portfolioId: sarvagnaPortfolio.id, name: 'C / C++', category: 'Languages', proficiency: 90, displayOrder: 1 },
      { portfolioId: sarvagnaPortfolio.id, name: 'Python', category: 'Languages', proficiency: 86, displayOrder: 2 },
      { portfolioId: sarvagnaPortfolio.id, name: 'JavaScript / DOM', category: 'Languages', proficiency: 88, displayOrder: 3 },
      { portfolioId: sarvagnaPortfolio.id, name: 'HTML5 & CSS Grid', category: 'Frontend', proficiency: 92, displayOrder: 4 },
      { portfolioId: sarvagnaPortfolio.id, name: 'Data Structures & Algorithms', category: 'Systems', proficiency: 92, displayOrder: 5 }
    ]
  });

  await prisma.education.create({
    data: {
      portfolioId: sarvagnaPortfolio.id,
      institution: 'KL University (KLU)',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      description: 'Coursework: Advanced Data Structures, Operating Systems, Web Technologies, Database Systems.'
    }
  });

  await prisma.socialLink.createMany({
    data: [
      { portfolioId: sarvagnaPortfolio.id, platform: 'github', url: 'https://github.com/dsrisarvagna-sudo' },
      { portfolioId: sarvagnaPortfolio.id, platform: 'website', url: 'https://dsrisarvagna-sudo.github.io/Student-Personal-Portfolio/' }
    ]
  });

  // =========================================================================
  // Initial Audit Log
  // =========================================================================
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'SYSTEM_INITIALIZED',
      targetType: 'PLATFORM',
      targetId: 'root',
      details: 'Initial system seed completed with faculty evaluator and verified student creators (Abhijeet, Hritik, Sarvagna).',
      ipAddress: '127.0.0.1'
    }
  });

  console.log('✅ Database seeded successfully with real team profiles and no placeholder emails!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
