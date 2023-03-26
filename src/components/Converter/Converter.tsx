import { useState, useEffect } from "react";

import { SwapVertOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { toast } from "react-toastify";

import CurrencyItem from "../CurrencyItem/CurrencyItem";
import { roundToTwoDecimals } from "../../helpers";
import {
  CustomSelectChangeEventType,
  ErrorWithMessage,
  CurrenciesObj,
} from "../../types";
import { VARS } from "../../vars";

import { ConverterBox, ConverterThumb } from "./Converter.styled";

const { BASE_URL, KEY } = VARS;

type Props = {
  currencies: CurrenciesObj;
  baseCurrency: string;
};

const Converter: React.FunctionComponent<Props> = ({
  currencies,
  baseCurrency,
}) => {
  const [currenciesKeys, setCurrenciesKeys] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [err, setErr] = useState<null | string>(null);

  const [amount, setAmount] = useState(1);

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
        })
        .catch((error: ErrorWithMessage) => setErr(error.message));
    };

    getExchangeCurrencyRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (!err) return;

    toast.error(err, {
      autoClose: 3000,
    });
  }, [err]);

  const fromCurrencyChangeHandler = (event: CustomSelectChangeEventType) => {
    setFromCurrency(event.target.value);
  };

  const toCurrencyChangeHandler = (event: CustomSelectChangeEventType) => {
    setToCurrency(event.target.value);
  };

  const fromAmountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAmount(Number(event.target.value));
    setIsFromCurrency(true);
  };

  const toAmountChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAmount(Number(event.target.value));
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
    <section>
      <Container maxWidth="md">
        <ConverterThumb>
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
    </section>
  );
};

export default Converter;
