import { createLogger, format, transports, addColors } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { combine, timestamp, printf, colorize, errors } = format;

const customLevels = {
  levels: {
    http: 0,
    error: 1,
    warn: 2,
    fatal: 3,
    info: 4,
    debug: 5,
    verbose: 6,
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warn: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'cyan',
    verbose: 'grey',
  },
};

addColors(customLevels.colors);

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  levels: customLevels.levels,
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    customFormat
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), customFormat),
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs/error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs/combined.log'),
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs/http.log'),
      level: 'http', // Ensure this only captures HTTP logs
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, 'logs/exceptions.log'),
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        customFormat
      ),
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: path.join(__dirname, 'logs/rejections.log'),
    }),
  ],
});

export default logger;
