import { useGetSingleListeningItemById } from "@/pages/ListeningItems/hooks/useListeningItem";
import React from "react";
import {
  Loader2,
  XCircle,
  Play,
  FileAudio,
  FileVideo,
  Calendar,
  List,
  Clock,
  FileText,
} from "lucide-react";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const { VITE_CLIENT_AUDIO_URL } = import.meta.env;

const SingleListeningItem = ({ id, setShowSingleListeningItem }) => {
  const {
    data: SingleListeningItem,
    isLoading,
    error,
  } = useGetSingleListeningItemById(id);

  const handleCancel = () => {
    setShowSingleListeningItem(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <p className="text-gray-600 text-lg">
            Loading listening item details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-600 text-lg">
            Failed to load listening item details
          </p>
          <p className="text-gray-500 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!SingleListeningItem?.data) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 text-lg">No listening item data found</p>
        </div>
      </div>
    );
  }

  const listeningItem = SingleListeningItem.data;
  const fileUrl = `${VITE_CLIENT_AUDIO_URL}/${listeningItem?.file}`;
  const isVideo = listeningItem.fileType === "video";

  console.log("File URL:", fileUrl);
  console.log("File Type:", listeningItem.fileType);

  // Format file size for display (you might need to get this from your API)
  const getFileTypeDisplay = () => {
    return (
      listeningItem.fileType?.charAt(0).toUpperCase() +
        listeningItem.fileType?.slice(1) || "Unknown"
    );
  };

  const getFileIcon = () => {
    return isVideo ? (
      <FileVideo className="h-5 w-5 text-red-600" />
    ) : (
      <FileAudio className="h-5 w-5 text-blue-600" />
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          dot: "bg-green-500",
        };
      case "inactive":
        return { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" };
    }
  };

  const statusColors = getStatusColor(listeningItem.status);

  return (
    <div className="p-6 bg-white rounded-lg max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Listening Item Details
          </h1>
          <p className="text-gray-600">
            Complete information about the {listeningItem.fileType} item
          </p>
        </div>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      {/* Basic Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Status Badge */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${statusColors.dot}`}></div>
            <span className="text-sm font-medium text-gray-700">Status</span>
          </div>
          <div
            className={`px-2 py-1 rounded text-sm font-medium inline-block ${statusColors.bg} ${statusColors.text}`}
          >
            {listeningItem.status}
          </div>
        </div>

        {/* File Type */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            {getFileIcon()}
            <span className="text-sm font-medium text-gray-700">File Type</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 capitalize">
            {getFileTypeDisplay()}
          </p>
        </div>

        {/* Total Time */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Duration</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {listeningItem.totalTime} minutes
          </p>
        </div>

        {/* Questions Count */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <List className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Questions</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {listeningItem.listeningQuestions?.length || 0}
          </p>
        </div>
      </div>

      {/* Title Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <span>Item Title</span>
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-900 text-lg font-medium">
            {listeningItem.title}
          </p>
        </div>
      </div>

      {/* File Preview Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Play className="h-5 w-5 text-green-600" />
          <span>{isVideo ? "Video" : "Audio"} Preview</span>
          <span
            className={`px-2 py-1 rounded text-sm ml-2 ${
              isVideo ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
            }`}
          >
            {getFileTypeDisplay()}
          </span>
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          {listeningItem.file ? (
            <div className="space-y-4">
              {/* File Player */}
              {isVideo ? (
                <video
                  controls
                  className="w-full rounded-lg max-h-96 bg-black"
                  poster="/video-thumbnail-placeholder.png"
                >
                  <source src={fileUrl} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              ) : (
                <audio controls className="w-full" src={fileUrl}>
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              {isVideo ? (
                <FileVideo className="h-16 w-16 text-gray-400 mx-auto mb-3" />
              ) : (
                <FileAudio className="h-16 w-16 text-gray-400 mx-auto mb-3" />
              )}
              <p className="text-gray-500 text-lg">
                No {listeningItem.fileType} file available
              </p>
              <p className="text-gray-400 text-sm mt-1">
                The file might have been removed or is not accessible
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleListeningItem;
