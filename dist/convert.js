"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verifiable_data_1 = require("verifiable-data");
function toHex(value) {
    if (value === null || value === undefined) {
        return null;
    }
    return "0x" + verifiable_data_1.toBN(value).toString('hex');
}
exports.toHex = toHex;
