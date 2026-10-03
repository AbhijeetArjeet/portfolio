const prisma = require('../../config/prisma');

// Helper to include full relations
const portfolioIncludes = {
  projects: { orderBy: { displayOrder: 'asc' } },
  skills: { orderBy: { displayOrder: 'asc' } },
  experience: { orderBy: { startDate: 'desc' } },
  education: { orderBy: { startDate: 'desc' } },
  socialLinks: true,
  user: {
    select: { id: true, name: true, email: true, avatarUrl: true, githubUsername: true }
  }
};

exports.getMyPortfolio = async (req, res, next) => {
  try {
    let portfolio = await prisma.portfolio.findFirst({
      where: { userId: req.user.id },
      include: portfolioIncludes
    });

    if (!portfolio) {
      // Auto-create initial portfolio if user doesn't have one yet
      const baseSlug = req.user.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'portfolio';
      const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

      portfolio = await prisma.portfolio.create({
        data: {
          userId: req.user.id,
          slug: uniqueSlug,
          title: `${req.user.name} | Portfolio`,
          headline: 'Developer & Creator',
          contactEmail: req.user.email,
          templateId: 'minimal',
          layoutType: 'grid',
          isPublished: false,
          themeConfig: JSON.stringify({
            primaryColor: '#2563eb',
            darkTheme: false,
            fontFamily: 'inter',
            projectLayout: 'grid'
          })
        },
        include: portfolioIncludes
      });
    }

    res.json({ portfolio });
  } catch (err) {
    next(err);
  }
};

exports.getPublicPortfolio = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { slug: slug.toLowerCase() },
      include: portfolioIncludes
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    // Check if portfolio is unpublished
    if (!portfolio.isPublished) {
      // Only owner or admin can view unpublished preview
      const isOwner = req.user && req.user.id === portfolio.userId;
      const isAdmin = req.user && req.user.role === 'ADMIN';

      if (!isOwner && !isAdmin) {
        return res.status(404).json({
          error: 'This portfolio is currently a private draft and has not been published.'
        });
      }
    }

    // Increment view count asynchronously (safe idempotent view increment)
    prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { views: { increment: 1 } }
    }).catch(() => {});

    res.json({ portfolio });
  } catch (err) {
    next(err);
  }
};

exports.getPublicGallery = async (req, res, next) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { isPublished: true },
      take: 20,
      orderBy: { views: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        headline: true,
        templateId: true,
        avatarUrl: true,
        views: true,
        publishedAt: true,
        user: {
          select: { name: true, githubUsername: true }
        },
        projects: {
          take: 2,
          select: { id: true, title: true, description: true, imageUrl: true }
        }
      }
    });

    res.json({ portfolios });
  } catch (err) {
    next(err);
  }
};

exports.getPortfolioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: portfolioIncludes
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    if (portfolio.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized to view this private portfolio.' });
    }

    res.json({ portfolio });
  } catch (err) {
    next(err);
  }
};

exports.updatePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    // Check slug uniqueness if slug is being updated
    if (data.slug) {
      data.slug = data.slug.toLowerCase().trim();
      const existing = await prisma.portfolio.findFirst({
        where: {
          slug: data.slug,
          NOT: { id }
        }
      });
      if (existing) {
        return res.status(400).json({ error: 'This portfolio URL slug is already taken. Please choose another one.' });
      }
    }

    const updated = await prisma.portfolio.update({
      where: { id },
      data,
      include: portfolioIncludes
    });

    res.json({
      message: 'Portfolio updated successfully',
      portfolio: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.publishPortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await prisma.portfolio.update({
      where: { id },
      data: {
        isPublished: true,
        publishedAt: new Date()
      },
      include: portfolioIncludes
    });

    res.json({
      message: 'Portfolio published to the world!',
      portfolio: updated,
      publicUrl: `/u/${updated.slug}`
    });
  } catch (err) {
    next(err);
  }
};

exports.unpublishPortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await prisma.portfolio.update({
      where: { id },
      data: { isPublished: false },
      include: portfolioIncludes
    });

    res.json({
      message: 'Portfolio has been unpublished and reverted to draft status.',
      portfolio: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.portfolio.delete({ where: { id } });

    res.json({ message: 'Portfolio has been permanently deleted.' });
  } catch (err) {
    next(err);
  }
};

// --- Projects CRUD ---
exports.addProject = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const project = await prisma.project.create({
      data: {
        portfolioId,
        ...req.body
      }
    });

    res.status(201).json({ message: 'Project added successfully', project });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await prisma.project.update({
      where: { id: projectId },
      data: req.body
    });

    res.json({ message: 'Project updated successfully', project });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    await prisma.project.delete({ where: { id: projectId } });

    res.json({ message: 'Project removed successfully' });
  } catch (err) {
    next(err);
  }
};

// --- Skills CRUD ---
exports.addSkill = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const skill = await prisma.skill.create({
      data: {
        portfolioId,
        ...req.body
      }
    });

    res.status(201).json({ message: 'Skill added', skill });
  } catch (err) {
    next(err);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const { skillId } = req.params;
    await prisma.skill.delete({ where: { id: skillId } });

    res.json({ message: 'Skill removed' });
  } catch (err) {
    next(err);
  }
};

// --- Experience CRUD ---
exports.addExperience = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const experience = await prisma.experience.create({
      data: {
        portfolioId,
        ...req.body
      }
    });

    res.status(201).json({ message: 'Experience entry added', experience });
  } catch (err) {
    next(err);
  }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const { experienceId } = req.params;
    await prisma.experience.delete({ where: { id: experienceId } });

    res.json({ message: 'Experience entry removed' });
  } catch (err) {
    next(err);
  }
};

// --- Education CRUD ---
exports.addEducation = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const education = await prisma.education.create({
      data: {
        portfolioId,
        ...req.body
      }
    });

    res.status(201).json({ message: 'Education entry added', education });
  } catch (err) {
    next(err);
  }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    const { educationId } = req.params;
    await prisma.education.delete({ where: { id: educationId } });

    res.json({ message: 'Education entry removed' });
  } catch (err) {
    next(err);
  }
};

// --- Social Links CRUD ---
exports.addSocialLink = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const socialLink = await prisma.socialLink.create({
      data: {
        portfolioId,
        ...req.body
      }
    });

    res.status(201).json({ message: 'Social link added', socialLink });
  } catch (err) {
    next(err);
  }
};

exports.deleteSocialLink = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    await prisma.socialLink.delete({ where: { id: linkId } });

    res.json({ message: 'Social link removed' });
  } catch (err) {
    next(err);
  }
};

// --- Abuse Report ---
exports.reportPortfolio = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const { reporterEmail, reason } = req.body;

    await prisma.portfolioReport.create({
      data: {
        portfolioId,
        reporterEmail,
        reason
      }
    });

    res.json({ message: 'Thank you. The portfolio report has been submitted to moderators.' });
  } catch (err) {
    next(err);
  }
};
