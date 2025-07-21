"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', product_controller_1.getProducts);
router.get('/product-types', product_controller_1.getProductTypes);
router.post('/save', product_controller_1.saveProduct);
router.get('/delete/:id', product_controller_1.deleteProduct);
router.get('/search/:productName', product_controller_1.searchProducts);
exports.default = router;
