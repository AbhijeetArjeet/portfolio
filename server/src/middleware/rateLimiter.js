// Memory-safe in-memory sliding window rate limiter
const rateLimits = new Map();
const MAX_RATE_LIMIT_ENTRIES = 10000;

// Periodic cleanup timer for expired rate limit records (prevents memory leak)
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimits.entries()) {
    if (now > record.resetTime) {
      rateLimits.delete(key);
    }
  }
}, 5 * 60 * 1000);

if (cleanupInterval.unref) {
  cleanupInterval.unref(); // Ensure timer does not prevent process exit during tests
}

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

    // Guard against memory flooding: if cache is full, perform an immediate purge
    if (rateLimits.size > MAX_RATE_LIMIT_ENTRIES) {
      for (const [k, v] of rateLimits.entries()) {
        if (now > v.resetTime) {
          rateLimits.delete(k);
        }
      }
    }

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
