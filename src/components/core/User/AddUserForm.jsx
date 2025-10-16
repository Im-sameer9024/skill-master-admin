import { Cancel, Close, Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import Input from "../../ui/Input";
import CustomButton from "../../ui/CustomButton";

const AddUserForm = ({ toggleAddUserModal }) => {
  return (
    <div className="w-full">
      <p className=" flex justify-between my-4">
        <span className=" font-semibold text-content text-xl">User Form</span>

        <IconButton
          onClick={toggleAddUserModal}
          className=" !text-red-500 hover:!bg-red-100"
        >
          <Close />
        </IconButton>
      </p>
      <form>
        <div className=" grid grid-cols-3 gap-2">
          {/*--------------------- user name-------------------  */}
          <Input
            variant={"outlined"}
            label={"Username"}
            type={"text"}
            value={""}
            onChange={""}
            // required={true}
            placeholder={"Enter Username"}
            size={"small"}
            fullWidth={true}
            customWidth={300}
            error={false}
          />
          {/*--------------------- email address-------------------  */}
          <Input
            variant={"outlined"}
            label={"Email Address"}
            type={"text"}
            value={""}
            onChange={""}
            // required={true}
            placeholder={"Enter Email Address"}
            size={"small"}
            fullWidth={true}
            customWidth={300}
            error={false}
          />

          {/*--------------------- email address-------------------  */}
          <Input
            variant={"outlined"}
            label={"Phone"}
            type={"text"}
            value={""}
            onChange={""}
            // required={true}
            placeholder={"Enter Email Address"}
            size={"small"}
            fullWidth={true}
            customWidth={300}
            error={false}
          />
        </div>
        <div className=" mt-5 flex gap-4 justify-end">
          <CustomButton
            bgColor={"bg-darkSky"}
            hoverColor={"hover:bg-darkSky"}
            width={"fit"}
            textColor={"text-white"}
          >
            Submit
          </CustomButton>
          <CustomButton
            bgColor={"bg-white"}
            hoverColor={"bg-white"}
            width={"fit"}
            textColor={"text-darkSky"}
            border={"border border-darkSky"}
          >
            Cancel
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
