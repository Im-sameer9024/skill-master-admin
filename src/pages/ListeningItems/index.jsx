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
import Popup from "@/components/common/Popup";

// Import your Listening components (you'll need to create these)
import CreateListeningForm from "@/components/core/Listening/CreateListeningForm";
import DeleteListening from "@/components/core/Listening/DeleteListening";
import EditListening from "@/components/core/Listening/EditListening";
import { Link, useParams } from "react-router-dom";
import EditListeningStatus from "@/components/core/Listening/EditListeningStatus";
import { useGetListeningItemsById } from "./hooks/useListeningItem";
import { ListeningItemColumnsData } from "./Data";
import CreateListeningItemForm from "@/components/core/ListeningItems/CreateListeningItemForm";
import EditListeningItemStatus from "@/components/core/ListeningItems/EditListeningItemStatus";
import DeleteListeningItem from "@/components/core/ListeningItems/DeleteListeningItem";
import EditListeningItem from "@/components/core/ListeningItems/EditListeningItem";
import SingleListeningItem from "@/components/core/ListeningItems/SingleListeningItem";

const ListeningItemPage = () => {
  const { id } = useParams();

  // console.log("id", id);

  const [showCreateListeningItem, setShowCreateListeningItem] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditListeningItem, setShowEditListeningItem] = useState(false);
  const [listeningItemId, setListeningItemId] = useState(null);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [showSingleListeningItem, setShowSingleListeningItem] = useState(false);

  const {
    data: ListeningItemsData,
    isLoading,
    error,
  } = useGetListeningItemsById(id);

  // console.log("ListeningItemsData", ListeningItemsData);

  const openEditStatusModal = (id) => {
    setShowEditStatusModal(true);
    setListeningItemId(id);
  };

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setListeningItemId(id);
  };

  const openEditModal = (id) => {
    setShowEditListeningItem(true);
    setListeningItemId(id);
  };

  const openSingleListeningItem = (id) => {
    setShowSingleListeningItem(true);
    setListeningItemId(id);
  };

  // Render row function with proper data mapping for Listening
  const renderRow = (listeningItem, index) => (
    <tr key={listeningItem._id || index}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        <Link
          className=" hover:underline underline-offset-2"
          to={`/listening/item/question/${listeningItem._id}`}
        >
          {listeningItem.title}
        </Link>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {listeningItem.listeningQuestions?.length}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {listeningItem.totalTime} Min
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            listeningItem.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {listeningItem.status}
        </span>
        {/* Edit */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => openEditStatusModal(listeningItem._id)}
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
      </td>

      {/*------------------ actions buttons -------------- */}
      <td>
        <div className="flex items-center gap-1">
          {/* See Details */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openSingleListeningItem(listeningItem._id)}
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
                onClick={() => openEditModal(listeningItem._id)}
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
                onClick={() => openDeleteModal(listeningItem._id)}
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

  //------------ Loading state ----------------------
  if (isLoading) {
    return (
      <div className="flex justify-center items-center ">
        <Spinner />
      </div>
    );
  }

  //--------------- Error state----------------------
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-4xl mx-auto">
        <p className="text-red-800 font-semibold mb-2">
          Error loading listening categories
        </p>
        <p className="text-red-600 text-sm mb-4">
          {error.response?.data?.message ||
            error.message ||
            "Failed to load listening categories"}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Listening Items Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Total Items : {ListeningItemsData?.data?.length || 0}
          </p>
        </div>
        <Button
          onClick={() => setShowCreateListeningItem(true)}
          className="bg-darkSky/90 hover:bg-darkSky text-white cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add New Listening Item
        </Button>
      </div>

      {/*----------- popup for Single listening Item----------  */}
      <Popup
        openModal={showSingleListeningItem}
        content={
          <SingleListeningItem
            id={listeningItemId}
            setShowSingleListeningItem={setShowSingleListeningItem}
          />
        }
        width={"w-[70%]"}
      />

      {/*----------- popup for listening Item create----------  */}
      <Popup
        openModal={showCreateListeningItem}
        content={
          <CreateListeningItemForm
            setShowCreateListeningItem={setShowCreateListeningItem}
          />
        }
        width={"w-[70%]"}
      />

      {/*----------- popup for notification status update----------  */}
      <Popup
        openModal={showEditStatusModal}
        content={
          <EditListeningItemStatus
            id={listeningItemId}
            setShowEditStatusModal={setShowEditStatusModal}
          />
        }
        width={"w-[40%]"}
      />

      {/*----------- popup for listening listening delete----------  */}
      <Popup
        openModal={showDeleteModal}
        content={
          <DeleteListeningItem
            id={listeningItemId}
            setShowDeleteModal={setShowDeleteModal}
          />
        }
        width={"w-[40%]"}
      />

      {/*----------- popup for listening listening edit----------  */}
      <Popup
        openModal={showEditListeningItem}
        content={
          <EditListeningItem
            id={listeningItemId}
            setShowEditListeningItem={setShowEditListeningItem}
          />
        }
        width={"w-[70%]"}
      />

      {ListeningItemsData?.data?.length > 0 ? (
        <TableComponent
          columns={ListeningItemColumnsData}
          data={ListeningItemsData.data}
          renderRow={renderRow}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">🎵</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Listening Categories Found
            </h3>
            <p className="text-gray-500 mb-4">
              There are no listening categories available yet. Create your first
              listening to get started.
            </p>
            <Button
              onClick={() => setShowCreateListeningItem(true)}
              className="bg-darkSky/90 hover:bg-darkSky text-white"
            >
              <FaPlus className="mr-2" />
              Create First listening
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeningItemPage;
