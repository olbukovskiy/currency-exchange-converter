import { RotatingLines } from "react-loader-spinner";
import { Backdrop, LoaderBox } from "./Loader.styled";

export const Loader = () => {
  return (
    <Backdrop>
      <LoaderBox>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </LoaderBox>
    </Backdrop>
  );
};
