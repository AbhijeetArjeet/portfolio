const config = require('../config/env');

function errorHandler(err, req, res, next) {
  // If headers already sent, delegate to Express default handler
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  // In production, mask internal error details
  const message = (config.isProduction && statusCode === 500)
    ? 'An unexpected internal server error occurred. Please try again later.'
    : err.message || 'Internal server error';

  const response = {
    error: message,
    statusCode
  };

  if (!config.isProduction && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = { errorHandler };
