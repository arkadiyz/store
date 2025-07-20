import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import http from 'http';
import dotenv from 'dotenv';
import logger from './services/logger.service';
import { connectDB } from './services/db.service';
import { loadProductTypesToCache } from './services/cache.service';

// import authRoutes from './api/auth/auth.routes';
import productRoutes from './api/product/product.routes';

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'prodaction') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// Routes
app.use('/api/product', productRoutes);

// Server start
const port = process.env.PORT || 3030;

async function startServer() {
  try {
    // התחברות למסד הנתונים
    await connectDB();

    // טעינת נתונים לקאש
    await loadProductTypesToCache();

    server.listen(port, () => {
      logger.info('====================================');
      logger.info(`Server is running on port: ${port}`);
      logger.info('Database connected successfully');
      logger.info('Cache loaded successfully');
      logger.info('/==================================/');
    });
  } catch (error) {
    logger.error('Failed to start server: ' + error);
    process.exit(1);
  }
}

startServer();
