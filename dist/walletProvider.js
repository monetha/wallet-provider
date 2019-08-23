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
var convert_1 = require("./convert");
var web3_1 = __importDefault(require("web3"));
var promise_1 = require("./promise");
/**
 * Enables wallet provider usage so it can be used or throws error otherwise
 */
exports.enableWallet = function () { return __awaiter(_this, void 0, void 0, function () {
    var ethereum, result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ethereum = exports.getProviderInstance();
                if (!ethereum) {
                    throw new Error('Your browser does not have Ethereum compatible wallet extension');
                }
                if (!ethereum.enable) return [3 /*break*/, 5];
                result = void 0;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ethereum.enable()];
            case 2:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                throw new Error("Could not enable Ethereum wallet: " + e_1);
            case 4:
                // Metamask specific
                if (ethereum.isMetaMask) {
                    // Metamask must contain array of accounts with at least 1 account after enabling
                    if (!result || !result[0]) {
                        throw new Error('There was an unknown problem while enabling MetaMask');
                    }
                }
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * Gets current account address selected in metamask
 */
exports.getCurrentAccountAddress = function () { return __awaiter(_this, void 0, void 0, function () {
    var web3, provider, newWeb3, accounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                web3 = window.web3;
                if (web3 && web3.eth && web3.eth.accounts) {
                    return [2 /*return*/, web3.eth.accounts[0]];
                }
                provider = exports.getProviderInstance();
                if (!provider) {
                    return [2 /*return*/, null];
                }
                // 2. Try metamask-specific account property
                if (provider.isMetaMask !== undefined && provider.isMetaMask()) {
                    return [2 /*return*/, provider.selectedAddress];
                }
                newWeb3 = new web3_1.default(provider);
                return [4 /*yield*/, newWeb3.eth.getAccounts()];
            case 1:
                accounts = _a.sent();
                if (!accounts) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, accounts[0]];
        }
    });
}); };
/**
 * Submits transaction using metamask and returns its hash
 */
exports.sendTransaction = function (txConfig) { return __awaiter(_this, void 0, void 0, function () {
    var provider;
    return __generator(this, function (_a) {
        provider = exports.getProviderInstance();
        if (!provider) {
            throw new Error('Your browser does not have Ethereum compatible wallet extension');
        }
        return [2 /*return*/, promise_1.cbToPromise(function (callback) { return provider.sendAsync({
                method: 'eth_sendTransaction',
                params: [{
                        gasPrice: convert_1.toHex(txConfig.gasPrice),
                        gas: convert_1.toHex(txConfig.gas),
                        to: txConfig.to,
                        from: txConfig.from,
                        value: convert_1.toHex(txConfig.value),
                        data: txConfig.data,
                    }],
            }, callback); })];
    });
}); };
/**
 * Gets current wallet provider instance
 */
exports.getProviderInstance = function () {
    // 1. Try getting modern provider
    var ethereum = window.ethereum;
    if (ethereum) {
        return ethereum;
    }
    // 2. Try getting legacy provider
    var web3 = window.web3;
    if (web3 && web3.currentProvider) {
        return web3.currentProvider;
    }
    return null;
};
