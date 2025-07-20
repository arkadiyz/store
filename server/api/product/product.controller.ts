import logger from '../../services/logger.service';
import productService from './product.service';
import { Request, Response } from 'express';

// TODO: Make Function to fetch products from service file
async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    await productService.getProducts(req, res);
    logger.info('[controller -> getProducts] ' + JSON.stringify(req.body));
  } catch (error) {
    logger.error('[controller -> getProducts] ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// TODO: Make Function to save a product to service file
async function saveProduct(req: Request, res: Response): Promise<void> {
  try {
    await productService.saveProduct(req, res);
  } catch (error) {
    logger.error('[controller -> saveProduct] ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//TODO: Make Function to delete a product from service file
async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    res.json({ message: 'Product deleted successfully' });
    // await productService.deleteProduct(req, res);
  } catch (error) {
    logger.error('[controller -> deleteProduct] ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getProductTypes(req: Request, res: Response): Promise<void> {
  try {
    logger.info('[controller -> getProductTypes] Fetching product types');
    const productTypes = await productService.getProductTypes(req, res);
    logger.info('[controller -> getProductTypes --> ] Fetching product types' + productTypes);
  } catch (error) {
    logger.error('[controller -> getProductTypes] ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function searchProducts(req: Request, res: Response): Promise<void> {
  try {
    logger.info('[controller -> searchProducts] Starting search process');
    logger.info('[controller -> searchProducts] Search term: ' + req.params.productName);

    await productService.searchProducts(req, res);

    logger.info('[controller -> searchProducts] Search process completed');
  } catch (error) {
    logger.error('[controller -> searchProducts] Error: ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getProducts, saveProduct, deleteProduct, getProductTypes, searchProducts };
