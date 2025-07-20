import prisma from '../../services/db.service';
import PageQuery from '../../data/data';
import { Request, Response } from 'express';
import loggerService from '../../services/logger.service';
import { getProductTypesFromCache } from '../../services/cache.service';

// TODO: MAKE function to fetching products from a database
async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const { pageNum = 1, pageCount = 10 } = req.body;

    // קבלת מוצרים מהמסד עם pagination
    const skip = (pageNum - 1) * pageCount;
    const products = await prisma.product.findMany({
      skip,
      take: pageCount,
      // include: {
      //   productType: true,
      // },
    });

    // ספירת סך המוצרים
    const totalProducts = await prisma.product.count();

    const resData = {
      products,
      pageNum,
      pageCount,
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageCount),
    };
    res.status(200).json(resData);
  } catch (error) {
    loggerService.error('[getProducts] ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// TODO: MAKE function to save a product to a database
async function saveProduct(req: Request, res: Response): Promise<void> {
  try {
    const { name, code, description, productTypeId, marketedAt } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        code: parseInt(code),
        description,
        productTypeId: parseInt(productTypeId),
        productType: parseInt(productTypeId),
        marketedAt: new Date(marketedAt),
      },
      // include: {
      //   productType: true,
      // },
    });

    const resData = {
      message: 'Product saved successfully',
      product,
    };
    res.status(201).json(resData);
  } catch (error) {
    loggerService.error('[saveProduct] ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// TODO: MAKE function to delete a product from a database
async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const productId = parseInt(req.params.id);

    await prisma.product.delete({
      where: { id: productId },
    });

    const resData = {
      message: 'Product deleted successfully',
      productId: productId,
    };
    res.status(200).json(resData);
  } catch (error) {
    loggerService.error('[deleteProduct] ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
