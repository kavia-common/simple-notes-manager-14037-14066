const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Initializes Sequelize based on environment variables.
 * Uses env vars: DB_DIALECT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS.
 */
function initializeSequelize() {
  // PUBLIC_INTERFACE
  const dialect = process.env.DB_DIALECT || 'sqlite';
  let sequelize;

  if (dialect === 'sqlite') {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: process.env.DB_STORAGE || ':memory:',
      logging: false
    });
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST || 'localhost',
        dialect,
        port: process.env.DB_PORT || undefined,
        logging: false,
      }
    );
  }

  return sequelize;
}

module.exports = { initializeSequelize };
