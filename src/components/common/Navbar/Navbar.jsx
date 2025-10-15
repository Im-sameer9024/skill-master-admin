import React from "react";
import Input from "../../ui/Input";
import { Avatar } from "@mui/material";
const Navbar = () => {
  return (
    <div className=" bg-gray-100 py-4 px-10 w-full flex justify-between items-center">
      {/*------------- searching bar -------------- */}
      <div>
        <Input
          label={"Search..."}
          type={"input"}
          variant={"outlined"}
          size={"small"}
          customWidth={"350px"}
          fullWidth={false}
        />
      </div>

      {/* avatar section  */}
      <div className=" hover:cursor-pointer">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
    </div>
  );
};

export default Navbar;
