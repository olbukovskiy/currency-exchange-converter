export const roundToTwoDecimals = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const currenciesRateCalc = (currencyRate) => {
  return (1 / Number(currencyRate)).toFixed(2);
};
