const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial platform data...');

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

  // 1. Create Faculty Evaluator / Admin (Suneetha Mam)
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

  // 2. Create Abhijeet Arjeet (Student / Creator)
  const abhijeet = await prisma.user.create({
    data: {
      name: 'Abhijeet Arjeet',
      email: 'abhijeet@example.com',
      passwordHash: userPasswordHash,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: '/uploads/profile.jpg',
      githubUsername: 'AbhijeetArjeet'
    }
  });

  console.log(`Created User: ${abhijeet.name} (${abhijeet.email})`);

  // Create Abhijeet's published Portfolio
  const abhijeetPortfolio = await prisma.portfolio.create({
    data: {
      userId: abhijeet.id,
      slug: 'abhijeet-arjeet',
      title: 'Abhijeet Arjeet | Full-Stack & Systems Developer',
      headline: 'Software & Systems Developer • Open Source Creator',
      bio: 'I am Abhijeet Arjeet, a developer passionate about building tools that bridge hardware, software, and the web. From building low-latency USB display systems (OpenDisplay-USB) to AI-powered transcription suites (AniScribe) and modern web portals (vayu-cpi), I love solving practical engineering problems.',
      location: 'India',
      contactEmail: 'abhijeet.dev@example.com',
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
      views: 142
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
        title: 'Portfolio Platform with Keep-Alive Monitoring',
        description: 'SaaS multi-user portfolio builder with automated Render keep-alive health monitoring, template engine, and role-based privilege isolation.',
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
      institution: 'University Engineering College',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science & Engineering',
      startDate: '2022',
      endDate: '2026',
      description: 'Coursework: Data Structures, Operating Systems, Computer Networks, Database Management Systems, Web Technologies (CO-1 / CO-2 compliant).'
    }
  });

  // Social Links
  await prisma.socialLink.createMany({
    data: [
      { portfolioId: abhijeetPortfolio.id, platform: 'github', url: 'https://github.com/AbhijeetArjeet' },
      { portfolioId: abhijeetPortfolio.id, platform: 'linkedin', url: 'https://www.linkedin.com/in/abhijeet-arjeet-1aa62b3a7/' }
    ]
  });

  // 3. Create Sample User (Alex Morgan)
  const alex = await prisma.user.create({
    data: {
      name: 'Alex Morgan',
      email: 'alex@example.com',
      passwordHash: userPasswordHash,
      role: 'USER',
      status: 'ACTIVE',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      githubUsername: 'alexmorgan-dev'
    }
  });

  const alexPortfolio = await prisma.portfolio.create({
    data: {
      userId: alex.id,
      slug: 'alex-morgan',
      title: 'Alex Morgan | Product Designer & Frontend Engineer',
      headline: 'Crafting thoughtful digital interfaces and design systems',
      bio: 'Product designer and creative developer building intuitive web experiences. Specializing in UI/UX systems and micro-interactions.',
      location: 'San Francisco, CA',
      contactEmail: 'alex@example.com',
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
      views: 58
    }
  });

  await prisma.project.createMany({
    data: [
      {
        portfolioId: alexPortfolio.id,
        title: 'Open-source Design System',
        description: 'Accessible, tokens-based design system with 40+ components built for React and Figma.',
        technologies: 'Figma, React, Tailwind, Storybook',
        repositoryUrl: 'https://github.com',
        demoUrl: 'https://github.com',
        featured: true,
        displayOrder: 1
      },
      {
        portfolioId: alexPortfolio.id,
        title: 'Fintech Dashboard UX',
        description: 'Redesign of high-frequency cryptocurrency and stock analytics terminal.',
        technologies: 'TypeScript, Next.js, D3.js',
        repositoryUrl: 'https://github.com',
        featured: true,
        displayOrder: 2
      }
    ]
  });

  // Initial Audit Log
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'SYSTEM_INITIALIZED',
      targetType: 'PLATFORM',
      targetId: 'root',
      details: 'Initial system seed completed with faculty evaluator and student creator portfolios.',
      ipAddress: '127.0.0.1'
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
