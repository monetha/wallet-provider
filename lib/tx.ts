import Web3 from 'web3';
import { TransactionConfig, TransactionReceipt } from 'web3-core';
import { enableWallet, getProviderInstance, sendTransaction } from './walletProvider';

export async function sendTx(txConfig: TransactionConfig) {
  await enableWallet();

  return sendTransaction(txConfig);
}

/**
 * waitReceipt waits for transaction to finish for the given txHash,
 * returns a promise which is resolved when transaction finishes.
 * @param {string} txHash a string with transaction hash as value
 */
export const waitReceipt = async (txHash: string): Promise<TransactionReceipt> => {
  const ethereum = getProviderInstance();
  if (!ethereum) {
    throw new Error('You have to use Ethereum browser to get receipt');
  }

  const web3 = new Web3(ethereum);

  for (let i = 0; i < 50; i += 1) {

    const receipt = await web3.eth.getTransactionReceipt(txHash);

    if (!receipt) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      continue;
    }

    if (!receipt.status) {
      console.error(receipt);
      throw new Error('Transaction has failed');
    }

    return receipt;
  }

  throw new Error('Failed to get receipt after 50 retries');
};