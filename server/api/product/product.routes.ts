import express, { Express } from 'express';
import logger from '../../services/logger.service';
import { deleteProduct, getProducts, getProductTypes, saveProduct } from './product.controller';
const router = express.Router();

router.post('/', getProducts);
router.get('/product-types', getProductTypes);
router.post('/save', saveProduct);
router.get('/delete/:id', deleteProduct);
export default router;
