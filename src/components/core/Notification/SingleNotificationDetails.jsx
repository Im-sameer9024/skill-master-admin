import { Button } from "@/components/ui/button";
import { useNotificationById } from "@/pages/Notification/hooks/useNotification";
import { Loader2 } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { format, isValid } from "date-fns";
import React from "react";

const { VITE_CLIENT_IMAGE_URL } = import.meta.env;

const SingleNotificationDetails = ({ id, setShowSingleNotification }) => {
  const {
    data: SingleNotification,
    isLoading,
    error,
  } = useNotificationById(id);

  const imageUrl = `${VITE_CLIENT_IMAGE_URL}/${SingleNotification?.data?.image}`;


  // Safe date formatting function
  const formatDateSafe = (
    dateString,
    formatString = "MMM dd, yyyy 'at' hh:mm a"
  ) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isValid(date) ? format(date, formatString) : "Invalid Date";
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${
          statusStyles[status] || statusStyles.inactive
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  // Cancel form
  const handleCancel = () => {
    setShowSingleNotification(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-semibold mb-2">
              Error Loading Notification
            </h3>
            <p className="text-red-600 text-sm mb-4">
              {error.response?.data?.message ||
                "Failed to load notification details"}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {SingleNotification?.data?.title}
            </h2>
            {getStatusBadge(SingleNotification?.data?.status)}
          </div>
        </div>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          type="button"
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1  gap-6">
        {/* Main Content */}
        <div className=" space-y-6">
          {/* Message Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Message
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {SingleNotification?.data?.message}
              </p>
            </div>
          </div>

          {/* Image Section */}
          {SingleNotification?.data?.image && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Attached Image
              </h3>
              <div className="flex justify-center">
                <img
                  src={imageUrl}
                  alt="Notification attachment"
                  className="max-w-full h-auto max-h-80 rounded-lg border border-gray-200 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <div className="hidden text-center p-8 border border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 text-sm">Image failed to load</p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Timeline
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Created
                </p>
                <p className="text-sm text-gray-900">
                  {formatDateSafe(SingleNotification?.data?.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Last Updated
                </p>
                <p className="text-sm text-gray-900">
                  {formatDateSafe(SingleNotification?.data?.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNotificationDetails;
