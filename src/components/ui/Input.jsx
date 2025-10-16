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
  error,
}) => {
  return (
    <div className="flex flex-col">
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
      <span className=" font-thin text-red-400 text-sm">
        {error}
      </span>
    </div>
  );
};

export default Input;



// variant={"outlined"}
//           label={"User Name"}
//           type={"text"}
//           value={""}
//           onChange={""}
//           placeholder={"Enter User Name"}
//           required={true}
//           size={"small"}
//           fullWidth={true}
//           customWidth={"w-1/2"}
//           error={false}
