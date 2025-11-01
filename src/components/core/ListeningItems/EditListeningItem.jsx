/* eslint-disable react-hooks/exhaustive-deps */
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
  SelectValue 
} from "@/components/ui/select";
import { useGetSingleListeningItemById, useUpdateListeningItemById } from '@/pages/ListeningItems/hooks/useListeningItem';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { Loader2, AlertCircle, Play, X } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateListeningItemSchema } from "@/validation/ListeningSchemas";

const EditListeningItemForm = ({ id, setShowEditListeningItem }) => {
  const { listening_id } = useParams();
  const [filePreview, setFilePreview] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState("");
  const [currentFileType, setCurrentFileType] = useState("");

  //---------------- api for data -----------------
  const { data: SingleListeningItem, isLoading: SingleListeningItemLoading } = useGetSingleListeningItemById(id);

  // console.log("single item", SingleListeningItem);
  
  const {
    mutate: updateListeningItem,
    isPending: isUpdating,
    error: apiError
  } = useUpdateListeningItemById();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateListeningItemSchema),
    defaultValues: {
      title: "",
      fileType: "",
      file: null,
      totalTime: "",
      status: ""
    },
  });

  // Watch form values
  const selectedFileType = watch("fileType");
  const selectedStatus = watch("status");
  const selectedFile = watch("file");

  // Handle file preview
  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      const file = selectedFile[0];
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
      
      if (file.type.startsWith('audio/')) {
        setFilePreview({ type: 'audio', url });
      } else if (file.type.startsWith('video/')) {
        setFilePreview({ type: 'video', url });
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
        setFilePreviewUrl("");
      }
    }

    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [selectedFile]);

  // Populate form with existing data when SingleListeningItem is available
  useEffect(() => {
    if (SingleListeningItem) {
      const itemData = SingleListeningItem.data || SingleListeningItem;
      
      
      setCurrentFileType(itemData.fileType);

      reset({
        title: itemData.title || "",
        fileType: itemData.fileType,
        totalTime: itemData.totalTime?.toString() || "",
        status: itemData.status || "active",
      });
    }
  }, [SingleListeningItem, reset]);

  // Handle file type change
  const handleFileTypeChange = (value) => {
    setValue("fileType", value);
    // Clear file when file type changes
    setValue("file", null);
    setFilePreview(null);
    clearErrors("file");
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type matches selected fileType
      if (selectedFileType === "audio" && !file.type.startsWith('audio/')) {
        setError("file", {
          type: "manual",
          message: "Please select an audio file"
        });
        return;
      }
      
      if (selectedFileType === "video" && !file.type.startsWith('video/')) {
        setError("file", {
          type: "manual",
          message: "Please select a video file"
        });
        return;
      }
      
      clearErrors("file");
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("fileType", data.fileType);
    
    // Only append file if a new file is selected
    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }
    
    formData.append("totalTime", data.totalTime);
    formData.append("status", data.status);
    formData.append("listening_id", listening_id);

    console.log("Update data:", data);

    updateListeningItem(
      { id, data: formData },
      {
        onSuccess: () => {
          toast.success("Listening item updated successfully!");
          setShowEditListeningItem(false);
          reset();
          // Clean up preview URL
          if (filePreviewUrl) {
            URL.revokeObjectURL(filePreviewUrl);
          }
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || "Failed to update listening item"
          );
        },
      }
    );
  };

  const handleCancel = () => {
    setShowEditListeningItem(false);
    reset();
    // Clean up preview URL
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
  };

  const removeFilePreview = () => {
    setValue("file", null);
    setFilePreview(null);
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl("");
    }
    clearErrors("file");
  };

  // Get accepted file types based on selected fileType
  const getAcceptedFileTypes = () => {
    if (selectedFileType === "audio") {
      return "audio/*";
    } else if (selectedFileType === "video") {
      return "video/*";
    }
    return "*/*";
  };

  // Get file size limit message
  const getFileSizeMessage = () => {
    return selectedFileType === "video" 
      ? "Supported formats: MP4, AVI, MOV. Max file size: 100MB"
      : "Supported formats: MP3, WAV, AAC. Max file size: 100MB";
  };

  // Show loading state while fetching data
  if (SingleListeningItemLoading) {
    return (
      <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>Loading listening item data...</p>
        </div>
      </div>
    );
  }

  // Get current listening item data
  const currentItem = SingleListeningItem?.data || SingleListeningItem;

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/*------------------ Header----------------- */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Listening Item
          </h2>
          <p className="text-sm text-gray-600 mt-1">Update listening item details</p>
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

      {/*------------ Current Listening Item Section ------------ */}
      {currentItem && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            Current Listening Item Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-gray-700">Title:</span>
                <p className="text-gray-900 font-semibold mt-1">
                  {currentItem.title || "No title"}
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-gray-700">File Type:</span>
                <p className="text-gray-900 font-semibold mt-1 capitalize">
                  {currentFileType || "Unknown"}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-gray-700">Total Time:</span>
                <p className="text-gray-900 font-semibold mt-1">
                  {currentItem.totalTime || "N/A"} minutes
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      currentItem.status === "active" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></div>
                  <span
                    className={`font-semibold capitalize ${
                      currentItem.status === "active"
                        ? "text-green-700"
                        : "text-gray-700"
                    }`}
                  >
                    {currentItem.status || "inactive"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {currentItem.audioFile && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Current File:</span>
                <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded border">
                  {currentItem.audioFile}
                </span>
              </div>
            </div>
          )}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              These are the current values. Use the form below to make changes.
            </p>
          </div>
        </div>
      )}

      {/*-------------- API Error Message--------------- */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error updating listening item
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {apiError.response?.data?.message ||
                  "Failed to update listening item"}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title and Total Time Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/*----------------- Title Field----------------- */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Item Title *
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter item title..."
              className={`w-full ${
                errors.title ? "border-red-500 focus:ring-red-500" : ""
              }`}
              disabled={isUpdating}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/*----------------- Total Time Field--------------- */}
          <div className="space-y-2">
            <Label
              htmlFor="totalTime"
              className="text-sm font-medium text-gray-700"
            >
              Total Time (minutes) *
            </Label>
            <Input
              id="totalTime"
              type="number"
              placeholder="30, 15, 45 etc"
              min="1"
              max="120"
              className={`w-full ${
                errors.totalTime ? "border-red-500 focus:ring-red-500" : ""
              }`}
              disabled={isUpdating}
              {...register("totalTime")}
            />
            {errors.totalTime && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.totalTime.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Enter time in minutes (1-120)
            </p>
          </div>
        </div>

        {/* File Type and Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/*---------------------- File type ------------------- */}
          <div className="space-y-2">
            <Label
              htmlFor="fileType"
              className="text-sm font-medium text-gray-700"
            >
              File Type *
            </Label>
            <Select
              onValueChange={handleFileTypeChange}
              disabled={isUpdating}
              value={selectedFileType}
            >
              <SelectTrigger
                className={`w-full ${
                  errors.fileType ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>File Type</SelectLabel>
                  <SelectItem value="audio" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Audio
                    </div>
                  </SelectItem>
                  <SelectItem value="video" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Video
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.fileType && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.fileType.message}
              </p>
            )}
          </div>

          {/*---------------------- Status ------------------- */}
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
              value={selectedStatus}
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
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="active" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Inactive
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="file"
              className="text-sm font-medium text-gray-700"
            >
              {selectedFileType ? `New ${selectedFileType.charAt(0).toUpperCase() + selectedFileType.slice(1)} File` : "New File"}
            </Label>
            <Input
              id="file"
              type="file"
              accept={getAcceptedFileTypes()}
              className={`w-full ${
                errors.file ? "border-red-500 focus:ring-red-500" : ""
              }`}
              disabled={isUpdating || !selectedFileType}
              {...register("file", {
                onChange: handleFileChange
              })}
            />
            {errors.file && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.file.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              {getFileSizeMessage()}
              {currentItem?.audioFile && (
                <span className="block mt-1 text-amber-600">
                  Leave empty to keep the current file: {currentItem.audioFile}
                </span>
              )}
            </p>
            {!selectedFileType && (
              <p className="text-xs text-amber-600 mt-1">
                Please select a file type first
              </p>
            )}
          </div>

          {/* File Preview */}
          {filePreview && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium text-gray-700">
                  New File Preview
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeFilePreview}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {filePreview.type === 'audio' && (
                <div className="flex items-center gap-3 p-3 bg-white rounded border">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Play className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedFile?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Audio file • {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <audio controls className="h-8">
                    <source src={filePreview.url} type={selectedFile?.type} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              
              {filePreview.type === 'video' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-white rounded border mb-2">
                    <div className="p-2 bg-red-100 rounded-full">
                      <Play className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {selectedFile?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Video file • {(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <video 
                    controls 
                    className="w-full rounded border max-h-48"
                    poster="/video-thumbnail-placeholder.png"
                  >
                    <source src={filePreview.url} type={selectedFile?.type} />
                    Your browser does not support the video element.
                  </video>
                </div>
              )}
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
              "Update Item"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditListeningItemForm;