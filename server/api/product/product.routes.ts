import express, { Express } from 'express';
import logger from '../../services/logger.service';
import { getProducts, getProductTypes, saveProduct } from './product.controller';
const router = express.Router();

router.get('/product-types', getProductTypes);
router.post('/', getProducts);
router.post('/save', saveProduct);
router.delete('/:id', saveProduct);
export default router;
