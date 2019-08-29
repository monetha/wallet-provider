import Web3 from 'web3';
import { TransactionConfig, TransactionReceipt } from 'web3-core';
/**
 * waitReceipt waits for transaction to finish for the given txHash,
 * returns a promise which is resolved when transaction finishes.
 *
 * @param {Web3} web3
 * @param {string} txHash a string with transaction hash as value
 */
export declare const waitReceipt: (web3: Web3, txHash: string) => Promise<TransactionReceipt>;
/**
 * Sends given transaction using current wallet provider and waits until it is mined
 */
export declare const sendAndWaitTx: (txConfig: TransactionConfig) => Promise<TransactionReceipt>;
