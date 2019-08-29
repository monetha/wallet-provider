import Web3 from 'web3';
import { TransactionConfig, TransactionReceipt } from 'web3-core';
import { getProviderInstance, sendTransaction } from './walletProvider';
import { createSdkError } from './errors/SdkError';
import { ErrorCode } from './errors/ErrorCode';

/**
 * waitReceipt waits for transaction to finish for the given txHash,
 * returns a promise which is resolved when transaction finishes.
 *
 * @param {Web3} web3
 * @param {string} txHash a string with transaction hash as value
 */
export const waitReceipt = async (web3: Web3, txHash: string): Promise<TransactionReceipt> => {
  for (let i = 0; i < 50; i += 1) {

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    if (!receipt) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      continue;
    }

    if (!receipt.status) {
      console.error(receipt);
      throw createSdkError(ErrorCode.TransactionFailed, 'Transaction has failed');
    }

    return receipt;
  }

  throw createSdkError(ErrorCode.GetReceiptFailed, 'Failed to get receipt after 50 retries');
};

/**
 * Sends given transaction using current wallet provider and waits until it is mined
 */
export const sendAndWaitTx = async (txConfig: TransactionConfig): Promise<TransactionReceipt> => {
  const txHash = await sendTransaction(txConfig);

  const web3 = new Web3(getProviderInstance());

  return waitReceipt(web3, txHash);
};
