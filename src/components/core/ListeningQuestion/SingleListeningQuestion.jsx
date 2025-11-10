import { useGetSingleListeningQuestionById } from "@/pages/ListeningQuestions/hooks/useListeningQuestions";
import React from "react";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  Volume2,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import ReactAudioPlayer from "react-audio-player";

const SingleListeningQuestion = ({ id, setShowSingleQuestion }) => {
  console.log("id", id);

  const { VITE_CLIENT_AUDIO_URL } = import.meta.env;

  const {
    data: SingleQuestion,
    isLoading,
    error,
  } = useGetSingleListeningQuestionById(id);

  

  // Function to render HTML content with images
  const renderHTMLWithImages = (htmlContent) => {
    if (!htmlContent) return null;

    return (
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <p className="text-gray-600 text-lg">Loading question details...</p>
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
            Failed to load question details
          </p>
          <p className="text-gray-500 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  if (!SingleQuestion?.data) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 text-lg">No question data found</p>
        </div>
      </div>
    );
  }

  const question = SingleQuestion.data;
  const audioUrl = `${VITE_CLIENT_AUDIO_URL}/${question.audioFile}`;

  const handleCancel = () => {
    setShowSingleQuestion(false);
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Question Details
          </h1>
          <p className="text-gray-600">
            Complete information about the listening question
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
            <div
              className={`w-3 h-3 rounded-full ${
                question.status === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm font-medium text-gray-700">Status</span>
          </div>
          <p
            className={`text-lg font-semibold capitalize ${
              question.status === "active" ? "text-green-700" : "text-red-700"
            }`}
          >
            {question.status}
          </p>
        </div>

        {/* Correct Answer */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Correct Answer
            </span>
          </div>
          <p className="text-lg font-semibold text-gray-900 uppercase">
            {question.answer}
          </p>
        </div>

        {/* Time */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Time</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {question.time} seconds
          </p>
        </div>

        {/* Sequence */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Sequence</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {question.sequence}
          </p>
        </div>
      </div>

      {/* Audio File Section */}
      {question.audioFile && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-blue-600" />
            Audio File
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <ReactAudioPlayer
                  src={`${audioUrl}`}
                  controls
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Options Section with Images */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            const isCorrect = option.isCorrect;

            return (
              <div
                key={option._id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCorrect
                    ? "bg-green-50 border-green-300 shadow-sm"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {optionLetter}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Option {optionLetter}
                      {isCorrect && (
                        <span className="ml-2 text-green-600 text-xs font-normal">
                          (Correct)
                        </span>
                      )}
                    </span>
                  </div>
                  {isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div className="pl-2">{renderHTMLWithImages(option.text)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleListeningQuestion;
