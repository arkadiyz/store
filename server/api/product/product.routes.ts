import express, { Express } from 'express';
import logger from '../../services/logger.service';
import { getProducts, saveProduct } from './product.controller';
const router = express.Router();

router.post('/', getProducts);
router.post('/save', saveProduct);
router.delete('/:id', saveProduct);

export default router;
