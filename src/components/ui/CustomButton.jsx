import { Button } from "@mui/material";

const CustomButton = ({
  children,
  bgColor,
  textColor,
  hoverColor,
  width,
  type,
  border
}) => {
  return (
    <button
      type={type}
      className={` ${bgColor} ${textColor} ${hoverColor} ${width} ${border} hover:cursor-pointer hover:scale-95 transition-all duration-300 px-6 py-1 rounded-xl `}
    >
      {children}
    </button>
  );
};

export default CustomButton;
