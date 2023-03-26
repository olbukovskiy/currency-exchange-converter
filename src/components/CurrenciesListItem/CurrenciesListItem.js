import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import React from "react";

const CurrenciesListItem = ({ currency, currencyValue }) => {
  return (
    <Grid item>
      <Typography variant="h4" component="h2">
        1 {currency} = {currencyValue} UAH
      </Typography>
    </Grid>
  );
};

CurrenciesListItem.propTypes = {
  currency: PropTypes.string,
  currencyValue: PropTypes.number,
};

export default React.memo(CurrenciesListItem);
