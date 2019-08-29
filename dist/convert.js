"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
function toHex(value) {
    if (value === null || value === undefined) {
        return null;
    }
    return "0x" + toBN(value).toString('hex');
}
exports.toHex = toHex;
/**
 * Converts given value to BN
 * Accepts:
 * - number - interpreted as decimal
 * - string - if with 0x prefix - hex, otherwise decimal
 * - BN
 * - bignumber.js object
 */
function toBN(value) {
    if (value === null || value === undefined) {
        return value;
    }
    if (bn_js_1.default.isBN(value)) {
        return value;
    }
    if (typeof value === 'string') {
        if (value.indexOf('0x') === 0) {
            return new bn_js_1.default(value.replace('0x', ''), 'hex');
        }
        return new bn_js_1.default(value, 10);
    }
    if (typeof value === 'number') {
        return new bn_js_1.default(value);
    }
    if (value.constructor && value.constructor.isBigNumber && value.constructor.isBigNumber(value)) {
        var hexValue = void 0;
        if (value.toHexString) {
            hexValue = value.toHexString();
        }
        else {
            hexValue = value.toString(16);
        }
        return new bn_js_1.default(hexValue.replace('0x', ''), 'hex');
    }
    return new bn_js_1.default(value);
}
exports.toBN = toBN;
