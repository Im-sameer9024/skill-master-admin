import { TextField } from "@mui/material";

const Input = ({
  variant,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  size,
  fullWidth,
  customWidth,
}) => {
  return (
    <TextField
      variant={variant}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      size={size}
      fullWidth={fullWidth}
      sx={{
        width: customWidth,
        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
          borderColor: "#65AF9E", // tailwind sky-400
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#65AF9E",
        },
      }}
    />
  );
};

export default Input;
