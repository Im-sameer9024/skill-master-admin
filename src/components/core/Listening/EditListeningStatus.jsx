import { useGetListeningById, useUpdateListeningStatusById } from '@/pages/Listening/hooks/useListening';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const EditListeningStatus = ({ id, setShowEditStatusModal }) => {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch current listening data
  const { data: listeningData, isLoading: isLoadingListening } = useGetListeningById(id);

  console.log("listen",listeningData);

  // Update status mutation
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateListeningStatusById();

  // Set initial status when listening data is loaded
  useEffect(() => {
    if (listeningData) {
      setStatus(listeningData.status || "active");
    }
  }, [listeningData]);

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!status) {
      toast.error("Please select a status");
      return;
    }

    if (!id) {
      toast.error("No listening ID provided");
      return;
    }

    setIsSubmitting(true);

    const updateData = {
      status: status,
    };

    updateStatus(
      { id, data: updateData },
      {
        onSuccess: () => {
          setShowEditStatusModal(false);
          toast.success("Listening status updated successfully");
        },
        onError: (error) => {
          console.error("Failed to update status:", error);
          toast.error(error.response?.data?.message || "Failed to update status");
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleClose = () => {
    setShowEditStatusModal(false);
  };

  // Loading state while fetching listening data
  if (isLoadingListening) {
    return (
      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-5 w-5 animate-spin mr-3" />
          <p className="text-gray-600">Loading listening data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Update Listening Status
      </h2>

      {listeningData && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Title:</span>{" "}
            {listeningData?.data?.title}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Current Status:</span>{" "}
            <span className={`capitalize ${listeningData.data?.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              {listeningData.data?.status}
            </span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status *
          </label>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                </div>
              </SelectItem>
              <SelectItem value="inactive">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Inactive
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Choose the current status of the listening category
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isUpdating || isSubmitting}
            className="min-w-[100px] border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!status || isUpdating || isSubmitting}
            className="min-w-[100px] bg-darkSky hover:bg-darkSky/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isUpdating || isSubmitting) ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
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
}

export default EditListeningStatus;