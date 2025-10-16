import { IconButton } from "@mui/material";
import { BlogsData } from "./Data";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import TableComponent from "../../components/common/TableComponent";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import AddBlogForm from "../../components/core/Blog/AddBlogForm";

//-------------------- data and row of the user ----------------
const blogColumns = ["ID", "TITLE", "DATE", "STATUS", "ACTIONS"];
const renderRow = (row, index) => (
  <tr
    key={index}
    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      index === row.length - 1 ? "border-b-0" : ""
    }`}
  >
    <td className="py-4 text-sm text-black font-medium">{row.id}</td>
    <td className="py-4  text-sm text-smallHeading font-bold ">{row.title}</td>
    <td className="py-4  text-sm text-smallHeading">{row.date}</td>
    <td className="py-4 text-sm text-smallHeading  ">{row.status}</td>
    <td className="py-4 text-sm text-smallHeading  ">
      <div>
        <IconButton className=" !text-darkYellow hover:!bg-yellow-100">
          <Visibility />
        </IconButton>
        <IconButton className=" !text-red-500 hover:!bg-red-100">
          <DeleteIcon />
        </IconButton>
        <IconButton className=" !text-blue-500 hover:!bg-blue-100">
          <Edit />
        </IconButton>
      </div>
    </td>
  </tr>
);

const BlogPage = () => {

    const [openAddBlogModal, setOpenAddBlogModal] = useState(false);
  
  
    const toggleAddBlogModal = () => {
      setOpenAddBlogModal(!openAddBlogModal);
    }

  return (
    <div className=" p-4 w-full h-full">
      {/*------------------- Header ---------------- */}
      <div className=" flex  items-center justify-between px-4 my-6">
        <h3 className=" font-semibold text-content text-lg">All Blogs</h3>
        <div className=" flex gap-4 items-center relative">
          <IconButton className=" !text-blue-500 !bg-blue-100 hover:!bg-blue-200">
            <Add />
          </IconButton>
          <Modal openModel={openAddBlogModal} content={<AddBlogForm toggleAddBlogModal={toggleAddBlogModal}/>} width={"w-[70%]"} />
          {/* <IconButton className=" !text-blue-500 !bg-blue-100 hover:!bg-blue-200">
            <FilterList />
          </IconButton> */}
        </div>
      </div>

      <TableComponent
        column={blogColumns}
        renderRow={renderRow}
        data={BlogsData}
      />
    </div>
  );
};

export default BlogPage;
