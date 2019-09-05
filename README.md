# Integrating a crypto wallet into your dApp

## SDK for using wallets such as

- Metamask desktop
- Metamask mobile
- Opera crypto wallet

### Exported methods

- `enableWallet` - enables wallet provider usage so it can be used or throws error otherwise
- `getCurrentAccountAddress` - gets current account address selected in metamask
- `sendAndWaitTx` - sends given transaction using current wallet provider and waits until it is mined
- `sendTransaction` - submits transaction using metamask and returns its hash
- `waitReceipt` - waits for transaction to finish for the given hash
- `getProviderInstance` - gets current wallet provider instance
- `toHex` - converts any given value to hex string, e.g. "0x123"
- `toBN` - converts any given value to bignumber.js one

In case of exception package throws `IWalletProviderError` with codes specified in `IWalletProviderErrorCode`.

### Basic usage

```typescript
import { 
    enableWallet, 
    getCurrentAccountAddress, 
    sendAndWaitTx, 
    getProviderInstance, 
    sendTransaction, 
    waitReceipt,
 } from 'wallet-provider';
import { TransactionConfig } from 'web3-core';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { someContractAbi } from './contracts';

const run = async () => {

  try {
    // Enable provider
    await enableWallet();

    // Get owner address
    const requesterAddress = await getCurrentAccountAddress();
    if (!requesterAddress) {
      throw new Error('No address in wallet');
    }

    // Create transaction
    let txConfig: TransactionConfig = {
      from: requesterAddress,
      to: `0xA2703F979bc19c6bB1cE4aF61b661526B3677799`,
      value: '1000000000000000000', // 1 ETH in wei
    };

    // Simplest way to send and wait for receipt
    let receipt = await sendAndWaitTx(txConfig);

    // Or you can do manual steps by yourself:
    // First get the provider instance
    const provider = getProviderInstance();
    const web3 = new Web3(provider);

    // Send transaction, get hash
    const hash = await sendTransaction(txConfig);

    // Wait for receipt
    receipt = await waitReceipt(web3, hash);

    // Common usage of web3 library
    const balance = await web3.eth.getBalance(requesterAddress);

    const gasPrice = await web3.eth.getGasPrice();

    // Calling any contract methods is also easy
    const someContract = new web3.eth.Contract(someContractAbi as AbiItem[], '0x3A3ebe78B24f33cb05DDa241f817Db0adaD95ae5');
    const gas = await someContract.methods.exampleMethod().estimateGas();
    const data = someContract.methods.exampleMethod().encodeABI();

    txConfig = {
      from: requesterAddress,
      to: `0x3A3ebe78B24f33cb05DDa241f817Db0adaD95ae5`,
      gas,
      data,
      gasPrice,
    };
    receipt = await sendAndWaitTx(txConfig);
  } catch (e) {
    console.error(e);
  }
}
```

### Description

Sometimes during integrating an Ethereum wallet (like Opera or MetaMask) into decentralized web applications you can encounter unexpected complexity.

After some more research and tinkering we managed to find an integration methods that seems to avoid the quirks of individual wallet providers.

In short, here’s what you should expect from wallet providers:

– They should automatically inject the window.ethereum global variable, which must provide these methods:
  * `.send(rpcMethodName: string, params?: Array<any>): Promise<any>` – this is the preferred and recommended way (by them) to call an RPC method as it returns the promise.
  * `.sendAsync(payload, callback: (error, result) => void)` – this is an optional alternative, only needed when provider internally uses a Web3 object prior to version 1.0.0-beta38.
  * `.on(eventName, listener)`– a method of the EventEmitter interface which allows listening for various provider events like “networkChanged”, “accountsChanged”, etc.
  * `.removeListener(eventName, listener)` – the same, but for removing the event listener.
- They should inject `window.web3.currentProvider` – which is essentially the same object as window.ethereum.

The slow creation of the EIP standard and the volatile implementation of Web3 have led to inconsistencies in Ethereum wallet provider implementations. Hopefully, the situation will get better in the future, but for now we have what we have.
