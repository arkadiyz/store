import { PrismaClient } from '@prisma/client';
import logger from './logger.service';

declare global {
  var __prisma: PrismaClient | undefined;
}

// יצירת instance של Prisma Client
const prisma =
  globalThis.__prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// פונקציה להתחברות למסד הנתונים
async function connectDB() {
  try {
    await prisma.$connect();
    logger.info('Successfully connected to database');
  } catch (error) {
    logger.error('Failed to connect to database: ' + error);
    throw error;
  }
}

// פונקציה לניתוק מהמסד
async function disconnectDB() {
  try {
    await prisma.$disconnect();
    logger.info('Successfully disconnected from database');
  } catch (error) {
    logger.error('Error disconnecting from database: ' + error);
  }
}

// פונקציה לבדיקת החיבור
async function checkConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error('Database connection check failed: ' + error);
    return false;
  }
}

export default prisma;
export { connectDB, disconnectDB, checkConnection };
