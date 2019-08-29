# wallet-provider

## SDK for using wallets such as Metamask

### Basic usage

```typescript
import { enableWallet, getCurrentAccountAddress, sendAndWaitTx } from 'wallet-provider';
import { TransactionConfig } from 'web3-core';

const run = async () => {
  await enableWallet();

  const requesterAddress = await getCurrentAccountAddress();
  if (!requesterAddress) {
    throw new Error('No address in wallet');
  }

  const txConfig: TransactionConfig = {
    from: `0xF8A0014d85b0746268922730cDA8F319da198437`,
    to: `0xe570A45faf9dCB6A377dDa7Ff92AcA4B6B360b1A`,
    value: '1000000000000000000', // 1 ETH
  };
  
  const receipt = await sendAndWaitTx(txConfig);
  
  console.log(receipt);
}
```
