// pages/AboutUsPage.jsx
import React, { useEffect, useState } from "react";
import { useAboutData, useUpdateCms } from "./hooks/useAbout";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import QuillDisplay from "@/components/common/QuillEditor/QuillDisplay";
import QuillEditor from "@/components/common/QuillEditor/QuillEditor";
import { toast } from "sonner";

const AboutUsPage = () => {
  const { data: AboutData, isLoading, error, refetch } = useAboutData();
  const { mutate: updateAbout, isPending: isUpdating } = useUpdateCms();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  // Initialize edited content when data loads
  useEffect(() => {
    if (AboutData?.data?.description) {
      setEditedContent(AboutData.data.description);
    }
  }, [AboutData?.data?.description]);

  //------------ Loading state ----------------------
  if (isLoading) {
    return (
      <div className="flex justify-center items-center ">
        <Spinner />
      </div>
    );
  }

  //--------------- Error state----------------------
  if (error) {
    return (
      <div className=" mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-red-800 font-semibold mb-2">
            Error Loading Content
          </h3>
          <p className="text-red-600 text-sm mb-4">
            {error.response?.data?.message || "Failed to load content"}
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset to original content
      setEditedContent(AboutData?.data?.description || "");
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (!editedContent.trim()) {
      alert("Content cannot be empty");
      return;
    }

    // Prepare data according to API requirements
    const updateData = {
      cms_id: AboutData.data._id, // Use the _id from the response
      title: AboutData.data.title, // Keep the same title
      description: editedContent,
    };

    updateAbout(updateData, {
      onSuccess: (response) => {
        setIsEditing(false);
        // console.log("Update successful:", response);
        // alert("Content updated successfully!");
        toast.success("Content updated successfully!", response?.data?.message);
      },
      onError: (error) => {
        console.error("Error updating content:", error);
        alert(
          `Failed to update content: ${
            error.response?.data?.message || error.message
          }`
        );
      },
    });
  };

  const handleContentChange = (content) => {
    setEditedContent(content);
  };

  const aboutContent = AboutData?.data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Title and Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-fontContent text-3xl font-bold text-gray-900">
          {aboutContent?.title}
        </h2>

        <div className="flex gap-2">
          {!isEditing ? (
            <Button
              onClick={handleEditToggle}
              className="bg-darkSky/80 hover:bg-darkSky hover:cursor-pointer text-white"
            >
              Edit Content
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isUpdating ? (
                  <>
                    <Spinner size={4} className="mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                onClick={handleEditToggle}
                variant="outline"
                disabled={isUpdating}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        {isEditing ? (
          // Edit Mode
          <div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Edit Content:
              </label>
              <QuillEditor
                value={editedContent}
                onChange={handleContentChange}
                readOnly={false}
                placeholder="Start writing your content here..."
              />
            </div>

            {/* Content Stats */}
            <div className="text-sm text-gray-500 mt-4">
              Character count: {editedContent.replace(/<[^>]*>/g, "").length}
            </div>
          </div>
        ) : (
          // View Mode
          <div>
            {aboutContent?.description ? (
              <QuillDisplay
                content={aboutContent.description}
                className="min-h-[200px]"
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-2">No content available</p>
                <p className="text-sm">Click "Edit Content" to add content</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Last Updated Info */}
      {aboutContent?.updatedAt && (
        <div className="text-sm text-gray-500 mt-4 text-right">
          Last updated:{" "}
          {new Date(aboutContent.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  );
};

export default AboutUsPage;
