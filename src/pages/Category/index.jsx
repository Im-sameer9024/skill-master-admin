import TableComponent from "@/components/common/TableComponent";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineVisibility } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import Spinner from "@/components/common/Spinner";
import { format, isValid } from "date-fns";
import Popup from "@/components/common/Popup";
import { categoryColumnsData, categoryData } from "./Data";


// Move renderRow inside component to access proper data structure
const CategoryPage = () => {





  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showSingleCategory, setShowSingleCategory] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const openSingleCategory = (id) => {
    setShowSingleCategory(true);
    setCategoryId(id);
  };

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setCategoryId(id);
  };

  const openEditModal = (id) => {
    setShowEditCategory(true);
    setCategoryId(id);
  };

  // API call


  // Safe date formatting function
  const formatDateSafe = (dateString, formatString = "MMM dd, yyyy") => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isValid(date) ? format(date, formatString) : "Invalid Date";
  };


  // Render row function with proper data mapping
  const renderRow = (category, index) => (
    <tr key={category._id || index}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {category.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
        {category.type}
      </td>
     
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {category.status}₹
      </td>
      <td>
        <div className="flex items-center gap-1">
          {/* See Details */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openSingleCategory(category._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <MdOutlineVisibility className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See Details</p>
            </TooltipContent>
          </Tooltip>

          {/* Edit */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openEditModal(category._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <CiEdit className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>

          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openDeleteModal(category._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full hover:text-destructive text-destructive/80 cursor-pointer"
              >
                <MdOutlineDeleteOutline className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </td>
    </tr>
  );

 

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">category Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Total category: {categoryData.length}
          </p>
        </div>
        <Button
          onClick={() => setShowCreateCategory(true)}
          className="bg-darkSky/90 hover:bg-darkSky text-white cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add New category
        </Button>
      </div>

     

      {categoryData.length > 0 ? (
        <TableComponent
          columns={categoryColumnsData}
          data={categoryData}
          renderRow={renderRow}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No category Found
            </h3>
            <p className="text-gray-500 mb-4">
              There are no category available yet. Create your first category to get
              started.
            </p>
            <Button
              onClick={() => setShowCreateCategory(true)}
              className="bg-darkSky/90 hover:bg-darkSky text-white"
            >
              <FaPlus className="mr-2" />
              Create First category
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
