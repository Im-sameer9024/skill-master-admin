import { Button, IconButton } from "@mui/material";
import TableComponent from "../../components/common/TableComponent";
import { userData } from "./Data";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Edit, FilterList, Visibility } from "@mui/icons-material";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import AddUserForm from "../../components/core/User/AddUserForm";

//-------------------- data and row of the user ----------------
const userColumns = ["ID", "NAME", "EMAIL", "PHONE", "ACTIONS"];
const renderRow = (row, index) => (
  <tr
    key={index}
    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      index === row.length - 1 ? "border-b-0" : ""
    }`}
  >
    <td className="py-4 text-sm text-black font-medium">{row.id}</td>
    <td className="py-4  text-sm text-smallHeading font-bold ">{row.name}</td>
    <td className="py-4  text-sm text-smallHeading">{row.email}</td>
    <td className="py-4 text-sm text-smallHeading  ">{row.phone}</td>
    <td className="py-4 text-sm text-smallHeading  ">
      <div>
        <IconButton className=" !text-darkYellow hover:!bg-yellow-100">
          <Visibility />
        </IconButton>
        <IconButton className=" !text-darkRed hover:!bg-red-100">
          <DeleteIcon />
        </IconButton>
        <IconButton className=" !text-darkBlue hover:!bg-blue-100">
          <Edit />
        </IconButton>
      </div>
    </td>
  </tr>
);

const UserPage = () => {

  const [openAddUserModal, setOpenAddUserModal] = useState(false);


  const toggleAddUserModal = () => {
    setOpenAddUserModal(!openAddUserModal);
  }




  return (
    <div className=" p-4 w-full h-full">
      {/*------------------- Header ---------------- */}
      <div className=" flex  items-center justify-between px-4 my-6">
        <h3 className=" font-semibold text-content text-lg">All Users</h3>
        <div className=" flex gap-4 items-center relative">
          <IconButton onClick={() => setOpenAddUserModal(true)} className=" !text-darkBlue !bg-mostLightBlue hover:!bg-mostLightBlue">
            <Add />
          </IconButton>
          <Modal openModel={openAddUserModal} content={<AddUserForm toggleAddUserModal={toggleAddUserModal}/>} width={"w-[70%]"} />
          {/* <IconButton className=" !text-blue-500 !bg-blue-100 hover:!bg-blue-200">
            <FilterList />
          </IconButton> */}
          
        </div>
      </div>

      <TableComponent
        column={userColumns}
        renderRow={renderRow}
        data={userData}
      />
    </div>
  );
};

export default UserPage;
