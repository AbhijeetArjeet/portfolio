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
            primaryColor: '#ffffff',
            darkTheme: true,
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

exports.listMyPortfolios = async (req, res, next) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: req.user.id },
      include: portfolioIncludes,
      orderBy: { updatedAt: 'desc' }
    });
    res.json({ portfolios });
  } catch (err) {
    next(err);
  }
};

exports.createPortfolio = async (req, res, next) => {
  try {
    const { title, headline, bio, templateId, layoutType, themeConfig, linkedinUrl, showLinkedin } = req.body;
    let slug = req.body.slug;
    if (!slug) {
      const baseSlug = (title || req.user.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'portfolio';
      slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
    } else {
      slug = slug.toLowerCase().trim();
      const existing = await prisma.portfolio.findUnique({ where: { slug } });
      if (existing) {
        return res.status(400).json({ error: 'This portfolio slug is already in use.' });
      }
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        userId: req.user.id,
        title,
        slug,
        headline: headline || 'Developer & Creator',
        bio: bio || '',
        contactEmail: req.user.email,
        templateId: templateId || 'developer',
        layoutType: layoutType || 'grid',
        themeConfig: themeConfig || JSON.stringify({ primaryColor: '#ffffff', darkTheme: true, fontFamily: 'inter', showGithubStats: true }),
        linkedinUrl: linkedinUrl || null,
        showLinkedin: showLinkedin !== undefined ? showLinkedin : true,
        isPublished: false
      },
      include: portfolioIncludes
    });

    res.status(201).json({ message: 'Portfolio created successfully', portfolio });
  } catch (err) {
    next(err);
  }
};

exports.duplicatePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const source = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        projects: true,
        skills: true,
        experience: true,
        education: true,
        socialLinks: true
      }
    });

    if (!source) {
      return res.status(404).json({ error: 'Source portfolio not found.' });
    }

    const newSlug = `${source.slug}-copy-${Math.random().toString(36).substring(2, 6)}`;

    const duplicated = await prisma.$transaction(async (tx) => {
      const newPortfolio = await tx.portfolio.create({
        data: {
          userId: req.user.id,
          title: `${source.title} (Copy)`,
          headline: source.headline,
          bio: source.bio,
          location: source.location,
          contactEmail: source.contactEmail,
          avatarUrl: source.avatarUrl,
          resumeUrl: source.resumeUrl,
          githubUrl: source.githubUrl,
          linkedinUrl: source.linkedinUrl,
          showLinkedin: source.showLinkedin,
          websiteUrl: source.websiteUrl,
          slug: newSlug,
          templateId: source.templateId,
          layoutType: source.layoutType,
          themeConfig: source.themeConfig,
          sectionOrder: source.sectionOrder,
          isPublished: false
        }
      });

      if (source.projects.length > 0) {
        await tx.project.createMany({
          data: source.projects.map((p) => ({
            portfolioId: newPortfolio.id,
            title: p.title,
            description: p.description,
            technologies: p.technologies,
            repositoryUrl: p.repositoryUrl,
            demoUrl: p.demoUrl,
            imageUrl: p.imageUrl,
            featured: p.featured,
            displayOrder: p.displayOrder
          }))
        });
      }

      if (source.skills.length > 0) {
        await tx.skill.createMany({
          data: source.skills.map((s) => ({
            portfolioId: newPortfolio.id,
            name: s.name,
            category: s.category,
            proficiency: s.proficiency,
            displayOrder: s.displayOrder
          }))
        });
      }

      if (source.experience.length > 0) {
        await tx.experience.createMany({
          data: source.experience.map((e) => ({
            portfolioId: newPortfolio.id,
            company: e.company,
            role: e.role,
            startDate: e.startDate,
            endDate: e.endDate,
            isCurrent: e.isCurrent,
            description: e.description
          }))
        });
      }

      if (source.education.length > 0) {
        await tx.education.createMany({
          data: source.education.map((ed) => ({
            portfolioId: newPortfolio.id,
            institution: ed.institution,
            degree: ed.degree,
            field: ed.field,
            startDate: ed.startDate,
            endDate: ed.endDate,
            description: ed.description
          }))
        });
      }

      if (source.socialLinks.length > 0) {
        await tx.socialLink.createMany({
          data: source.socialLinks.map((sl) => ({
            portfolioId: newPortfolio.id,
            platform: sl.platform,
            url: sl.url
          }))
        });
      }

      return tx.portfolio.findUnique({
        where: { id: newPortfolio.id },
        include: portfolioIncludes
      });
    }, { maxWait: 10000, timeout: 30000 });

    res.status(201).json({ message: 'Portfolio duplicated successfully', portfolio: duplicated });
  } catch (err) {
    next(err);
  }
};

