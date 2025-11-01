import React from "react";
import { Circles } from "react-loader-spinner";

const Spinner = () => {
  return (
    <Circles
      height="80"
      width="80"
      color="#65AF9E"
      ariaLabel="circles-loading"
      wrapperStyle={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Spinner;
