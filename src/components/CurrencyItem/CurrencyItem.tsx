import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { CustomSelectChangeEventType } from "../../types";

type Props = {
  currencies: string[];
  currency: string;
  amount: number;
  label: string;
  onChange: (event: CustomSelectChangeEventType) => void;
  onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CurrencyItem: React.FunctionComponent<Props> = ({
  currencies,
  currency,
  amount,
  label,
  onChange,
  onAmountChange,
}) => {
  return (
    <Grid container spacing={5} justifyContent="center">
      <Grid item xs={8}>
        <TextField
          fullWidth
          type="number"
          label={label}
          value={amount}
          onChange={onAmountChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Select
          name="currency"
          value={currency}
          onChange={onChange}
          style={{ width: 100 }}
        >
          {currencies.map((item) => {
            return (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    </Grid>
  );
};

export default CurrencyItem;
