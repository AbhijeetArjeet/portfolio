const prisma = require('../../config/prisma');

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

    // Create audit log
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
