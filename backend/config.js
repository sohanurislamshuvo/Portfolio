// Configuration file for the backend
module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // JWT Secret (change this to a random string in production)
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  
  // Database
  DB_PATH: process.env.DB_PATH || './database/portfolio.db',
  
  // CORS
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  
  // Admin Credentials (for initial setup/update via scripts/init-db.js)
  ADMIN_USERNAME: 'shuvo',
  ADMIN_PASSWORD: 'mysite404'
};
