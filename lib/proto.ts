import { enableWallet, getCurrentAccountAddress, getProviderInstance, sendTransaction } from './walletProvider';
import { sendAndWaitTx, waitReceipt } from './tx';
import { toHex, toBN } from './convert';
import { IWalletProviderErrorCode } from './errors/IWalletProviderErrorCode';
import { IWalletProviderError } from './errors/SdkError';

export {
  enableWallet,
  getCurrentAccountAddress,
  getProviderInstance,
  sendAndWaitTx,
  sendTransaction,
  waitReceipt,
  toHex,
  toBN,
  IWalletProviderErrorCode,
  IWalletProviderError,
};
