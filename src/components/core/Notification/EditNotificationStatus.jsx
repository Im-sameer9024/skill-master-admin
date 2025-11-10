import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/common/Spinner";
import {
  useNotificationById,
  useUpdateStatusNotification,
} from "@/pages/Notification/hooks/useNotification";
import { toast } from "sonner";

const EditNotificationStatus = ({ id, setShowEditStatusModal }) => {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateData = {
    status: status,
  };

  // Fetch current notification data
  const { data: notificationData, isLoading: isLoadingNotification } =
    useNotificationById(id);

  // Update status mutation
  const { mutate: updateStatus, isLoading: isUpdating } =
    useUpdateStatusNotification(id, updateData);

  // Set initial status when notification data is loaded
  useEffect(() => {
    if (notificationData?.data) {
      setStatus(notificationData.data.status || "active");
    }
  }, [notificationData]);

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      alert("Please select a status");
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        status: status,
      };

      updateStatus(updateData, {
        onSuccess: () => {
          setShowEditStatusModal(false);
          // You can add a toast notification here for success
          toast.success("Status updated successfully");
        },
        onError: (error) => {
          console.error("Failed to update status:", error);
          // You can add a toast notification here for error
          alert(error.response?.data?.message || "Failed to update status");
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      console.error("Error updating status:", error);
      setIsSubmitting(false);
      alert("An error occurred while updating status");
    }
  };

  const handleClose = () => {
    setShowEditStatusModal(false);
  };

  // Loading state while fetching notification data
  if (isLoadingNotification) {
    return (
      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-center items-center py-8">
          <Spinner />
          <p className="ml-3 text-gray-600">Loading notification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Update Notification Status
      </h2>

      {notificationData?.data && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Title: </span>
            {notificationData.data.title}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Status: </span>
            
            {notificationData.data.status}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Choose the current status of the notification
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isUpdating || isSubmitting}
            className="border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!status || isUpdating || isSubmitting}
            className="bg-darkSky/90 hover:bg-darkSky text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating || isSubmitting ? (
              <>
                <Spinner className="mr-2" />
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditNotificationStatus;
