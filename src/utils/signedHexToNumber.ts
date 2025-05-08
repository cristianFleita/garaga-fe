export function signedHexToNumber(hexString: string, bits = 32): number {
  let value = BigInt(hexString);

  const mask = (BigInt(1) << BigInt(bits)) - BigInt(1);
  value = value & mask;

  const msbMask = BigInt(1) << BigInt(bits - 1);

  const isNegative = (value & msbMask) !== BigInt(0);

  if (isNegative) {
    value -= BigInt(1) << BigInt(bits);
    value -= BigInt(1);
  }

  return Number(value);
}
