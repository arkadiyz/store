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
const logger_service_1 = __importDefault(require("../../services/logger.service"));
// TODO: MAKE function to fetching products from a database
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { pageNum, pageCount } = req.body;
            // TODO: Connect to DB
            // TODO: Fetch products from DB BY pageNum and pageCount
            // TODO: For now, we will return a mock response
            const resData = { products: [], pageNum: pageNum, pageCount: pageCount };
            res.status(200).json(resData);
        }
        catch (error) {
            // TODO: Handle error appropriately
            logger_service_1.default.error('[getProducts] ' + { error: 'Internal Server Error' });
            res.status(500).json({ error: 'Internal Server Error' });
        }
        return;
    });
}
// TODO: MAKE function to save a product to a database
function saveProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = req.body;
            const resData = {
                message: 'Product saved successfully',
                product: product,
            };
            res.status(200).json(resData);
        }
        catch (error) {
            // TODO: Handle error appropriately
            logger_service_1.default.error('[saveProduct] ' + { error: 'Internal Server Error' });
            res.status(500).json({ error: 'Internal Server Error' });
        }
        return;
    });
}
// TODO: MAKE function to delete a product from a database
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productId = req.params.id;
            const resData = {
                message: 'Product deleted successfully',
                productId: productId,
            };
            res.status(200).json(resData);
        }
        catch (error) {
            // TODO: Handle error appropriately
            res.status(500).json({ error: 'Internal Server Error' });
            logger_service_1.default.error('[deleteProduct] ' + { error: 'Internal Server Error' });
        }
        return;
    });
}
exports.default = {
    getProducts,
    saveProduct,
    deleteProduct,
};
