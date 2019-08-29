import BN from 'bn.js';
export declare function toHex(value: any): string;
/**
 * Converts given value to BN
 * Accepts:
 * - number - interpreted as decimal
 * - string - if with 0x prefix - hex, otherwise decimal
 * - BN
 * - bignumber.js object
 */
export declare function toBN(value: string | number | BN | any): BN;
