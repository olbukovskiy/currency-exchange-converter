import CurrenciesList from "../CurrenciesList/CurrenciesList";

const Header = ({ exchanges }) => {
  return (
    <div>
      <CurrenciesList {...exchanges} />
    </div>
  );
};

export default Header;
