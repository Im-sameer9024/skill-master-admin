import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { useDeleteNotification } from "@/pages/Notification/hooks/useNotification";
import { toast } from 'sonner';

const DeleteNotification = ({ id, setShowDeleteModal }) => {


  const { mutate: deleteNotification, isPending: isDeleting } = useDeleteNotification();

  const handleDelete = () => {
    if (!id) {
      console.error("No notification ID provided for deletion");
      toast.error("No notification ID provided");
      return;
    }

    deleteNotification(id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        // You can add a toast notification here
        toast.success("Notification deleted successfully!");
      },
      onError: (error) => {
        console.error("Error deleting notification:", error);
        // You can add a toast notification here
        toast.error(error.response?.data?.message || "Failed to delete notification");
      }
    });
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="font-fontContent p-6 flex flex-col justify-center items-center text-center">
      {/* Warning Icon */}
      <div className="mb-4 p-3 bg-red-50 rounded-full">
        <AlertTriangle className="h-12 w-12 text-red-600" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Delete Notification
      </h2>
      
      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-md">
        Are you sure you want to delete this notification? This action cannot be undone and all associated data will be permanently removed.
      </p>

      

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 w-full">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isDeleting}
          className="min-w-[100px] hover:cursor-pointer border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={ handleDelete}
          disabled={isDeleting}
          className="min-w-[100px] bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer"
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </div>

     
    </div>
  );
};

export default DeleteNotification;