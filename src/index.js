import 'module-alias/register.js';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';

import logger from '../logger.js';

import { connectToDatabase } from './database/db.js';
import { successResponseFormatMiddleware } from './middleware/success-response-format.js';
import './database/entities.js'; // Use to sync models with Database
import { sequelize } from './database/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

const morganMiddleware = morgan(':method :url :status in :response-time ms', {
  stream: {
    write: (message) => {
      logger.http(message.trim());
    },
  },
});

// Middleware
app.use(express.json());
app.use(morganMiddleware);
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(successResponseFormatMiddleware);
app.use((req, res, next) => {
  req.BASE_URL = `${req.protocol}://${req.get('host')}`;
  next();
});

app.get('/example', (req, res) => {
  res.json({ name: 'John Doe', age: 30 });
});

(async () => {
  await connectToDatabase();

  sequelize
    .sync({ alter: true })
    .then(() => {
      logger.info('Database synced successfully.');
    })
    .catch((err) => {
      logger.error(err);
    });

  app.listen(PORT, () =>
    logger.info(`Server running on http://localhost:${PORT}`)
  );
})();
