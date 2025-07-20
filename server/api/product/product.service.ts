import PageQuery from '../../data/data';
import { Request, Response } from 'express';
import loggerService from '../../services/logger.service';
import { getProductTypesFromCache } from '../../services/cache.service';

// TODO: MAKE function to fetching products from a database
async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const { pageNum, pageCount } = req.body as PageQuery;

    // TODO: Connect to DB
    // TODO: Fetch products from DB BY pageNum and pageCount
    // TODO: For now, we will return a mock response
    const resData = { products: [], pageNum: pageNum, pageCount: pageCount };
    res.status(200).json(resData);
  } catch (error) {
    // TODO: Handle error appropriately
    loggerService.error('[getProducts] ' + { error: 'Internal Server Error' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
  return;
}

// TODO: MAKE function to save a product to a database
async function saveProduct(req: Request, res: Response): Promise<void> {
  try {
    const product = req.body;

    const resData = {
      message: 'Product saved successfully',
      product: product,
    };
    res.status(200).json(resData);
  } catch (error) {
    // TODO: Handle error appropriately
    loggerService.error('[saveProduct] ' + { error: 'Internal Server Error' });
    res.status(500).json({ error: 'Internal Server Error' });
  }
  return;
}

// TODO: MAKE function to delete a product from a database
async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const productId = req.params.id;
    const resData = {
      message: 'Product deleted successfully',
      productId: productId,
    };
    res.status(200).json(resData);
  } catch (error) {
    // TODO: Handle error appropriately
    res.status(500).json({ error: 'Internal Server Error' });
    loggerService.error('[deleteProduct] ' + { error: 'Internal Server Error' });
  }
  return;
}

async function getProductTypes(): Promise<any> {
  try {
    const productTypes = await getProductTypesFromCache();
    return productTypes;
  } catch (error) {
    loggerService.error('[getProductTypes] ' + error);
    throw new Error('Internal Server Error');
  }
}
export default {
  getProducts,
  saveProduct,
  deleteProduct,
  getProductTypes,
};
