"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var web3_1 = __importDefault(require("web3"));
var walletProvider_1 = require("./walletProvider");
/**
 * waitReceipt waits for transaction to finish for the given txHash,
 * returns a promise which is resolved when transaction finishes.
 * @param {string} txHash a string with transaction hash as value
 */
exports.waitReceipt = function (web3, txHash) { return __awaiter(_this, void 0, void 0, function () {
    var i, receipt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 50)) return [3 /*break*/, 6];
                return [4 /*yield*/, web3.eth.getTransactionReceipt(txHash)];
            case 2:
                receipt = _a.sent();
                if (!!receipt) return [3 /*break*/, 4];
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                if (!receipt.status) {
                    console.error(receipt);
                    throw new Error('Transaction has failed');
                }
                return [2 /*return*/, receipt];
            case 5:
                i += 1;
                return [3 /*break*/, 1];
            case 6: throw new Error('Failed to get receipt after 50 retries');
        }
    });
}); };
/**
 * Sends given transaction using current wallet provider and waits until it is mined
 */
exports.sendAndWaitTx = function (txConfig) { return __awaiter(_this, void 0, void 0, function () {
    var txHash, web3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, walletProvider_1.sendTransaction(txConfig)];
            case 1:
                txHash = _a.sent();
                web3 = new web3_1.default(walletProvider_1.getProviderInstance());
                return [2 /*return*/, exports.waitReceipt(web3, txHash)];
        }
    });
}); };
function getBlockDate(web3, blockNr) {
    return __awaiter(this, void 0, void 0, function () {
        var block;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, web3.eth.getBlock(blockNr)];
                case 1:
                    block = _a.sent();
                    if (!block) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, moment_1.default(new Date(Number(block.timestamp) * 1000))];
            }
        });
    });
}
exports.getBlockDate = getBlockDate;
