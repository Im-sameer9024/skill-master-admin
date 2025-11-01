import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import {
  useNotificationById,
  useUpdateNotification,
} from "@/pages/Notification/hooks/useNotification";
import { notificationFormSchema } from "@/validation/NotificationSchemas";
import { toast } from "sonner";

const EditNotification = ({ id, setShowEditNotification }) => {
  //------------- api for data ---------
  const { data: SingleNotification, isLoading: SingleNotificationLoading } =
    useNotificationById(id);

  const {
    mutate: updateNotification,
    isPending: isUpdating,
    error: apiError,
  } = useUpdateNotification();

  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(notificationFormSchema),
  });

  const imageFile = watch("image");

  // Set form values when data is loaded
  useEffect(() => {
    if (SingleNotification?.data) {
      const notification = SingleNotification.data;
      setValue("title", notification.title);
      setValue("message", notification.message);
      setValue("status", notification.status);

      // Set image preview if image exists
      if (notification.image) {
        const { VITE_CLIENT_IMAGE_URL } = import.meta.env;
        setImagePreview(`${VITE_CLIENT_IMAGE_URL}/${notification.image}`);
      }
    }
  }, [SingleNotification, setValue]);

  // Handle image preview
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  }, [imageFile]);

  // Remove image preview
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", null);
  };

  // Form submission
  const onSubmit = (data) => {
    if (!id) {
      toast.error("No notification ID provided");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("message", data.message);
    formData.append("status", data.status);

    // Only append image if a new one was selected
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    updateNotification(
      { id: id, data: formData },
      {
        onSuccess: () => {
          setShowEditNotification(false);
          toast.success("Notification updated successfully!");
        },
        onError: (error) => {
          console.error("Error updating notification:", error);
          toast.error(
            error.response?.data?.message || "Failed to update notification"
          );
        },
      }
    );
  };

  const handleCancel = () => {
    setShowEditNotification(false);
    reset();
  };

  // Loading state
  if (SingleNotificationLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Loading notification...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/*------------------ Header----------------- */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Notification
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Update notification details
          </p>
        </div>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
          disabled={isUpdating}
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      {/*-------------- API Error Message--------------- */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="shrink-0">
              <IoClose className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error updating notification
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {apiError.response?.data?.message ||
                  "Failed to update notification"}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title and Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Notification Title *
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter notification title..."
              className={`w-full ${
                errors.title ? "border-red-500 focus:ring-red-500" : ""
              }`}
              disabled={isUpdating}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <IoClose className="h-3 w-3" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <Label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Status *
            </Label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              disabled={isUpdating}
              defaultValue={SingleNotification?.data?.status}
            >
              <SelectTrigger
                className={`w-full ${
                  errors.status ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Notification Status</SelectLabel>
                  <SelectItem value="active" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Inactive
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <IoClose className="h-3 w-3" />
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label
            htmlFor="message"
            className="text-sm font-medium text-gray-700"
          >
            Message *
          </Label>
          <Textarea
            id="message"
            placeholder="Write your notification message here..."
            className={`min-h-[120px] resize-none ${
              errors.message ? "border-red-500 focus:ring-red-500" : ""
            }`}
            disabled={isUpdating}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <IoClose className="h-3 w-3" />
              {errors.message.message}
            </p>
          )}
          <p className="text-xs text-gray-500">
            This message will be displayed to users in the notification.
          </p>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Notification Image
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUpdating}
                {...register("image")}
              />
              <Label htmlFor="image" className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaImage className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {imagePreview ? "Change image" : "Click to upload image"}
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </div>
              </Label>
            </div>
            {errors.image && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <IoClose className="h-3 w-3" />
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Image Preview
              </Label>
              <div className="relative inline-block group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-48 w-48 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"
                  onClick={handleRemoveImage}
                  disabled={isUpdating}
                >
                  <IoClose className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isUpdating}
            className="min-w-[100px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isUpdating}
            className="min-w-[100px] bg-darkSky hover:bg-darkSky/90 text-white transition-colors"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Notification"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditNotification;
