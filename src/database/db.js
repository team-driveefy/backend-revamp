import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import logger from '../../logger.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    logger.info('Connection to PostgreSQL has been established successfully.');
  } catch (error) {
    logger.error(error);
  }
}

export { sequelize, connectToDatabase };
