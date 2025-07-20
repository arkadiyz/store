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
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
exports.checkConnection = checkConnection;
const client_1 = require("@prisma/client");
const logger_service_1 = __importDefault(require("./logger.service"));
// יצירת instance של Prisma Client
const prisma = globalThis.__prisma ||
    new client_1.PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });
if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma = prisma;
}
// פונקציה להתחברות למסד הנתונים
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            logger_service_1.default.info('Successfully connected to database');
        }
        catch (error) {
            logger_service_1.default.error('Failed to connect to database: ' + error);
            throw error;
        }
    });
}
// פונקציה לניתוק מהמסד
function disconnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$disconnect();
            logger_service_1.default.info('Successfully disconnected from database');
        }
        catch (error) {
            logger_service_1.default.error('Error disconnecting from database: ' + error);
        }
    });
}
// פונקציה לבדיקת החיבור
function checkConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$queryRaw `SELECT 1`;
            return true;
        }
        catch (error) {
            logger_service_1.default.error('Database connection check failed: ' + error);
            return false;
        }
    });
}
exports.default = prisma;
