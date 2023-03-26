import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import CurrenciesListItem from "../CurrenciesListItem/CurrenciesListItem";
import { CurrenciesBox } from "./CurrenciesList.styled";

const CurrenciesList = (props) => {
  const propsArray = Object.keys(props);
  const namesOfCurrencies = ["USD", "EURO"];
  return (
    <CurrenciesBox>
      <Grid container spacing={4} justifyContent="center">
        {propsArray.map((item, index) => {
          return (
            <CurrenciesListItem
              key={item}
              currency={namesOfCurrencies[index]}
              currencyValue={props[item]}
            />
          );
        })}
      </Grid>
    </CurrenciesBox>
  );
};

CurrenciesList.propTypes = {
  props: PropTypes.shape({
    usdExchangeRate: PropTypes.number.isRequired,
    euroExchangeRate: PropTypes.number.isRequired,
  }),
};

export default CurrenciesList;
