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

  console.log("single Item data", SingleListeningItem);

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
  const audios = listeningItem.audios || [];
  
  // Calculate total questions across all audios
  const totalQuestions = audios.reduce((total, audio) => {
    return total + (audio.questions?.length || 0);
  }, 0);

  // Determine file type based on file extension
  const getFileType = (audioFile) => {
    if (!audioFile) return null;
    const extension = audioFile.split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'ogg', 'avi', 'mov'].includes(extension)) {
      return 'video';
    }
    return 'audio';
  };

  const getFileIcon = (isVideo) => {
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

  const renderHTMLContent = (htmlContent) => {
    if (!htmlContent) return null;
    
    return (
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Listening Item Details
          </h1>
          <p className="text-gray-600">
            Complete information about the listening item with {audios.length} audio{audios.length !== 1 ? 's' : ''}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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

        {/* Total Audios */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <FileAudio className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Total Audios</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {audios.length}
          </p>
        </div>

        {/* Total Questions */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <List className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Total Questions</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {totalQuestions}
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

      {/* Instruction Section */}
      {listeningItem.instruction && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            <span>Instructions</span>
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            {renderHTMLContent(listeningItem.instruction)}
          </div>
        </div>
      )}

      {/* Description Section */}
      {listeningItem.description && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <span>Description</span>
          </h2>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            {renderHTMLContent(listeningItem.description)}
          </div>
        </div>
      )}

      {/* Audio Files Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Play className="h-5 w-5 text-green-600" />
          <span>Audio Files</span>
          <span className="px-2 py-1 rounded text-sm ml-2 bg-blue-100 text-blue-800">
            {audios.length} file{audios.length !== 1 ? 's' : ''}
          </span>
        </h2>
        
        {audios.length > 0 ? (
          <div className="space-y-6">
            {audios.map((audioData, index) => {
              const audioFile = audioData?.audio_file;
              const audioTitle = audioData?.title;
              const questions = audioData?.questions || [];
              const fileUrl = audioFile ? `${VITE_CLIENT_AUDIO_URL}/${audioFile}` : null;
              const fileType = getFileType(audioFile);
              const isVideo = fileType === 'video';
              const fileTypeDisplay = fileType ? fileType.charAt(0).toUpperCase() + fileType.slice(1) : "Unknown";

              return (
                <div key={audioData._id || index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  {/* Audio Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-300">
                    <div className="flex items-center gap-3">
                      {getFileIcon(isVideo)}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {audioTitle || `Audio ${index + 1}`}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {fileTypeDisplay} file
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 flex items-center gap-1">
                        <List className="h-4 w-4" />
                        {questions.length} question{questions.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {audioFile ? (
                    <div className="space-y-4">
                      {/* File Info */}
                      <div className="flex items-center justify-between p-3 bg-white rounded border">
                        <div className="flex items-center gap-3">
                          {getFileIcon(isVideo)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {audioFile}
                            </p>
                            <p className="text-xs text-gray-500">
                              {fileTypeDisplay} file
                            </p>
                          </div>
                        </div>
                        <a
                          href={fileUrl}
                          download
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Download
                        </a>
                      </div>

                      {/* File Player */}
                      {isVideo ? (
                        <video
                          controls
                          className="w-full rounded-lg max-h-96 bg-black"
                        >
                          <source src={fileUrl} type="video/mp4" />
                          Your browser does not support the video element.
                        </video>
                      ) : (
                        <div className="flex items-center justify-center p-4">
                          <audio controls className="w-full max-w-md" src={fileUrl}>
                            Your browser does not support the audio element.
                          </audio>
                        </div>
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
                        No {fileType || 'media'} file available
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        The file might have been removed or is not accessible
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <FileAudio className="h-16 w-16 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No audio files available</p>
            <p className="text-gray-400 text-sm mt-1">
              No audio files have been added to this listening item
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleListeningItem;