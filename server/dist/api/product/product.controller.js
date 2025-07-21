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
exports.getProducts = getProducts;
exports.saveProduct = saveProduct;
exports.deleteProduct = deleteProduct;
exports.getProductTypes = getProductTypes;
exports.searchProducts = searchProducts;
const logger_service_1 = __importDefault(require("../../services/logger.service"));
const product_service_1 = __importDefault(require("./product.service"));
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield product_service_1.default.getProducts(req, res);
            logger_service_1.default.info('[controller -> getProducts] ' + JSON.stringify(req.body));
        }
        catch (error) {
            logger_service_1.default.error('[controller -> getProducts] ' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
function saveProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield product_service_1.default.saveProduct(req, res);
        }
        catch (error) {
            logger_service_1.default.error('[controller -> saveProduct] ' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json({ message: 'Product deleted successfully' });
            // await productService.deleteProduct(req, res);
        }
        catch (error) {
            logger_service_1.default.error('[controller -> deleteProduct] ' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
function getProductTypes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_service_1.default.info('[controller -> getProductTypes] Fetching product types');
            const productTypes = yield product_service_1.default.getProductTypes(req, res);
            logger_service_1.default.info('[controller -> getProductTypes --> ] Fetching product types' + productTypes);
        }
        catch (error) {
            logger_service_1.default.error('[controller -> getProductTypes] ' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
function searchProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_service_1.default.info('[controller -> searchProducts] Starting search process');
            logger_service_1.default.info('[controller -> searchProducts] Search term: ' + req.params.productName);
            yield product_service_1.default.searchProducts(req, res);
            logger_service_1.default.info('[controller -> searchProducts] Search process completed');
        }
        catch (error) {
            logger_service_1.default.error('[controller -> searchProducts] Error: ' + error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
