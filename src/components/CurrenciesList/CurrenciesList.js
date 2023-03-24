import CurrenciesListItem from "../CurrenciesListItem/CurrenciesListItem";

const CurrenciesList = (props) => {
  const propsArray = Object.keys(props);
  const namesOfCurrencies = ["USD", "EURO"];
  return (
    <ul>
      {propsArray.map((item, index) => {
        return (
          <CurrenciesListItem
            key={item}
            currency={namesOfCurrencies[index]}
            currencyValue={props[item]}
          />
        );
      })}
    </ul>
  );
};

export default CurrenciesList;
