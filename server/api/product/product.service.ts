import prisma from '../../services/db.service';
import PageQuery from '../../data/data';
import { Request, Response } from 'express';
import loggerService from '../../services/logger.service';
import { getProductTypesFromCache } from '../../services/cache.service';

// TODO: MAKE function to fetching products from a database
async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const { pageNum = 1, pageSize = 10 } = req.body;

    // קבלת מוצרים מהמסד עם pagination
    const skip = (pageNum - 1) * pageSize;
    const products = await prisma.product.findMany({
      skip,
      take: pageSize,
      // include: {
      //   productType: true,
      // },
    });

    // ספירת סך המוצרים
    const totalProducts = await prisma.product.count();

    const resData = {
      products,
      pageNum,
      pageSize,
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
    };
    res.status(200).json(resData);
  } catch (error) {
    loggerService.error('[getProducts] ' + error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// TODO: MAKE function to save a product to a database
// async function saveProduct(req: Request, res: Response): Promise<void> {
//   try {
//     const { productName, sku, productDescription, productTypeId, marketedAt } = req.body;
//     loggerService.info('Saving product:              productName ' + productName);
//     loggerService.info('Saving product:              code ' + sku);
//     loggerService.info('Saving product:       description ' + productDescription);
//     loggerService.info('Saving product:     productTypeId ' + productTypeId);
//     loggerService.info('Saving product:        marketedAt ' + marketedAt);
//     loggerService.info('Saving product:        req.body ' + JSON.stringify(req.body));

//     const product = await prisma.product.create({
//       data: {
//         productName,
//         sku: parseInt(sku),
//         productDescription,
//         productTypeId: parseInt(productTypeId),
//         marketedAt:new Date(marketedAt)
//       },
//       // include: {
//       //   productType: true,
//       // },
//     });

//     const resData = {
//       message: 'Product saved successfully',
//       product,
//     };
//     res.status(201).json(resData);
//   } catch (error) {
//     loggerService.error('[saveProduct] ' + error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

async function saveProduct(req: Request, res: Response): Promise<void> {
  try {
    const { id, productName, sku, productDescription, productTypeId, marketedAt } = req.body;

    loggerService.info('Saving product: req.body ' + JSON.stringify(req.body));

    const productData = {
      productName,
      sku: sku,
      productDescription,
      productTypeId: parseInt(productTypeId),
      marketedAt: new Date(marketedAt),
    };

    let savedProduct;

    if (id) {
      // עריכה
      savedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: productData,
      });
    } else {
      // יצירה חדשה
      savedProduct = await prisma.product.create({
        data: productData,
      });
    }

    res.status(200).json(savedProduct);
  } catch (err) {
    loggerService.error('Failed to save product' + err);
    res.status(500).json({ error: 'Failed to save product' });
  }
}
// TODO: MAKE function to delete a product from a database
async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const productId = parseInt(req.params.id);
    loggerService.info('[deleteProduct productId ] ' + productId);

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

async function getProductTypes(req: Request, res: Response): Promise<any> {
  try {
    const productTypes = await getProductTypesFromCache();
    loggerService.info('typeof products: ' + typeof productTypes);

    res.json(productTypes);
  } catch (error) {
    loggerService.error('[getProductTypes] ' + error);
    throw new Error('Internal Server Error');
  }
}

async function searchProducts(req: Request, res: Response) {
  try {
    const searchTerm = req.params.productName;

    loggerService.info('Searching products with term: ' + searchTerm);

    if (!searchTerm || searchTerm.trim().length < 2) {
      return res.status(400).json({
        error: 'Search term must be at least 2 characters long',
      });
    }

    // חיפוש מוצרים לפי שם (חיפוש חלקי - contains)
    const products = await prisma.product.findMany({
      where: {
        productName: {
          contains: searchTerm,
          mode: 'insensitive', // חיפוש לא רגיש לאותיות גדולות/קטנות
        },
      },
      orderBy: {
        productName: 'asc', // מיון לפי שם המוצר
      },
    });

    // פורמט התוצאות
    // const formattedProducts = products.map((product) => ({
    //   id: product.id,
    //   productName: product.productName,
    //   sku: product.sku.toString(),
    //   productDescription: product.productDescription,
    //   productType: product.productType.name,
    //   productTypeId: product.productTypeId,
    //   marketedAt: product.marketedAt.toISOString(),
    // }));

    const resData = {
      products,
      totalResults: products.length,
      searchTerm: searchTerm,
      message: `Found ${products.length} products matching "${searchTerm}"`,
    };

    loggerService.info(`Search completed: found ${products.length} products`);
    res.status(200).json(resData);
  } catch (error) {
    loggerService.error('Error searching products: ' + error);
    res.status(500).json({ error: 'Failed to search products' });
  }
}

export default {
  getProducts,
  saveProduct,
  deleteProduct,
  getProductTypes,
  searchProducts,
};
