import BN from 'bn.js';

export function toHex(value: any) {
  if (value === null || value === undefined) {
    return null;
  }

  return `0x${toBN(value).toString('hex')}`;
}

/**
 * Converts given value to BN
 * Accepts:
 * - number - interpreted as decimal
 * - string - if with 0x prefix - hex, otherwise decimal
 * - BN
 * - bignumber.js object
 */
export function toBN(value: string | number | BN | any): BN {
  if (value === null || value === undefined) {
    return value;
  }

  if (BN.isBN(value)) {
    return value;
  }

  if (typeof value === 'string') {
    if (value.indexOf('0x') === 0) {
      return new BN(value.replace('0x', ''), 'hex');
    }

    return new BN(value, 10);
  }

  if (typeof value === 'number') {
    return new BN(value);
  }

  if (value.constructor && value.constructor.isBigNumber && value.constructor.isBigNumber(value)) {
    let hexValue: string;
    if (value.toHexString) {
      hexValue = value.toHexString();
    } else {
      hexValue = value.toString(16);
    }

    return new BN(hexValue.replace('0x', ''), 'hex');
  }

  return new BN(value);
}
