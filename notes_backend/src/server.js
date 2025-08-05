require('dotenv').config(); // PUBLIC_INTERFACE: Loads .env before starting express
const app = require('./app');

// Always expose on 3001 for preview; host configurable via env, fallback to 0.0.0.0
const PORT = 3001;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
