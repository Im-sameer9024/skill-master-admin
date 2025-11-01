import { useGetSingleListeningQuestionById } from "@/pages/ListeningQuestions/hooks/useListeningQuestions";
import React from "react";
import { Loader2, CheckCircle2, XCircle, Clock, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

const SingleListeningQuestion = ({ id, setShowSingleQuestion }) => {

  const {
    data: SingleQuestion,
    isLoading,
    error,
  } = useGetSingleListeningQuestionById(id);

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

  const handleCancel = () => {
    setShowSingleQuestion(false);
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg ">
      {/* Header */}
      <div className="flex justify-end mb-6 pb-4 ">
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

      {/* Header Section */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Question Details
        </h1>
        <p className="text-gray-600">
          Complete information about the listening question
        </p>
      </div>

      {/* Basic Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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

        {/* Created Date */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Created</span>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {new Date(question.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Question Title */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            Question
          </span>
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-900 text-lg font-medium">{question.title}</p>
        </div>
      </div>

      {/* Options Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                <div className="flex items-center justify-between mb-2">
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
                    </span>
                  </div>
                  {isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <p className="text-gray-900 font-medium pl-11">{option.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleListeningQuestion;
