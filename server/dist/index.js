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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_service_1 = __importDefault(require("./services/logger.service"));
const client_1 = require("@prisma/client");
const cache_service_1 = require("./services/cache.service");
// import db from './services/db.service';
// import authRoutes from './api/auth/auth.routes';
const product_routes_1 = __importDefault(require("./api/product/product.routes"));
const logger_service_2 = __importDefault(require("./services/logger.service"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === 'prodaction') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
}
else {
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
}
// Routes
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Welcome to the API');
    const productTypes = yield (0, cache_service_1.getProductTypesFromCache)();
    // const products = await prisma.product.findMany();
    res.json(productTypes);
}));
app.use('/api/product', product_routes_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, cache_service_1.loadProductTypesToCache)(); // פעולה אסינכרונית
        const productTypes = yield (0, cache_service_1.getProductTypesFromCache)();
        logger_service_2.default.info(`🔄 ${JSON.stringify(productTypes)} `);
        // Server start
        const port = process.env.PORT || 5000;
        server.listen(port, () => {
            logger_service_1.default.info('====================================');
            logger_service_1.default.info(`Server is running on port: ${port}`);
            logger_service_1.default.info('/==================================/');
        });
    });
}
startServer();
