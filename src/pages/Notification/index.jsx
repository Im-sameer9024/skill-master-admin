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
import { NotificationColumnsData, NotificationData } from "./Data";
import CreateNotificationForm from "@/components/core/Notification/CreateNotificationForm";
import DeleteNotification from "@/components/core/Notification/DeleteNotification";
import EditNotification from "@/components/core/Notification/EditNotification";
import SingleNotificationDetails from "@/components/core/Notification/SingleNotificationDetails";
import EditNotificationStatus from "@/components/core/Notification/EditNotificationStatus";
import { useNotificationData } from "./hooks/useNotification";

const NotificationPage = () => {
  const [showCreateNotification, setShowCreateNotification] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditNotification, setShowEditNotification] = useState(false);
  const [showSingleNotification, setShowSingleNotification] = useState(false);
  const [notificationId, setNotificationId] = useState(null);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);

  const { data: NotificationData, isLoading, error } = useNotificationData();


  const openEditStatusModal = (id) => {
    setShowEditStatusModal(true);
    setNotificationId(id);
  };

  const openSingleNotification = (id) => {
    setShowSingleNotification(true);
    setNotificationId(id);
  };

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setNotificationId(id);
  };

  const openEditModal = (id) => {
    setShowEditNotification(true);
    setNotificationId(id);
  };

  // Safe date formatting function
  const formatDateSafe = (dateString, formatString = "MMM dd, yyyy") => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isValid(date) ? format(date, formatString) : "Invalid Date";
  };

  // Render row function with proper data mapping
  const renderRow = (notification, index) => (
    <tr key={notification.id || index}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {notification.title}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
        {notification.message}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            notification.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.status}
        </span>
        {/*------------- Edit status ------------- */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => openEditStatusModal(notification._id)}
              variant="ghost"
              size="icon-sm"
              className="hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <CiEdit className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Status</p>
          </TooltipContent>
        </Tooltip>
      </td>

      {/* --------------------------create date-------------------------- */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDateSafe(notification.createdAt, "MMM dd, yyyy")}
      </td>

      {/*------------------ actions buttons -------------- */}
      <td>
        <div className="flex items-center gap-1">
          {/* See Details */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openSingleNotification(notification._id)}
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
                onClick={() => openEditModal(notification._id)}
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
                onClick={() => openDeleteModal(notification._id)}
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
      <div className="mt-6 flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  //--------------- Error state----------------------
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-4xl mx-auto">
        <p className="text-red-800 font-semibold mb-2">
          Error loading notifications
        </p>
        <p className="text-red-600 text-sm mb-4">
          {error.response?.data?.message ||
            error.message ||
            "Failed to load notifications"}
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
            Notifications Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Total Notifications: {NotificationData?.data?.length}
          </p>
        </div>
        <Button
          onClick={() => setShowCreateNotification(true)}
          className="bg-darkSky/90 hover:bg-darkSky text-white cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add New Notification
        </Button>
      </div>

      {/*----------- popup for notification create----------  */}
      <Popup
        openModal={showCreateNotification}
        content={
          <CreateNotificationForm
            setShowCreateNotification={setShowCreateNotification}
          />
        }
        width={"w-[70%]"}
      />

      {/*----------- popup for notification status update----------  */}
      <Popup
        openModal={showEditStatusModal}
        content={
          <EditNotificationStatus
            id={notificationId}
            setShowEditStatusModal={setShowEditStatusModal}
          />
        }
        width={"w-[40%]"}
      />

      {/*----------- popup for notification delete----------  */}
      <Popup
        openModal={showDeleteModal}
        content={
          <DeleteNotification
            id={notificationId}
            setShowDeleteModal={setShowDeleteModal}
          />
        }
        width={"w-[40%]"}
      />

      {/*----------- popup for notification edit----------  */}
      <Popup
        openModal={showEditNotification}
        content={
          <EditNotification
            id={notificationId}
            setShowEditNotification={setShowEditNotification}
          />
        }
        width={"w-[70%]"}
      />

      {/*------------- popup for show the single notification in details ------------ */}
      <Popup
        openModal={showSingleNotification}
        content={
          <SingleNotificationDetails
            id={notificationId}
            setShowSingleNotification={setShowSingleNotification}
          />
        }
        width={"w-[70%]"}
      />

      {NotificationData?.data?.length > 0 ? (
        <TableComponent
          columns={NotificationColumnsData}
          data={NotificationData.data}
          renderRow={renderRow}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Notifications Found
            </h3>
            <p className="text-gray-500 mb-4">
              There are no notifications available yet. Create your first
              notification to get started.
            </p>
            <Button
              onClick={() => setShowCreateNotification(true)}
              className="bg-darkSky/90 hover:bg-darkSky text-white"
            >
              <FaPlus className="mr-2" />
              Create First Notification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
