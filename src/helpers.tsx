export const roundToTwoDecimals = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const currenciesRateCalc = (currencyRate: number) => {
  return (1 / Number(currencyRate)).toFixed(2);
};
