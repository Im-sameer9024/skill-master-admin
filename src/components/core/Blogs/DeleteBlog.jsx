import { Button } from "@/components/ui/button";
import { useDeleteBlog } from "@/pages/Blogs/hooks/useBlogs";
import React from "react";
import { toast } from "sonner";

const DeleteBlog = ({ id, setShowDeleteModal }) => {
  const data = {
    blog_id: id,
  };

  const {
    mutate: deleteBlog,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteBlog();

  const handleDelete = async (data) => {
    deleteBlog(data, {
      onSuccess: () => {
        setShowDeleteModal(false);
        toast.success("Blog deleted successfully!");
      },
      onError: (error) => {
        console.error("Error deleting blog:", error);
        toast.error(error.response?.data?.message || "Failed to delete blog");
      },
    });
  };

  if (deleteError) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-semibold mb-2">
              Error Loading Blog
            </h3>
            <p className="text-red-600 text-sm mb-4">
              {deleteError.response?.data?.message ||
                "Failed to load blog details"}
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
    <div className="font-fontContent  p-6 flex flex-col justify-center items-center ">
      <h2>Are you sure you want to delete this blog?</h2>
      <div className="flex justify-end gap-3 pt-4 ">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowDeleteModal(false)}
          disabled={isDeleting}
          className="min-w-[100px] hover:cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={() => handleDelete(data)}
          disabled={isDeleting}
          className="min-w-[100px] bg-darkSky/80 hover:cursor-pointer hover:bg-darkSky text-white"
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Deleting...
            </>
          ) : (
            "Delete Blog"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeleteBlog;
