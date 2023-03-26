import { Grid } from "@mui/material";
import CurrenciesListItem from "../CurrenciesListItem/CurrenciesListItem";
import { CurrenciesBox } from "./CurrenciesList.styled";

type Props = {
  [prop: string]: number;
};

const CurrenciesList: React.FunctionComponent<Props> = (props) => {
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

export default CurrenciesList;
