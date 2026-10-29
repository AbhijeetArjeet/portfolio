const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial platform data with real verified profiles...');

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

  const adminPasswordHash = await bcrypt.hash('mam', 10);
  const userPasswordHash = await bcrypt.hash('password123', 10);

  // 1. Create Faculty Evaluator / Admin (Sunita Bulla)
  const admin = await prisma.user.create({
    data: {
      name: 'Sunita Bulla',
      email: 'sunita.bulla@university.edu',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      githubUsername: 'sunitabulla'
    }
  });

  console.log(`Created Admin: ${admin.name} (${admin.email})`);

  // 2. Create Abhijeet Arjeet (Student / Creator)
  const abhijeet = await prisma.user.create({
    data: {
      name: 'Abhijeet Arjeet',
      email: 'abhijeet@example.com',
      passwordHash: userPasswordHash,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: 'https://avatars.githubusercontent.com/u/213563458?v=4',
      githubUsername: 'AbhijeetArjeet'
    }
  });

  console.log(`Created User 1: ${abhijeet.name} (${abhijeet.email})`);

  // Create Abhijeet's published Portfolio
  const abhijeetPortfolio = await prisma.portfolio.create({
    data: {
      userId: abhijeet.id,
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
        darkTheme: true,
        fontFamily: 'inter',
        showGithubStats: true,
        projectLayout: 'grid'
      }),
      sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'experience', 'education']),
      isPublished: true,
      publishedAt: new Date(),
      views: 184
    }
  });

  // Real Projects for Abhijeet Arjeet
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
        demoUrl: 'https://github.com/AbhijeetArjeet/AniScribe',
        imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 2
      },
      {
        portfolioId: abhijeetPortfolio.id,
        title: 'AURA',
        description: 'Modern responsive audio visualizer & music playback suite with reactive canvas waveforms, spectrum analysis, and custom themes.',
        technologies: 'JavaScript, Web Audio API, Canvas, CSS3',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/AURA',
        demoUrl: 'https://github.com/AbhijeetArjeet/AURA',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 3
      },
      {
        portfolioId: abhijeetPortfolio.id,
        title: 'dualboot-clock-fix',
        description: 'Hardware Real-Time Clock (RTC) synchronizer resolving UTC / local-time clock drift across dual-boot Windows and Linux machines.',
        technologies: 'Shell, PowerShell, Batch, Linux Kernel RTC',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/dualboot-clock-fix',
        demoUrl: 'https://github.com/AbhijeetArjeet/dualboot-clock-fix',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        featured: false,
        displayOrder: 4
      },
      {
        portfolioId: abhijeetPortfolio.id,
        title: 'PortfolioForge Platform',
        description: 'Full-Stack custom portfolio builder with dynamic template engines, Neon cloud PostgreSQL persistence, LinkedIn integration, and admin moderation.',
        technologies: 'React 18, Vite, Node.js, Express, Prisma, PostgreSQL',
        repositoryUrl: 'https://github.com/AbhijeetArjeet/portfolio',
        demoUrl: 'https://github.com/AbhijeetArjeet/portfolio',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 5
      }
    ]
  });

  // Skills for Abhijeet
  await prisma.skill.createMany({
    data: [
      { portfolioId: abhijeetPortfolio.id, name: 'JavaScript & TypeScript', category: 'Languages', proficiency: 95, displayOrder: 1 },
      { portfolioId: abhijeetPortfolio.id, name: 'C / C++', category: 'Languages', proficiency: 88, displayOrder: 2 },
      { portfolioId: abhijeetPortfolio.id, name: 'Python', category: 'Languages', proficiency: 85, displayOrder: 3 },
      { portfolioId: abhijeetPortfolio.id, name: 'React & Vite', category: 'Frontend', proficiency: 94, displayOrder: 4 },
      { portfolioId: abhijeetPortfolio.id, name: 'HTML5 & CSS3 (Grid/Flexbox)', category: 'Frontend', proficiency: 96, displayOrder: 5 },
      { portfolioId: abhijeetPortfolio.id, name: 'Node.js & Express', category: 'Backend', proficiency: 90, displayOrder: 6 },
      { portfolioId: abhijeetPortfolio.id, name: 'PostgreSQL & Prisma', category: 'Database', proficiency: 88, displayOrder: 7 },
      { portfolioId: abhijeetPortfolio.id, name: 'Git & GitHub CI/CD', category: 'DevOps & Tools', proficiency: 92, displayOrder: 8 },
      { portfolioId: abhijeetPortfolio.id, name: 'Linux & Hardware Tooling', category: 'Systems', proficiency: 86, displayOrder: 9 }
    ]
  });

  // Education for Abhijeet
  await prisma.education.create({
    data: {
      portfolioId: abhijeetPortfolio.id,
      institution: 'University Engineering College',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      description: 'Coursework: Data Structures, Operating Systems, Computer Networks, Database Management Systems, Web Technologies.'
    }
  });

  // Social Links for Abhijeet
  await prisma.socialLink.createMany({
    data: [
      { portfolioId: abhijeetPortfolio.id, platform: 'github', url: 'https://github.com/AbhijeetArjeet' },
      { portfolioId: abhijeetPortfolio.id, platform: 'linkedin', url: 'https://www.linkedin.com/in/abhijeet-arjeet-1aa62b3a7/' }
    ]
  });

  // 3. Create Hritik Kumar (Student / Creator)
  const hritik = await prisma.user.create({
    data: {
      name: 'Hritik Kumar',
      email: 'hritik@example.com',
      passwordHash: userPasswordHash,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: 'https://avatars.githubusercontent.com/u/257158052?v=4',
      githubUsername: 'Hritikkumar-2543'
    }
  });

  console.log(`Created User 2: ${hritik.name} (${hritik.email})`);

  // Create Hritik's published Portfolio
  const hritikPortfolio = await prisma.portfolio.create({
    data: {
      userId: hritik.id,
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
        darkTheme: true,
        fontFamily: 'inter',
        projectLayout: 'grid'
      }),
      sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'education']),
      isPublished: true,
      publishedAt: new Date(),
      views: 95
    }
  });

  // Real Projects for Hritik Kumar
  await prisma.project.createMany({
    data: [
      {
        portfolioId: hritikPortfolio.id,
        title: 'Student-personal-portfolio',
        description: 'Responsive student personal portfolio web application featuring interactive project showcases, skill assessments, and modern responsive layouts.',
        technologies: 'HTML5, CSS3, JavaScript, Responsive Design',
        repositoryUrl: 'https://github.com/Hritikkumar-2543/Student-personal-portfolio',
        demoUrl: 'https://github.com/Hritikkumar-2543/Student-personal-portfolio',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 1
      },
      {
        portfolioId: hritikPortfolio.id,
        title: 'Web Portfolio Application',
        description: 'Interactive modern portfolio platform showcasing coursework achievements, web architecture, and clean UI engineering.',
        technologies: 'JavaScript, CSS Grid, Semantic HTML',
        repositoryUrl: 'https://github.com/Hritikkumar-2543/portfolio',
        demoUrl: 'https://github.com/Hritikkumar-2543/portfolio',
        imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 2
      }
    ]
  });

  // Skills for Hritik
  await prisma.skill.createMany({
    data: [
      { portfolioId: hritikPortfolio.id, name: 'HTML5 & Semantic Markup', category: 'Frontend', proficiency: 95, displayOrder: 1 },
      { portfolioId: hritikPortfolio.id, name: 'CSS3 & Responsive Layouts', category: 'Frontend', proficiency: 92, displayOrder: 2 },
      { portfolioId: hritikPortfolio.id, name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 88, displayOrder: 3 },
      { portfolioId: hritikPortfolio.id, name: 'React & Modern UI', category: 'Frontend', proficiency: 82, displayOrder: 4 },
      { portfolioId: hritikPortfolio.id, name: 'Git & GitHub Collaboration', category: 'DevOps & Tools', proficiency: 85, displayOrder: 5 },
      { portfolioId: hritikPortfolio.id, name: 'Web Accessibility & UI Design', category: 'Frontend', proficiency: 86, displayOrder: 6 }
    ]
  });

  // Education for Hritik
  await prisma.education.create({
    data: {
      portfolioId: hritikPortfolio.id,
      institution: 'University Engineering College',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      description: 'Coursework: Web Development, Data Structures, Software Engineering, Database Systems.'
    }
  });

  // Social Links for Hritik
  await prisma.socialLink.createMany({
    data: [
      { portfolioId: hritikPortfolio.id, platform: 'github', url: 'https://github.com/Hritikkumar-2543' },
      { portfolioId: hritikPortfolio.id, platform: 'linkedin', url: 'https://www.linkedin.com/in/hritik-kumar-5857963a8/' }
    ]
  });

  // 4. Create Duggiralapati Sri Sarvagna (Student / Creator)
  const sarvagna = await prisma.user.create({
    data: {
      name: 'Duggiralapati Sri Sarvagna',
      email: 'sarvagna@example.com',
      passwordHash: userPasswordHash,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: 'https://avatars.githubusercontent.com/u/249986174?v=4',
      githubUsername: 'dsrisarvagna-sudo'
    }
  });

  console.log(`Created User 3: ${sarvagna.name} (${sarvagna.email})`);

  // Create Sarvagna's published Portfolio
  const sarvagnaPortfolio = await prisma.portfolio.create({
    data: {
      userId: sarvagna.id,
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
        darkTheme: true,
        fontFamily: 'inter',
        projectLayout: 'grid'
      }),
      sectionOrder: JSON.stringify(['bio', 'projects', 'skills', 'education']),
      isPublished: true,
      publishedAt: new Date(),
      views: 112
    }
  });

  // Real Projects for Duggiralapati Sri Sarvagna
  await prisma.project.createMany({
    data: [
      {
        portfolioId: sarvagnaPortfolio.id,
        title: 'KAREN-AI Desktop Assistant',
        description: 'Desktop AI assistant application leveraging speech synthesis, local language models, and automated system commands for hands-free productivity.',
        technologies: 'Python, SpeechRecognition, Pyttsx3, AI Automation',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/KAREN-AI',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/KAREN-AI',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 1
      },
      {
        portfolioId: sarvagnaPortfolio.id,
        title: 'CTCMS (Classroom Timetable & Course Management System)',
        description: 'Course timetable management platform streamlining classroom scheduling, teacher-student allocations, and schedule conflict resolution.',
        technologies: 'Python, SQLite / MySQL, Web Interfaces',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/CTCMS',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/CTCMS',
        imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 2
      },
      {
        portfolioId: sarvagnaPortfolio.id,
        title: 'Flappy Bird Game Engine',
        description: 'Interactive Flappy Bird recreation built using JavaScript canvas rendering, gravity simulation, and collision detection.',
        technologies: 'JavaScript, HTML5 Canvas, Game Physics',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/flappy-bird-game',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/flappy-bird-game',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        featured: false,
        displayOrder: 3
      },
      {
        portfolioId: sarvagnaPortfolio.id,
        title: 'Frontend Development Frameworks Lab Repository',
        description: 'Academic coursework repository containing production-grade frontend assignments, CSS Grid / Flexbox layouts, and component architectures.',
        technologies: 'React, HTML5, CSS3, JavaScript',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/25CS2101-FEDFW-Lab-Insem1',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/25CS2101-FEDFW-Lab-Insem1',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
        featured: true,
        displayOrder: 4
      },
      {
        portfolioId: sarvagnaPortfolio.id,
        title: 'Accessible Authentication UI',
        description: 'Modern and accessible authentication portal with input validation, state transitions, and mobile-first responsive layout.',
        technologies: 'HTML5, CSS3, JavaScript',
        repositoryUrl: 'https://github.com/dsrisarvagna-sudo/login_page',
        demoUrl: 'https://github.com/dsrisarvagna-sudo/login_page',
        imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&auto=format&fit=crop&q=80',
        featured: false,
        displayOrder: 5
      }
    ]
  });

  // Skills for Sarvagna
  await prisma.skill.createMany({
    data: [
      { portfolioId: sarvagnaPortfolio.id, name: 'Python & Scripting', category: 'Languages', proficiency: 92, displayOrder: 1 },
      { portfolioId: sarvagnaPortfolio.id, name: 'JavaScript & Web Technologies', category: 'Languages', proficiency: 88, displayOrder: 2 },
      { portfolioId: sarvagnaPortfolio.id, name: 'AI & Automation Models', category: 'Artificial Intelligence', proficiency: 85, displayOrder: 3 },
      { portfolioId: sarvagnaPortfolio.id, name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 90, displayOrder: 4 },
      { portfolioId: sarvagnaPortfolio.id, name: 'Database & Systems', category: 'Database', proficiency: 84, displayOrder: 5 },
      { portfolioId: sarvagnaPortfolio.id, name: 'Git & Version Control', category: 'DevOps & Tools', proficiency: 88, displayOrder: 6 }
    ]
  });

  // Education for Sarvagna
  await prisma.education.create({
    data: {
      portfolioId: sarvagnaPortfolio.id,
      institution: 'University Engineering College',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      description: 'Coursework: Frontend Development Frameworks, Database Systems, Artificial Intelligence, Operating Systems.'
    }
  });

  // Social Links for Sarvagna
  await prisma.socialLink.createMany({
    data: [
      { portfolioId: sarvagnaPortfolio.id, platform: 'github', url: 'https://github.com/dsrisarvagna-sudo' },
      { portfolioId: sarvagnaPortfolio.id, platform: 'linkedin', url: 'https://www.linkedin.com/in/duggiralapatisrisarvagna/' }
    ]
  });

  // Initial Audit Log
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'SYSTEM_INITIALIZED',
      targetType: 'PLATFORM',
      targetId: 'root',
      details: 'Initial system seed completed with Faculty Evaluator (Sunita Bulla) and 3 student portfolios (Abhijeet Arjeet, Hritik Kumar, Duggiralapati Sri Sarvagna).',
      ipAddress: '127.0.0.1'
    }
  });

  console.log('Database seeded successfully with verified real user portfolios!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
