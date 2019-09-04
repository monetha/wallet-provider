# Integrating a crypto wallet into your dApp

## SDK for using wallets such as Metamask

### Basic usage

```typescript
import { enableWallet, getCurrentAccountAddress, sendAndWaitTx, getProviderInstance } from 'wallet-provider';
import { TransactionConfig } from 'web3-core';
import Web3 from 'web3';

const run = async () => {
  // Enable provider
  await enableWallet();

  // Get owner address
  const requesterAddress = await getCurrentAccountAddress();
  if (!requesterAddress) {
    throw new Error('No address in wallet');
  }

  // Create transaction
  const txConfig: TransactionConfig = {
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

  // Other standart usage of provider
  const balance = await providerWeb3.eth.getBalance(requesterAddress);
  console.log(balance);

  const gasPrice = await providerWeb3.eth.getGasPrice();
  console.log(gasPrice);

  const gasLimit = await providerWeb3.eth.estimateGas(txConfig);
  console.log(gasLimit);
}
```
