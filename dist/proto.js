"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var walletProvider_1 = require("./walletProvider");
exports.enableWallet = walletProvider_1.enableWallet;
exports.getCurrentAccountAddress = walletProvider_1.getCurrentAccountAddress;
var tx_1 = require("./tx");
exports.sendTx = tx_1.sendTx;
exports.waitReceipt = tx_1.waitReceipt;
