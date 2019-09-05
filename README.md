# Integrating a crypto wallet into your dApp

## SDK for using wallets such as Metamask

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
import {AbiItem} from 'web3-utils';
import { passportFactoryAbi } from './contracts';

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
    console.log(receipt);
    
    // Or you can do manual steps by yourself:
    // First get the provider instance
    const provider = getProviderInstance();
    const providerWeb3 = new Web3(provider);
    
    // Send transaction, get hash
    const hash = await sendTransaction(txConfig);
    console.log('hash', hash);
    
    // Wait for receipt
    receipt = await waitReceipt(providerWeb3, hash);
    console.log(receipt);
    
    // Common usage of web3 library
    const balance = await providerWeb3.eth.getBalance(requesterAddress);
    console.log(balance);
    
    const gasPrice = await providerWeb3.eth.getGasPrice();
    console.log(gasPrice);
    
    // Calling contract methods is also easy
    const passportFactoryContract = new providerWeb3.eth.Contract(passportFactoryAbi as AbiItem[], '0x3A3ebe78B24f33cb05DDa241f817Db0adaD95ae5');
    const gas = await passportFactoryContract.methods.createPassport().estimateGas();
    const data = passportFactoryContract.methods.createPassport().encodeABI();
    
    txConfig = {
    from: requesterAddress,
    to: `0x3A3ebe78B24f33cb05DDa241f817Db0adaD95ae5`,
    gas,
    data,
    gasPrice,
    };
    receipt = await sendAndWaitTx(txConfig);
    console.log(receipt);
  } catch(e) {
    console.error(e);
  }
}
```
