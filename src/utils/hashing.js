import bcrypt from 'bcrypt';

import logger from '../../logger.js';

const saltRounds = process.env.SALT_ROUNDS;

export const hashString = async (str) => {
  try {
    const hashedString = await bcrypt.hash(str, saltRounds);
    return hashedString;
  } catch (error) {
    logger.error(error);
    throw new Error('Hashing failed');
  }
};

export const compareStrings = async (plainString, hashedString) => {
  try {
    const isMatch = await bcrypt.compare(plainString, hashedString);
    return isMatch;
  } catch (error) {
    logger.error(error);
    throw new Error('Comparison failed');
  }
};
