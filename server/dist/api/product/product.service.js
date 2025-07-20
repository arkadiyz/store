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
function saveProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, code, description, productTypeId, marketedAt } = req.body;
            const product = yield db_service_1.default.product.create({
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
        }
        catch (error) {
            logger_service_1.default.error('[saveProduct] ' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
// TODO: MAKE function to delete a product from a database
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = parseInt(req.params.id);
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
function getProductTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productTypes = yield (0, cache_service_1.getProductTypesFromCache)();
            return productTypes;
        }
        catch (error) {
            logger_service_1.default.error('[getProductTypes] ' + error);
            throw new Error('Internal Server Error');
        }
    });
}
exports.default = {
    getProducts,
    saveProduct,
    deleteProduct,
    getProductTypes,
};
