export module Hex {
  const HEX_VALUES = Array(16)
    .fill(0)
    .reduce<Record<string, number>>((acc, _, i) => {
      acc[i.toString(16)] = i;
      return acc
    }, {});

  export function parse(hex: string): number {
    return Array
      .from(hex)
      .reverse()
      .reduce((acc, hexChar, idx) => {
        const dec = HEX_VALUES[hexChar];
        if (dec === undefined) throw new Error(`Unexpected hex character '${hexChar}'`);

        return acc + dec * 16 ** idx
      }, 0);
  }

  export function from(number: number): string {
    return number.toString(16);
  }
}