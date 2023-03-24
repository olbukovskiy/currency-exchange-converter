import React, { useEffect, useState } from "react";
import CurrencyItem from "../CurrencyItem/CurrencyItem";
import Header from "../Header/Header";
import { VARS } from "../../vars";
import "./App.css";

const { BASE_URL, KEY } = VARS;

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [amount, setAmount] = useState(0);

  const [exchangeCurrencyRate, setExchangeCurrencyRate] = useState(null);
  const [isFromCurrency, setIsFromCurrency] = useState(true);

  const [usdExchangeRate, setUsdExchangeRate] = useState(null);
  const [euroExchangeRate, setEuroExchangeRate] = useState(null);

  let fromAmount;
  let toAmount;

  if (isFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeCurrencyRate;
  }

  if (!isFromCurrency) {
    fromAmount = amount / exchangeCurrencyRate;
    toAmount = amount;
  }

  useEffect(() => {
    const getAllСurrencies = () => {
      fetch(`${BASE_URL}/${KEY}/latest/UAH`)
        .then((response) => response.json())
        .then((data) => {
          const currenciesKeys = Object.keys(data.conversion_rates);
          const baseCurrency = data.base_code;
          const firstCurrency = currenciesKeys[0];

          setCurrencies(currenciesKeys);
          setFromCurrency(baseCurrency);
          setToCurrency(firstCurrency);
          setExchangeCurrencyRate(data.conversion_rates[firstCurrency]);

          const usdRate = data.conversion_rates["USD"];
          const euroRate = data.conversion_rates["EUR"];
          setUsdExchangeRate(usdRate);
          setEuroExchangeRate(euroRate);
        });
    };

    getAllСurrencies();
  }, []);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    const getExchangeCurrencyRate = () => {
      fetch(`${BASE_URL}/${KEY}/pair/${fromCurrency}/${toCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          setExchangeCurrencyRate(data.conversion_rate);
        });
    };

    getExchangeCurrencyRate();
  }, [fromCurrency, toCurrency]);

  const fromCurrencyChangeHandler = (event) => {
    setFromCurrency(event.target.value);
  };

  const toCurrencyChangeHandler = (event) => {
    setToCurrency(event.target.value);
  };

  const fromAmountChangeHandler = (event) => {
    setAmount(event.target.value);
    setIsFromCurrency(true);
  };

  const toAmountChangeHandler = (event) => {
    setAmount(event.target.value);
    setIsFromCurrency(false);
  };

  return (
    <div className="App">
      <Header exchanges={{ usdExchangeRate, euroExchangeRate }} />
      <CurrencyItem
        currencies={currencies}
        currency={fromCurrency}
        amount={fromAmount}
        onChange={fromCurrencyChangeHandler}
        onAmountChange={fromAmountChangeHandler}
      />
      <CurrencyItem
        currencies={currencies}
        currency={toCurrency}
        amount={toAmount}
        onChange={toCurrencyChangeHandler}
        onAmountChange={toAmountChangeHandler}
      />
    </div>
  );
};

export default App;
