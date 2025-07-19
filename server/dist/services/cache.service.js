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
exports.loadProductTypesToCache = loadProductTypesToCache;
exports.getProductTypesFromCache = getProductTypesFromCache;
const client_1 = require("@prisma/client");
const logger_service_1 = __importDefault(require("./logger.service"));
const prisma = new client_1.PrismaClient();
let productTypesCache = [];
function loadProductTypesToCache() {
    return __awaiter(this, void 0, void 0, function* () {
        productTypesCache = yield prisma.productType.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        logger_service_1.default.info('🔄 Product types cached:' + productTypesCache.length);
    });
}
function getProductTypesFromCache() {
    return productTypesCache;
}
