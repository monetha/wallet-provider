import { IWalletProviderErrorCode } from './IWalletProviderErrorCode';

export interface IWalletProviderError extends Error {
  sdkErrorCode: IWalletProviderErrorCode;
}

export function createSdkError(code: IWalletProviderErrorCode, message?: string, rawError?: Error): IWalletProviderError {
  let error: Partial<IWalletProviderError> = rawError;
  if (!error) {
    error = new Error(message);
  }

  error.sdkErrorCode = code;

  if (message) {
    error.message = message;
  }

  return error as IWalletProviderError;
}
