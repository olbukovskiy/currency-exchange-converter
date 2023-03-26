import PropTypes from "prop-types";
import { Container, Typography } from "@mui/material";
import CurrenciesList from "../CurrenciesList/CurrenciesList";
import { ConverterLogo, HeaderComp } from "./Header.styled";

const Header = ({ exchanges }) => {
  return (
    <HeaderComp>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ConverterLogo
          src="https://i.postimg.cc/rmJLfqqT/logo-currency-converter.png"
          alt="Logo currency converter"
        />

        <Typography variant="h3" component="h1" style={{ marginBottom: 20 }}>
          Currency Converter
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          style={{
            marginBottom: -16,
            overflow: "hidden",
            zIndex: 1000,
            backgroundColor: "#eee",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          Current Exchange Rates
        </Typography>
        <CurrenciesList {...exchanges} />
      </Container>
    </HeaderComp>
  );
};

Header.propTypes = {
  exchanges: PropTypes.shape({
    usdExchangeRate: PropTypes.number.isRequired,
    euroExchangeRate: PropTypes.number.isRequired,
  }),
};

export default Header;
