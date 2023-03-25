import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Converter from "../Converter/Converter";

import { VARS } from "../../vars";
import { currenciesRateCalc } from "../../helpers";
import { AppContainer } from "./App.styled";

const { BASE_URL, KEY } = VARS;

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");

  const [usdExchangeRate, setUsdExchangeRate] = useState(null);
  const [euroExchangeRate, setEuroExchangeRate] = useState(null);

  useEffect(() => {
    const getAllСurrencies = () => {
      fetch(`${BASE_URL}/${KEY}/latest/UAH`)
        .then((response) => response.json())
        .then(({ conversion_rates, base_code }) => {
          const currenciesRatesAndTypes = conversion_rates;
          const baseCurrency = base_code;
          const usdRate = currenciesRateCalc(conversion_rates["USD"]);
          const euroRate = currenciesRateCalc(conversion_rates["EUR"]);

          setCurrencies(currenciesRatesAndTypes);
          setBaseCurrency(baseCurrency);
          setUsdExchangeRate(usdRate);
          setEuroExchangeRate(euroRate);
        });
    };

    getAllСurrencies();
  }, []);

  return (
    <AppContainer>
      <Header
        exchanges={{
          usdExchangeRate,
          euroExchangeRate,
        }}
      />

      <Converter currencies={currencies} baseCurrency={baseCurrency} />
    </AppContainer>
  );
};

export default App;
