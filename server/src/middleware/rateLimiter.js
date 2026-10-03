// Simple in-memory sliding window rate limiter
const rateLimits = new Map();

function rateLimiter(options = {}) {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes default
  const max = options.max || 100; // limit each IP
  const message = options.message || { error: 'Too many requests, please try again later.' };

  return (req, res, next) => {
    // Skip rate limiting during test or if explicitly disabled
    if (process.env.NODE_ENV === 'test') {
      return next();
    }

    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown-ip';
    const now = Date.now();

    if (!rateLimits.has(key)) {
      rateLimits.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const record = rateLimits.get(key);

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
      return next();
    }

    record.count += 1;

    if (record.count > max) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json(message);
    }

    next();
  };
}

module.exports = { rateLimiter };
