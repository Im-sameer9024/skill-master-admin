import React, { useEffect, useState } from 'react';
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
import { IoClose } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useUpdateBlog } from "@/pages/Blogs/hooks/useBlogs";
import { useGetSingleBlog } from "@/pages/Blogs/hooks/useBlogs";
import { blogFormSchema } from "@/validation/BlogSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';

const { VITE_CLIENT_IMAGE_URL } = import.meta.env;

const EditBlogForm = ({ id, setShowEditBlog }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

   const data = {
    blog_id: id,
  };

  // Fetch existing blog data
  const { data: blogData, isLoading: isLoadingBlog } = useGetSingleBlog(data);
  const { mutate: updateBlog, isPending: isSubmitting, error: apiError } = useUpdateBlog();

  const blog = blogData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
    },
  });

  // Watch image file for preview
  const imageFile = watch("image");

  // Pre-fill form with existing blog data
  useEffect(() => {
    if (blog) {
      setValue("title", blog.title);
      setValue("description", blog.description);
      setValue("status", blog.status);
      
      // Set image preview if image exists
      if (blog.image) {
        setImagePreview(`${VITE_CLIENT_IMAGE_URL}/${blog.image}`);
      }
    }
  }, [blog, setValue]);

  // Handle image preview
  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
          setIsImageChanged(true);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [imageFile]);

  // Remove image preview
  const handleRemoveImage = () => {
    setImagePreview(null);
    setValue("image", null);
    setIsImageChanged(true);
    trigger("image");
  };

  // Cancel form
  const handleCancel = () => {
    setShowEditBlog(false);
  };

  // Form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Append required fields
    formData.append("blog_id", id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("status", data.status);
    
    // Only append image if it's changed
    if (isImageChanged && data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    updateBlog(formData, {
      onSuccess: (response) => {
        console.log("Blog updated successfully:", response);
        
        // Reset form and close modal
        reset();
        setShowEditBlog(false);
        
        // Show success message
        toast.success("Blog updated successfully!");
      },
      onError: (error) => {
        console.error("Error updating blog:", error);
        alert(error.response?.data?.message || "Failed to update blog");
      }
    });
  };

  // Show loading while fetching blog data
  if (isLoadingBlog) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="text-gray-600 text-lg">Loading blog data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Edit Blog</h2>
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

          {/* API Error Message */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">
                Error: {apiError.response?.data?.message || "Failed to update blog"}
              </p>
            </div>
          )}

          {/* Current Blog Info */}
          {blog && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Editing Blog:</h3>
              <p className="text-blue-700 text-sm">
                <strong>Title:</strong> {blog.title} | 
                <strong> Status:</strong> {blog.status} | 
                <strong> Created:</strong> {new Date(blog.createAt).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-3">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Blog Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Write a title..."
                  className={`w-full ${errors.title ? "border-red-500 focus:ring-red-500" : ""}`}
                  disabled={isSubmitting}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-3">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status *
                </Label>
                <Select 
                  onValueChange={(value) => setValue("status", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`w-full ${errors.status ? "border-red-500 focus:ring-red-500" : ""}`}>
                    <SelectValue placeholder="Select a Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="active" className="cursor-pointer">
                        Active
                      </SelectItem>
                      <SelectItem value="inactive" className="cursor-pointer">
                        Inactive
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Blog Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Type description for blog..."
                  className={`min-h-[120px] resize-none ${errors.description ? "border-red-500 focus:ring-red-500" : ""}`}
                  disabled={isSubmitting}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                  Blog Image {!isImageChanged && "(Current image will be kept)"}
                </Label>
                
                {/* File Input */}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className={`w-full ${errors.image ? "border-red-500 focus:ring-red-500" : ""}`}
                  disabled={isSubmitting}
                  {...register("image")}
                />
                {errors.image && (
                  <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>
                )}

                {/* Current Image Preview */}
                {blog?.image && !isImageChanged && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                    <div className="relative inline-block">
                      <img
                        src={`${VITE_CLIENT_IMAGE_URL}/${blog.image}`}
                        alt="Current blog"
                        className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                      />
                    </div>
                  </div>
                )}

                {/* New Image Preview */}
                {imagePreview && isImageChanged && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
                    <div className="relative inline-block">
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-32 w-32 object-cover rounded-lg border-2 border-blue-300 shadow-sm"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={handleRemoveImage}
                          disabled={isSubmitting}
                        >
                          <IoClose className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="min-w-[100px] hover:cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[100px] bg-green-600 hover:bg-green-700 text-white hover:cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  "Update Blog"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogForm;