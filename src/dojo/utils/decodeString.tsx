import { BigNumberish, num, shortString } from "starknet";

export const decodeString = (bigInt: BigNumberish) => {
  const hexString = num.toHexString(bigInt);
  return shortString.decodeShortString(hexString);
};

export const encodeString = (str: string) => {
  return shortString.encodeShortString(str);
};