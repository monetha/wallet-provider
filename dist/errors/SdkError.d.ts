import { IWalletProviderErrorCode } from './IWalletProviderErrorCode';
export interface IWalletProviderError extends Error {
    sdkErrorCode: IWalletProviderErrorCode;
}
export declare function createSdkError(code: IWalletProviderErrorCode, message?: string, rawError?: Error): IWalletProviderError;
