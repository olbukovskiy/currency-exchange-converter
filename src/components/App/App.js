import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Header from "../Header/Header";
import Converter from "../Converter/Converter";
import { VARS } from "../../vars";
import { currenciesRateCalc } from "../../helpers";

import { AppContainer } from "./App.styled";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../Loader/Loader";

const { BASE_URL, KEY } = VARS;

const App = () => {
  const [currencies, setCurrencies] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("");
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [usdExchangeRate, setUsdExchangeRate] = useState(0);
  const [euroExchangeRate, setEuroExchangeRate] = useState(0);

  useEffect(() => {
    const getAllСurrencies = () => {
      setIsLoading(true);

      fetch(`${BASE_URL}/${KEY}/latest/UAH`)
        .then((response) => response.json())
        .then(({ conversion_rates, base_code }) => {
          const usdRate = Number(currenciesRateCalc(conversion_rates["USD"]));
          const euroRate = Number(currenciesRateCalc(conversion_rates["EUR"]));

          setCurrencies(conversion_rates);
          setBaseCurrency(base_code);
          setUsdExchangeRate(usdRate);
          setEuroExchangeRate(euroRate);
        })
        .catch((error) => {
          setErr(error.message);
        })
        .finally(() => setIsLoading(false));
    };

    getAllСurrencies();
  }, []);

  useEffect(() => {
    if (!err) return;

    toast.error(err, {
      autoClose: 3000,
    });
  }, [err]);

  return (
    <AppContainer>
      <Header
        exchanges={{
          usdExchangeRate,
          euroExchangeRate,
        }}
      />

      <Converter currencies={currencies} baseCurrency={baseCurrency} />
      {isLoading && <Loader />}
      <ToastContainer />
    </AppContainer>
  );
};

export default App;
