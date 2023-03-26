import React from "react";
import { Grid, Typography } from "@mui/material";

type Props = { currency: string; currencyValue: number };

const CurrenciesListItem: React.FunctionComponent<Props> = ({
  currency,
  currencyValue,
}) => {
  return (
    <Grid item>
      <Typography variant="h4" component="h2">
        1 {currency} = {currencyValue} UAH
      </Typography>
    </Grid>
  );
};

export default React.memo(CurrenciesListItem);
