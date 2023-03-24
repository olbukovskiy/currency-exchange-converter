import React from "react";

const CurrenciesListItem = ({ currency, currencyValue }) => {
  return (
    <li>
      <h2>
        {currency}: {currencyValue}
      </h2>
    </li>
  );
};

export default React.memo(CurrenciesListItem);