exports.exportPortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: portfolioIncludes
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    const exportPayload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      portfolio: {
        title: portfolio.title,
        headline: portfolio.headline,
        bio: portfolio.bio,
        location: portfolio.location,
        contactEmail: portfolio.contactEmail,
        avatarUrl: portfolio.avatarUrl,
        resumeUrl: portfolio.resumeUrl,
        githubUrl: portfolio.githubUrl,
        linkedinUrl: portfolio.linkedinUrl,
        showLinkedin: portfolio.showLinkedin,
        websiteUrl: portfolio.websiteUrl,
        templateId: portfolio.templateId,
        layoutType: portfolio.layoutType,
        themeConfig: portfolio.themeConfig,
        sectionOrder: portfolio.sectionOrder,
        projects: portfolio.projects.map(p => ({
          title: p.title,
          description: p.description,
          technologies: p.technologies,
          repositoryUrl: p.repositoryUrl,
          demoUrl: p.demoUrl,
          imageUrl: p.imageUrl,
          featured: p.featured,
          displayOrder: p.displayOrder
        })),
        skills: portfolio.skills.map(s => ({
          name: s.name,
          category: s.category,
          proficiency: s.proficiency,
          displayOrder: s.displayOrder
        })),
        experience: portfolio.experience.map(e => ({
          company: e.company,
          role: e.role,
          startDate: e.startDate,
          endDate: e.endDate,
          isCurrent: e.isCurrent,
          description: e.description
        })),
        education: portfolio.education.map(ed => ({
          institution: ed.institution,
          degree: ed.degree,
          field: ed.field,
          startDate: ed.startDate,
          endDate: ed.endDate,
          description: ed.description
        })),
        socialLinks: portfolio.socialLinks.map(sl => ({
          platform: sl.platform,
          url: sl.url
        }))
      }
    };

    res.json(exportPayload);
  } catch (err) {
    next(err);
  }
};

exports.importPortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { portfolio: importedData } = req.body;

    if (!importedData) {
      return res.status(400).json({ error: 'Invalid backup format. Missing portfolio object.' });
    }

    const updated = await prisma.$transaction(async (tx) => {
      await tx.portfolio.update({
        where: { id },
        data: {
          title: importedData.title || undefined,
          headline: importedData.headline || undefined,
          bio: importedData.bio || undefined,
          location: importedData.location || undefined,
          contactEmail: importedData.contactEmail || undefined,
          avatarUrl: importedData.avatarUrl || undefined,
          resumeUrl: importedData.resumeUrl || undefined,
          githubUrl: importedData.githubUrl || undefined,
          linkedinUrl: importedData.linkedinUrl || undefined,
          showLinkedin: importedData.showLinkedin !== undefined ? importedData.showLinkedin : true,
          websiteUrl: importedData.websiteUrl || undefined,
          templateId: importedData.templateId || undefined,
          layoutType: importedData.layoutType || undefined,
          themeConfig: typeof importedData.themeConfig === 'string' ? importedData.themeConfig : JSON.stringify(importedData.themeConfig || {}),
          sectionOrder: typeof importedData.sectionOrder === 'string' ? importedData.sectionOrder : JSON.stringify(importedData.sectionOrder || ['bio', 'projects', 'skills', 'experience', 'education'])
        }
      });

      if (Array.isArray(importedData.projects)) {
        await tx.project.deleteMany({ where: { portfolioId: id } });
        if (importedData.projects.length > 0) {
          await tx.project.createMany({
            data: importedData.projects.map((p, idx) => ({
              portfolioId: id,
              title: p.title || 'Untitled Project',
              description: p.description || '',
              technologies: p.technologies || 'React',
              repositoryUrl: p.repositoryUrl || null,
              demoUrl: p.demoUrl || null,
              imageUrl: p.imageUrl || null,
              featured: Boolean(p.featured),
              displayOrder: p.displayOrder !== undefined ? p.displayOrder : idx
            }))
          });
        }
      }

      if (Array.isArray(importedData.skills)) {
        await tx.skill.deleteMany({ where: { portfolioId: id } });
        if (importedData.skills.length > 0) {
          await tx.skill.createMany({
            data: importedData.skills.map((s, idx) => ({
              portfolioId: id,
              name: s.name,
              category: s.category || 'Technical',
              proficiency: s.proficiency || null,
              displayOrder: s.displayOrder !== undefined ? s.displayOrder : idx
            }))
          });
        }
      }

      if (Array.isArray(importedData.experience)) {
        await tx.experience.deleteMany({ where: { portfolioId: id } });
        if (importedData.experience.length > 0) {
          await tx.experience.createMany({
            data: importedData.experience.map((e) => ({
              portfolioId: id,
              company: e.company,
              role: e.role,
              startDate: e.startDate || null,
              endDate: e.endDate || null,
              isCurrent: Boolean(e.isCurrent),
              description: e.description || null
            }))
          });
        }
      }

      if (Array.isArray(importedData.education)) {
        await tx.education.deleteMany({ where: { portfolioId: id } });
        if (importedData.education.length > 0) {
          await tx.education.createMany({
            data: importedData.education.map((ed) => ({
              portfolioId: id,
              institution: ed.institution,
              degree: ed.degree,
              field: ed.field || null,
              startDate: ed.startDate || null,
              endDate: ed.endDate || null,
              description: ed.description || null
            }))
          });
        }
      }

      if (Array.isArray(importedData.socialLinks)) {
        await tx.socialLink.deleteMany({ where: { portfolioId: id } });
        if (importedData.socialLinks.length > 0) {
          await tx.socialLink.createMany({
            data: importedData.socialLinks.map((sl) => ({
              portfolioId: id,
              platform: sl.platform,
              url: sl.url
            }))
          });
        }
      }

      return tx.portfolio.findUnique({
        where: { id },
        include: portfolioIncludes
      });
    }, { maxWait: 10000, timeout: 30000 });

    res.json({ message: 'Portfolio imported and restored successfully', portfolio: updated });
  } catch (err) {
    next(err);
  }
};

