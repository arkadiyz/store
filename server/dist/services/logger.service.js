"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}
function getTime() {
    let now = new Date();
    return now.toUTCString();
}
function doLog(line, level = 'Debug') {
    const fileName = getCallerFile();
    const timestamp = new Date().toISOString();
    line = `#--${fileName.trim()}--| ${getTime()} - ${level} - ${line}  \n`;
    fs.appendFileSync('./logs/backend.log', line);
}
function getCallerFile() {
    var _a;
    const stack = ((_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split('\n')) || [];
    const callerLine = stack[3] || '';
    // מצא שם קובץ בלבד (עם סיומת .ts או .js)
    const match = callerLine.match(/(?:\/|\\)([^\/\\]+?\.(ts|js)):/);
    return (match === null || match === void 0 ? void 0 : match[1]) || '--unknown--';
}
function debug(line) {
    doLog(line, 'Debug');
}
function info(line) {
    doLog(line, 'Info');
}
function warm(line) {
    doLog(line, 'Warm');
}
function error(line) {
    doLog(line, 'Error');
}
exports.default = {
    debug,
    info,
    warm,
    error,
};
