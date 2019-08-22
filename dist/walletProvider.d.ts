import { TransactionConfig } from 'web3-core';
import { CustomProvider } from 'web3-providers';
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
export declare const enableWallet: () => Promise<void>;
/**
 * Gets current account address selected in metamask
 */
export declare const getCurrentAccountAddress: () => Promise<any>;
/**
 * Submits transaction using metamask and returns its hash
 */
export declare const sendTransaction: (txConfig: TransactionConfig) => Promise<string>;
/**
 * Gets current wallet provider instance
 */
export declare const getProviderInstance: () => IWalletProvider;
/**
 * cbToPromise is a helper function that executes callback invoking function and returns a promise that
 * gets resolves as soon as the callback function gets invoked.
 */
export declare const cbToPromise: <TResult>(fnExecutor: (callback: any) => any) => Promise<TResult>;
