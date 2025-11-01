import {
  useDeleteListeningItemById,
} from "@/pages/ListeningItems/hooks/useListeningItem";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";

const DeleteListeningItem = ({ id, setShowDeleteModal }) => {
  const { mutate: deleteListeningItemById, isPending: isDeleting } =
    useDeleteListeningItemById();

    console.log("id",id);

  

  const handleDelete = () => {
    if (!id) {
      console.error("No listening item ID provided for deletion");
      toast.error("No listening item ID provided");
      return;
    }

    deleteListeningItemById(id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        toast.success("Listening item deleted successfully!");
      },
      onError: (error) => {
        console.error("Error deleting listening item:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete listening item"
        );
      },
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
        Delete Listening Item
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-6 max-w-md">
        Are you sure you want to delete this listening Item ? This action cannot be undone and all
        associated audio files and data will be permanently removed.
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
          onClick={handleDelete}
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

export default DeleteListeningItem;
