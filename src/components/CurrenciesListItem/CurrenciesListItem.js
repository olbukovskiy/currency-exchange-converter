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

export default React.memo(CurrenciesListItem);