exports.createVersion = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const { name } = req.body;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      include: portfolioIncludes
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    const versionCount = await prisma.portfolioVersion.count({
      where: { portfolioId }
    });

    const newVersion = await prisma.portfolioVersion.create({
      data: {
        portfolioId,
        version: versionCount + 1,
        name: name || `Snapshot v${versionCount + 1}`,
        snapshot: JSON.stringify(portfolio)
      }
    });

    res.status(201).json({
      message: 'Version snapshot created',
      version: {
        id: newVersion.id,
        version: newVersion.version,
        name: newVersion.name,
        createdAt: newVersion.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.listVersions = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const versions = await prisma.portfolioVersion.findMany({
      where: { portfolioId },
      select: {
        id: true,
        version: true,
        name: true,
        createdAt: true
      },
      orderBy: { version: 'desc' }
    });

    res.json({ versions });
  } catch (err) {
    next(err);
  }
};

exports.restoreVersion = async (req, res, next) => {
  try {
    const { id: portfolioId, versionId } = req.params;
    const versionRecord = await prisma.portfolioVersion.findFirst({
      where: { id: versionId, portfolioId }
    });

    if (!versionRecord) {
      return res.status(404).json({ error: 'Version snapshot not found.' });
    }

    const snapshot = JSON.parse(versionRecord.snapshot);

    const restored = await prisma.$transaction(async (tx) => {
      await tx.portfolio.update({
        where: { id: portfolioId },
        data: {
          title: snapshot.title,
          headline: snapshot.headline,
          bio: snapshot.bio,
          location: snapshot.location,
          contactEmail: snapshot.contactEmail,
          avatarUrl: snapshot.avatarUrl,
          resumeUrl: snapshot.resumeUrl,
          githubUrl: snapshot.githubUrl,
          linkedinUrl: snapshot.linkedinUrl,
          showLinkedin: snapshot.showLinkedin !== undefined ? snapshot.showLinkedin : true,
          websiteUrl: snapshot.websiteUrl,
          templateId: snapshot.templateId,
          layoutType: snapshot.layoutType,
          themeConfig: typeof snapshot.themeConfig === 'string' ? snapshot.themeConfig : JSON.stringify(snapshot.themeConfig),
          sectionOrder: typeof snapshot.sectionOrder === 'string' ? snapshot.sectionOrder : JSON.stringify(snapshot.sectionOrder)
        }
      });

      if (Array.isArray(snapshot.projects)) {
        await tx.project.deleteMany({ where: { portfolioId } });
        if (snapshot.projects.length > 0) {
          await tx.project.createMany({
            data: snapshot.projects.map((p) => ({
              portfolioId,
              title: p.title,
              description: p.description,
              technologies: p.technologies,
              repositoryUrl: p.repositoryUrl,
              demoUrl: p.demoUrl,
              imageUrl: p.imageUrl,
              featured: Boolean(p.featured),
              displayOrder: p.displayOrder || 0
            }))
          });
        }
      }

      if (Array.isArray(snapshot.skills)) {
        await tx.skill.deleteMany({ where: { portfolioId } });
        if (snapshot.skills.length > 0) {
          await tx.skill.createMany({
            data: snapshot.skills.map((s) => ({
              portfolioId,
              name: s.name,
              category: s.category || 'Technical',
              proficiency: s.proficiency || null,
              displayOrder: s.displayOrder || 0
            }))
          });
        }
      }

      if (Array.isArray(snapshot.experience)) {
        await tx.experience.deleteMany({ where: { portfolioId } });
        if (snapshot.experience.length > 0) {
          await tx.experience.createMany({
            data: snapshot.experience.map((e) => ({
              portfolioId,
              company: e.company,
              role: e.role,
              startDate: e.startDate || null,
              endDate: e.endDate || null,
              isCurrent: Boolean(e.isCurrent),
              description: e.description || null
            }))
          });
        }
      }

      if (Array.isArray(snapshot.education)) {
        await tx.education.deleteMany({ where: { portfolioId } });
        if (snapshot.education.length > 0) {
          await tx.education.createMany({
            data: snapshot.education.map((ed) => ({
              portfolioId,
              institution: ed.institution,
              degree: ed.degree,
              field: ed.field || null,
              startDate: ed.startDate || null,
              endDate: ed.endDate || null,
              description: ed.description || null
            }))
          });
        }
      }

      if (Array.isArray(snapshot.socialLinks)) {
        await tx.socialLink.deleteMany({ where: { portfolioId } });
        if (snapshot.socialLinks.length > 0) {
          await tx.socialLink.createMany({
            data: snapshot.socialLinks.map((sl) => ({
              portfolioId,
              platform: sl.platform,
              url: sl.url
            }))
          });
        }
      }

      return tx.portfolio.findUnique({
        where: { id: portfolioId },
        include: portfolioIncludes
      });
    }, { maxWait: 10000, timeout: 30000 });

    res.json({ message: `Successfully restored version #${versionRecord.version}`, portfolio: restored });
  } catch (err) {
    next(err);
  }
};

exports.submitAccessRequest = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const { requesterName, organization, email, requestedRole, reason } = req.body;

    const portfolio = await prisma.portfolio.findUnique({ where: { id: portfolioId } });
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    const request = await prisma.accessRequest.create({
      data: {
        portfolioId,
        requesterName,
        organization,
        email,
        requestedRole: requestedRole || 'Recruiter / Evaluator',
        reason,
        status: 'PENDING'
      }
    });

    res.status(201).json({
      message: 'Access request submitted successfully! The portfolio owner and evaluators have been notified.',
      request
    });
  } catch (err) {
    next(err);
  }
};

exports.getPortfolioAccessRequests = async (req, res, next) => {
  try {
    const { id: portfolioId } = req.params;
    const requests = await prisma.accessRequest.findMany({
      where: { portfolioId },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ requests });
  } catch (err) {
    next(err);
  }
};

exports.updateAccessRequestStatus = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be APPROVED, REJECTED, or PENDING.' });
    }

    const updated = await prisma.accessRequest.update({
      where: { id: requestId },
      data: {
        status,
        reviewedBy: req.user.email,
        reviewedAt: new Date()
      }
    });

    res.json({ message: `Access request marked as ${status}`, request: updated });
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
      const isOwner = req.user && req.user.id === portfolio.userId;
      const isAdmin = req.user && req.user.role === 'ADMIN';

      if (!isOwner && !isAdmin) {
        return res.status(404).json({
          error: 'This portfolio is currently a private draft and has not been published.'
        });
      }
    }

    // Increment view count asynchronously
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
        linkedinUrl: true,
        showLinkedin: true,
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
