const CurrencyItem = ({
  currencies,
  currency,
  amount,
  onChange,
  onAmountChange,
}) => {
  return (
    <div>
      <select name="currencyItem" value={currency} onChange={onChange}>
        {currencies.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
      <input type="number" value={amount} onChange={onAmountChange} />
    </div>
  );
};

export default CurrencyItem;
