import { useState, useEffect } from "react";

import { SwapVertOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";

import CurrencyItem from "../CurrencyItem/CurrencyItem";
import { Loader } from "../Loader/Loader";
import { roundToTwoDecimals } from "../../helpers";
import { VARS } from "../../vars";

import { ConverterBox, ConverterThumb } from "./Converter.styled";

const { BASE_URL, KEY } = VARS;

const Converter = ({ currencies, baseCurrency }) => {
  const [currenciesKeys, setCurrenciesKeys] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [amount, setAmount] = useState(0);

  const [exchangeCurrencyRate, setExchangeCurrencyRate] = useState(0);
  const [isFromCurrency, setIsFromCurrency] = useState(true);

  let fromAmount = 0;
  let toAmount = 0;
  let fromLabel = "From";
  let toLabel = "To";

  if (isFromCurrency) {
    fromAmount = amount;
    toAmount = roundToTwoDecimals(amount * exchangeCurrencyRate);
    fromLabel = "From";
    toLabel = "To";
  }

  if (!isFromCurrency) {
    fromAmount = roundToTwoDecimals(amount / exchangeCurrencyRate);
    toAmount = amount;
    fromLabel = "To";
    toLabel = "From";
  }

  useEffect(() => {
    const currenciesKeys = Object.keys(currencies);
    const firstCurrency = currenciesKeys[0];

    setCurrenciesKeys(currenciesKeys);
    setFromCurrency(baseCurrency);
    setToCurrency(firstCurrency);
    setExchangeCurrencyRate(Number(currencies[firstCurrency]));
  }, [baseCurrency, currencies]);

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

  const toggleCurrencyHandler = () => {
    const toCurr = toCurrency;
    const fromCurr = fromCurrency;

    setToCurrency(fromCurr);
    setFromCurrency(toCurr);
    setIsFromCurrency(true);
  };

  return (
    <Container maxWidth="md">
      <ConverterThumb>
        {(!fromCurrency || !toCurrency) && <Loader />}
        {fromCurrency && toCurrency && (
          <ConverterBox>
            <Typography
              variant="h5"
              component="h2"
              style={{
                position: "absolute",
                top: -18,
                overflow: "hidden",
                zIndex: 1000,
                backgroundColor: "#eee",
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              Currency converter
            </Typography>
            <CurrencyItem
              label={fromLabel}
              currencies={currenciesKeys}
              currency={fromCurrency}
              amount={fromAmount}
              onChange={fromCurrencyChangeHandler}
              onAmountChange={fromAmountChangeHandler}
            />
            <IconButton
              color="info"
              style={{
                alignSelf: "flex-end",
                marginRight: 96,
              }}
              aria-label="swap"
              size="large"
              onClick={toggleCurrencyHandler}
            >
              <SwapVertOutlined style={{ width: 30, height: 30 }} />
            </IconButton>
            <CurrencyItem
              label={toLabel}
              currencies={currenciesKeys}
              currency={toCurrency}
              amount={toAmount}
              onChange={toCurrencyChangeHandler}
              onAmountChange={toAmountChangeHandler}
            />
          </ConverterBox>
        )}
      </ConverterThumb>
    </Container>
  );
};

export default Converter;
