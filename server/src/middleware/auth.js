const jwt = require('jsonwebtoken');
const config = require('../config/env');
const prisma = require('../config/prisma');

async function authenticate(req, res, next) {
  try {
    let token = null;

    if (req.cookies && req.cookies.auth_token) {
      token = req.cookies.auth_token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Authentication required. Please log in.' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatarUrl: true,
        githubUsername: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User account no longer exists.' });
    }

    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ error: 'Your account has been suspended by an administrator.' });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ error: 'Invalid authentication token.' });
  }
}

async function optionalAuthenticate(req, res, next) {
  try {
    let token = null;
    if (req.cookies && req.cookies.auth_token) {
      token = req.cookies.auth_token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, name: true, email: true, role: true, status: true }
      });
      if (user && user.status === 'ACTIVE') {
        req.user = user;
      }
    }
  } catch {
    // Ignore invalid token in optional auth
  }
  next();
}

function requireRole(allowedRoles) {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
    }
    next();
  };
}

async function requirePortfolioOwnership(req, res, next) {
  try {
    const portfolioId = req.params.id || req.params.portfolioId;
    if (!portfolioId) {
      return res.status(400).json({ error: 'Portfolio ID parameter missing.' });
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId }
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found.' });
    }

    // Allow if owner OR admin
    if (portfolio.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        error: 'Forbidden. You do not have permission to modify this portfolio.'
      });
    }

    req.portfolio = portfolio;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authenticate,
  optionalAuthenticate,
  requireRole,
  requirePortfolioOwnership
};
