"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var walletProvider_1 = require("./walletProvider");
exports.enableWallet = walletProvider_1.enableWallet;
exports.getCurrentAccountAddress = walletProvider_1.getCurrentAccountAddress;
exports.getProviderInstance = walletProvider_1.getProviderInstance;
var tx_1 = require("./tx");
exports.sendAndWaitTx = tx_1.sendAndWaitTx;
exports.waitReceipt = tx_1.waitReceipt;
