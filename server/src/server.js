const app = require('./app');
const config = require('./config/env');
const prisma = require('./config/prisma');

const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`🚀 Portfolio API running in ${config.nodeEnv} mode`);
  console.log(`📡 Port: ${config.port}`);
  console.log(`🏥 Health Check: http://localhost:${config.port}/api/health`);
  console.log(`🔌 Ready Check:  http://localhost:${config.port}/api/health/ready`);
  console.log(`🌐 API Base:     http://localhost:${config.port}/api/v1`);
  console.log(`=========================================`);
});

// Graceful shutdown handling for Render deployments
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    console.log('HTTP server closed.');
    try {
      await prisma.$disconnect();
      console.log('Database connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during database disconnection:', err);
      process.exit(1);
    }
  });

  // Force close after 10s if hung
  setTimeout(() => {
    console.error('Forcefully terminating process after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
