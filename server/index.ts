import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import http from 'http';
import dotenv from 'dotenv';
import logger from './services/logger.service';
import { PrismaClient } from '@prisma/client';
import { getProductTypesFromCache, loadProductTypesToCache } from './services/cache.service';

// import db from './services/db.service';

// import authRoutes from './api/auth/auth.routes';
import productRoutes from './api/product/product.routes';
import loggerService from './services/logger.service';

dotenv.config();
const prisma = new PrismaClient();
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
app.get('/', async (req, res) => {
  // res.send('Welcome to the API');
  const productTypes = await getProductTypesFromCache();

  // const products = await prisma.product.findMany();

  res.json(productTypes);
});

app.use('/api/product', productRoutes);

async function startServer() {
  await loadProductTypesToCache(); // פעולה אסינכרונית
  const productTypes = await getProductTypesFromCache();
  loggerService.info(`🔄 ${JSON.stringify(productTypes)} `);
  // Server start
  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    logger.info('====================================');
    logger.info(`Server is running on port: ${port}`);
    logger.info('/==================================/');
  });
}

startServer();
