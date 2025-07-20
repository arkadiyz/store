"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_service_1 = __importDefault(require("../../services/db.service"));
const logger_service_1 = __importDefault(require("../../services/logger.service"));
const cache_service_1 = require("../../services/cache.service");
// TODO: MAKE function to fetching products from a database
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { pageNum = 1, pageCount = 10 } = req.body;
            // קבלת מוצרים מהמסד עם pagination
            const skip = (pageNum - 1) * pageCount;
            const products = yield db_service_1.default.product.findMany({
                skip,
                take: pageCount,
                // include: {
                //   productType: true,
                // },
            });
            // ספירת סך המוצרים
            const totalProducts = yield db_service_1.default.product.count();
            const resData = {
                products,
                pageNum,
                pageCount,
                totalProducts,
                totalPages: Math.ceil(totalProducts / pageCount),
            };
            res.status(200).json(resData);
        }
        catch (error) {
            logger_service_1.default.error('[getProducts] ' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
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
function saveProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, productName, sku, productDescription, productTypeId, marketedAt } = req.body;
            logger_service_1.default.info('Saving product: req.body ' + JSON.stringify(req.body));
            const productData = {
                productName,
                sku: parseInt(sku),
                productDescription,
                productTypeId: parseInt(productTypeId),
                marketedAt: new Date(marketedAt),
            };
            let savedProduct;
            if (id) {
                // עריכה
                savedProduct = yield db_service_1.default.product.update({
                    where: { id: parseInt(id) },
                    data: productData,
                });
            }
            else {
                // יצירה חדשה
                savedProduct = yield db_service_1.default.product.create({
                    data: productData,
                });
            }
            res.status(200).json(savedProduct);
        }
        catch (err) {
            logger_service_1.default.error('Failed to save product' + err);
            res.status(500).json({ error: 'Failed to save product' });
        }
    });
}
// TODO: MAKE function to delete a product from a database
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = parseInt(req.params.id);
            logger_service_1.default.info('[deleteProduct productId ] ' + productId);
            yield db_service_1.default.product.delete({
                where: { id: productId },
            });
            const resData = {
                message: 'Product deleted successfully',
                productId: productId,
            };
            res.status(200).json(resData);
        }
        catch (error) {
            logger_service_1.default.error('[deleteProduct] ' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
function getProductTypes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productTypes = yield (0, cache_service_1.getProductTypesFromCache)();
            logger_service_1.default.info('typeof products: ' + typeof productTypes);
            res.json(productTypes);
        }
        catch (error) {
            logger_service_1.default.error('[getProductTypes] ' + error);
            throw new Error('Internal Server Error');
        }
    });
}
function searchProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const searchTerm = req.params.productName;
            logger_service_1.default.info('Searching products with term: ' + searchTerm);
            if (!searchTerm || searchTerm.trim().length < 2) {
                return res.status(400).json({
                    error: 'Search term must be at least 2 characters long',
                });
            }
            // חיפוש מוצרים לפי שם (חיפוש חלקי - contains)
            const products = yield db_service_1.default.product.findMany({
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
            logger_service_1.default.info(`Search completed: found ${products.length} products`);
            res.status(200).json(resData);
        }
        catch (error) {
            logger_service_1.default.error('Error searching products: ' + error);
            res.status(500).json({ error: 'Failed to search products' });
        }
    });
}
exports.default = {
    getProducts,
    saveProduct,
    deleteProduct,
    getProductTypes,
    searchProducts,
};
