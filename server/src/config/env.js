const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_jwt_key_super_secure_12345',
  sessionSecret: process.env.SESSION_SECRET || 'dev_session_secret_12345',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  renderExternalUrl: process.env.RENDER_EXTERNAL_URL || '',
  monitoringIntervalMinutes: parseInt(process.env.MONITORING_INTERVAL_MINUTES, 10) || 14,
  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = config;
