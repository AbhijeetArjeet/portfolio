const prisma = require('../../config/prisma');
const bcrypt = require('bcryptjs');

exports.getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalPortfolios, publishedPortfolios, totalProjects, reportsCount] = await Promise.all([
      prisma.user.count(),
      prisma.portfolio.count(),
      prisma.portfolio.count({ where: { isPublished: true } }),
      prisma.project.count(),
      prisma.portfolioReport.count({ where: { status: 'PENDING' } })
    ]);

    res.json({
      stats: {
        totalUsers,
        totalPortfolios,
        publishedPortfolios,
        totalProjects,
        pendingReports: reportsCount,
        uptimeSeconds: Math.floor(process.uptime()),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatarUrl: true,
        githubUsername: true,
        createdAt: true,
        portfolios: {
          select: {
            id: true,
            slug: true,
            title: true,
            isPublished: true,
            views: true
          }
        }
      }
    });

    res.json({ users });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (existing) {
      return res.status(400).json({ error: 'A user with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const assignedRole = role === 'ADMIN' ? 'ADMIN' : 'USER';

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: trimmedEmail,
        passwordHash,
        role: assignedRole,
        status: 'ACTIVE'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    // Create starter portfolio
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'portfolio';
    const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    await prisma.portfolio.create({
      data: {
        userId: newUser.id,
        slug: uniqueSlug,
        title: `${name} | Portfolio`,
        headline: assignedRole === 'ADMIN' ? 'Platform Administrator & Evaluator' : 'Developer & Creator',
        contactEmail: trimmedEmail,
        templateId: assignedRole === 'ADMIN' ? 'executive' : 'developer',
        layoutType: 'grid',
        isPublished: true,
        themeConfig: JSON.stringify({ primaryColor: '#ffffff', darkTheme: true, fontFamily: 'inter' })
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: `ADMIN_CREATED_${assignedRole}`,
        targetType: 'USER',
        targetId: newUser.id,
        details: `Administrator created new account for ${trimmedEmail} with role ${assignedRole}`,
        ipAddress: req.ip
      }
    });

    res.status(201).json({
      message: `New ${assignedRole} account created successfully`,
      user: newUser
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['ACTIVE', 'SUSPENDED'].includes(status)) {
      return res.status(400).json({ error: 'Status must be ACTIVE or SUSPENDED.' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status },
      select: { id: true, name: true, email: true, status: true, role: true }
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: `USER_STATUS_${status}`,
        targetType: 'USER',
        targetId: id,
        details: `Account status set to ${status} for ${updatedUser.email}`,
        ipAddress: req.ip
      }
    });

    res.json({
      message: `User status changed to ${status}`,
      user: updatedUser
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['ADMIN', 'USER'].includes(role)) {
      return res.status(400).json({ error: 'Role must be ADMIN or USER.' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, status: true, role: true }
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: `USER_ROLE_${role}`,
        targetType: 'USER',
        targetId: id,
        details: `Admin privileges changed to ${role} for ${updatedUser.email}`,
        ipAddress: req.ip
      }
    });

    res.json({
      message: `User role changed to ${role}`,
      user: updatedUser
    });
  } catch (err) {
    next(err);
  }
};

exports.getPortfolios = async (req, res, next) => {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        _count: {
          select: { projects: true, skills: true }
        }
      }
    });

    res.json({ portfolios });
  } catch (err) {
    next(err);
  }
};

exports.togglePortfolioPublish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        isPublished: Boolean(isPublished),
        publishedAt: isPublished ? new Date() : null
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: isPublished ? 'ADMIN_PUBLISHED_PORTFOLIO' : 'ADMIN_UNPUBLISHED_PORTFOLIO',
        targetType: 'PORTFOLIO',
        targetId: id,
        details: `Admin changed publication status to ${isPublished}`,
        ipAddress: req.ip
      }
    });

    res.json({
      message: `Portfolio publication status updated to ${isPublished}`,
      portfolio
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuditLogs = async (req, res, next) => {
  try {
    const logs = await prisma.auditLog.findMany({
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } }
      }
    });

    res.json({ logs });
  } catch (err) {
    next(err);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const reports = await prisma.portfolioReport.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        portfolio: {
          select: { id: true, title: true, slug: true, user: { select: { name: true, email: true } } }
        }
      }
    });

    res.json({ reports });
  } catch (err) {
    next(err);
  }
};

exports.updateReportStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const report = await prisma.portfolioReport.update({
      where: { id },
      data: { status }
    });

    res.json({ message: 'Report status updated', report });
  } catch (err) {
    next(err);
  }
};

exports.getAccessRequests = async (req, res, next) => {
  try {
    const requests = await prisma.accessRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        portfolio: {
          select: {
            id: true,
            title: true,
            slug: true,
            user: { select: { id: true, name: true, email: true } }
          }
        }
      }
    });

    res.json({ requests });
  } catch (err) {
    next(err);
  }
};

exports.updateAccessRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return res.status(400).json({ error: 'Status must be APPROVED, REJECTED, or PENDING.' });
    }

    const request = await prisma.accessRequest.update({
      where: { id },
      data: {
        status,
        reviewedBy: req.user.email,
        reviewedAt: new Date()
      }
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: `ACCESS_REQUEST_${status}`,
        targetType: 'ACCESS_REQUEST',
        targetId: id,
        details: `Access request for portfolio ${request.portfolioId} set to ${status}`,
        ipAddress: req.ip
      }
    });

    res.json({ message: `Access request status set to ${status}`, request });
  } catch (err) {
    next(err);
  }
};
