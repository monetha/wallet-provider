import { TransactionConfig } from 'web3-core';
import { toHex } from './convert';
import { CustomProvider } from 'web3-providers';
import Web3 from 'web3';
import { cbToPromise } from './promise';
import { createSdkError } from './errors/SdkError';
import { IWalletProviderErrorCode } from './errors/IWalletProviderErrorCode';

export interface IWalletProvider extends CustomProvider {

  /**
   * Prior to 1.0.0-beta38 web3 compatible way of sending transactions
   */
  sendAsync?(payload: object, callback: (error: any, result: any) => void): void;

  /**
   * Some ethereum-browsers specific enable method
   */
  enable?(): string[];

  /**
   * Metamask-only indicator
   */
  isMetaMask?(): boolean;

  /**
   * Metamask-only property for current account address
   */
  selectedAddress?: string;
}

/**
 * Enables wallet provider usage so it can be used or throws error otherwise
 */
export const enableWallet = async () => {
  const ethereum = getProviderInstance();
  if (!ethereum) {
    throw createSdkError(IWalletProviderErrorCode.NoEthereumCompatibleWalletExtensionFound, 'Your browser does not have Ethereum compatible wallet extension');
  }

  // Some web3 browsers needs enabling
  if (ethereum.enable) {
    let result;

    try {
      result = await ethereum.enable();
    } catch (e) {
      throw createSdkError(IWalletProviderErrorCode.CouldNotEnableEthereumWallet, `Could not enable Ethereum wallet: ${e}`);
    }

    // Metamask specific
    if (ethereum.isMetaMask) {

      // Metamask must contain array of accounts with at least 1 account after enabling
      if (!result || !result[0]) {
        throw createSdkError(IWalletProviderErrorCode.MetamaskEnablingUnknownProblem, 'There was an unknown problem while enabling MetaMask');
      }
    }
  }
};

/**
 * Gets current account address selected in metamask
 */
export const getCurrentAccountAddress = async () => {

  // 1. Try to get accounts from injected web3 object (legacy)
  const { web3 } = (window as any);
  if (web3 && web3.eth && web3.eth.accounts) {
    return web3.eth.accounts[0];
  }

  const provider = getProviderInstance();
  if (!provider) {
    return null;
  }

  // 2. Try metamask-specific account property
  if (provider.isMetaMask !== undefined && provider.isMetaMask()) {
    return provider.selectedAddress;
  }

  // 3. Try calling get_accounts rpc and take first entry
  const newWeb3 = new Web3(provider);
  const accounts = await newWeb3.eth.getAccounts();

  if (!accounts) {
    return null;
  }

  return accounts[0];
};

/**
 * Submits transaction using metamask and returns its hash
 */
export const sendTransaction = async (txConfig: TransactionConfig): Promise<string> => {
  const provider = getProviderInstance();
  if (!provider) {
    throw createSdkError(IWalletProviderErrorCode.NoEthereumCompatibleWalletExtensionFound, 'Your browser does not have Ethereum compatible wallet extension');
  }

  return cbToPromise<string>((callback) => provider.sendAsync({
    method: 'eth_sendTransaction',
    params: [{
      gasPrice: toHex(txConfig.gasPrice),
      gas: toHex(txConfig.gas),
      to: txConfig.to,
      from: txConfig.from,
      value: toHex(txConfig.value),
      data: txConfig.data,
    }],
  }, callback));
};

/**
 * Gets current wallet provider instance
 */
export const getProviderInstance = (): IWalletProvider | null => {

  // 1. Try getting modern provider
  const { ethereum } = (window as any);
  if (ethereum) {
    return ethereum;
  }

  // 2. Try getting legacy provider
  const { web3 } = (window as any);
  if (web3 && web3.currentProvider) {
    return web3.currentProvider;
  }

  return null;
};
