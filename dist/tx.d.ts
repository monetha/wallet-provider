import { TransactionConfig, TransactionReceipt } from 'web3-core';
export declare function sendTx(txConfig: TransactionConfig): Promise<string>;
/**
 * waitReceipt waits for transaction to finish for the given txHash,
 * returns a promise which is resolved when transaction finishes.
 * @param {string} txHash a string with transaction hash as value
 */
export declare const waitReceipt: (txHash: string) => Promise<TransactionReceipt>;
