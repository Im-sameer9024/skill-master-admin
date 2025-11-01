import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNotification } from "@/pages/Notification/hooks/useNotification";
import { notificationFormSchema } from "@/validation/NotificationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateNotificationForm = ({ setShowCreateNotification }) => {
  //--------- api for create notification ------------
  const {
    mutate: createNotification,
    isPending: isSubmitting,
    error: apiError,
  } = useCreateNotification();

  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      status: "",
      title: "",
      message: "",
      image: null,
    },
  });

  const imageFile = watch("image");

  //--------- Handle image preview----------
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  //-------------remove image preview----------------
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", null);
    trigger("image");
  };

  const onSubmit = (data) => {
    // console.log("data notification", data);
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("message", data.message);
      formData.append("status", data.status);
      formData.append("image", data.image[0]);

      //-----------call create notification api mutation------------
      createNotification(formData, {
        onSuccess: () => {
          // console.log("Notification created successfully", data);
          reset();
          setShowCreateNotification(false);
          toast.success("Notification created successfully");
        },
        onError: (error) => {
          console.error("Error creating notification:", error);
          toast.error(error.response?.data?.message ||"Error creating notification");
        },
      });
    } catch (error) {
      console.log("Error occur in submitting the notification", error);
    }
  };

  const handleCancel = () => {
    reset();
    setShowCreateNotification(false);
  };

  return (
    <div className="font-fontContent p-6  overflow-y-auto">
      {/*------------------ Header----------------- */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Notification
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Send notifications to your users
          </p>
        </div>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
          disabled={isSubmitting}
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
                Error creating notification
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {apiError.response?.data?.message ||
                  "Failed to create notification"}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            disabled={isSubmitting}
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
                disabled={isSubmitting}
                {...register("image")}
              />
              <Label htmlFor="image" className="cursor-pointer block">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaImage className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Click to upload image
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
                  disabled={isSubmitting}
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
            disabled={isSubmitting}
            className="min-w-[100px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px] bg-darkSky hover:bg-darkSky/90 text-white transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Create Notification"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotificationForm;
