export const toFloat = (value: string) => Number(value.replace(/[,-]/g, '.'));

const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

export const numberFormatter = (number: any) => {
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) {
    return number;
  }
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  return Number(scaled.toFixed(1)) + suffix;
};

export const formatNumber = (value: number, digits = 0) => {
  const SI_UNITS = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
    { value: 1, symbol: '' },
  ];

  // The regex is used to trim trailing zeros e.g. 1.0 becomes 1 and 1.10 becomes 1.1
  const regEx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const unit = SI_UNITS.find((x) => value >= x.value);

  return unit
    ? (value / unit.value).toFixed(digits).replace(regEx, '$1') + unit.symbol
    : '0';
};

export const isNumber = (value: any): value is number =>
  typeof value === 'number';

export const isDecimalNumber = (value: any): value is number => {
  return value % 1 !== 0;
};

export const digitsAfterDecimal = (num: number | string) => {
  if (Number.isInteger(Number(num))) {
    return 0;
  }
  return num?.toString()?.trim()?.split('.')?.[1]?.length;
};
