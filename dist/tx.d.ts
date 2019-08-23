import moment from 'moment';
import Web3 from 'web3';
import { TransactionReceipt, TransactionConfig } from 'web3-core';
/**
 * waitReceipt waits for transaction to finish for the given txHash,
 * returns a promise which is resolved when transaction finishes.
 * @param {string} txHash a string with transaction hash as value
 */
export declare const waitReceipt: (web3: Web3, txHash: string) => Promise<TransactionReceipt>;
/**
 * Sends given transaction using current wallet provider and waits until it is mined
 */
export declare const sendAndWaitTx: (txConfig: TransactionConfig) => Promise<TransactionReceipt>;
export declare function getBlockDate(web3: Web3, blockNr: number): Promise<moment.Moment>;
