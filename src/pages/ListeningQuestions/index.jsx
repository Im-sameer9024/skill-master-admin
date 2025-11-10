import TableComponent from "@/components/common/TableComponent";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineVisibility } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import Spinner from "@/components/common/Spinner";
import Popup from "@/components/common/Popup";

import { Link, useParams } from "react-router-dom";
import { ListeningQuestionColumnsData } from "./Data";
import { useGetListeningQuestionsById } from "./hooks/useListeningQuestions";
import CreateListeningQuestion from "@/components/core/ListeningQuestion/CreateListeningQuestion";
import EditListeningQuestionStatus from "@/components/core/ListeningQuestion/EditListeningQuestionStatus";
import DeleteListeningQuestion from "@/components/core/ListeningQuestion/DeleteListeningQuestion";
import EditListeningQuestion from "@/components/core/ListeningQuestion/EditListeningQuestion";
import SingleListeningQuestion from "@/components/core/ListeningQuestion/SingleListeningQuestion";
import ReactAudioPlayer from "react-audio-player";
// import EditListeningStatus from "@/components/core/Listening/EditListeningStatus";
// import { useGetListeningItemsById } from "./hooks/useListeningItem";

const ListeningQuestionsPage = () => {
  const { listening_item_id, audio_id } = useParams();

  const [showCreateListeningQuestion, setShowCreateListeningQuestion] =
    useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditListeningQuestion, setShowEditListeningQuestion] =
    useState(false);
  const [listeningQuestionId, setListeningQuestionId] = useState(null);
  const [showEditStatusModal, setShowEditStatusModal] = useState(false);
  const [showSingleQuestion, setShowSingleQuestion] = useState(false);

  const {
    data: ListeningQuestionsData,
    isLoading,
    error,
  } = useGetListeningQuestionsById(listening_item_id, audio_id);

  const { VITE_CLIENT_AUDIO_URL } = import.meta.env;

  const audioUrl = `${VITE_CLIENT_AUDIO_URL}`;

  console.log("data of quesiton", ListeningQuestionsData);

  const openEditStatusModal = (id) => {
    setShowEditStatusModal(true);
    setListeningQuestionId(id);
  };

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setListeningQuestionId(id);
  };

  const openEditModal = (id) => {
    setShowEditListeningQuestion(true);
    setListeningQuestionId(id);
  };

  const openSingleQuestionModel = (id) => {
    setShowSingleQuestion(true);
    setListeningQuestionId(id);
  };

  // Render row function with proper data mapping for Listening
  const renderRow = (question, index) => (
    <tr key={question._id || index}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        <div className="w-62">
          <ReactAudioPlayer
            src={`${audioUrl}/${question?.audioFile}`}
            controls
            className="w-full"
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {question.answer}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            question.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {question.status}
        </span>
        {/* Edit */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => openEditStatusModal(question._id)}
              variant="ghost"
              size="icon-sm"
              className="hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <CiEdit className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </td>

      {/*------------------ actions buttons -------------- */}
      <td>
        <div className="flex items-center gap-1">
          {/* See Details */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openSingleQuestionModel(question._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <MdOutlineVisibility className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See Details</p>
            </TooltipContent>
          </Tooltip>
          {/* Edit */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openEditModal(question._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <CiEdit className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>

          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openDeleteModal(question._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full hover:text-destructive text-destructive/80 cursor-pointer"
              >
                <MdOutlineDeleteOutline className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </td>
    </tr>
  );

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
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-4xl mx-auto">
        <p className="text-red-800 font-semibold mb-2">
          Error loading listening categories
        </p>
        <p className="text-red-600 text-sm mb-4">
          {error.response?.data?.message ||
            error.message ||
            "Failed to load listening categories"}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Listening Question Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Total Question : {ListeningQuestionsData?.data?.length || 0}
          </p>
        </div>
        <Button
          onClick={() => setShowCreateListeningQuestion(true)}
          className="bg-darkSky/90 hover:bg-darkSky text-white cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add New Listening Question
        </Button>
      </div>

      {/*----------- popup for listening question Details----------  */}
      <Popup
        openModal={showSingleQuestion}
        content={
          <SingleListeningQuestion
            id={listeningQuestionId}
            setShowSingleQuestion={setShowSingleQuestion}
          />
        }
        width={"w-[70%]"}
      />

      {/*----------- popup for listening question create----------  */}
      <Popup
        openModal={showCreateListeningQuestion}
        content={
          <CreateListeningQuestion
            setShowCreateListeningQuestion={setShowCreateListeningQuestion}
          />
        }
        width={"w-[70%]"}
      />

      {/*----------- popup for question status update----------  */}
      <Popup
        openModal={showEditStatusModal}
        content={
          <EditListeningQuestionStatus
            id={listeningQuestionId}
            setShowEditStatusModal={setShowEditStatusModal}
          />
        }
        width={"w-[40%]"}
      />

      {/*----------- popup for listening question delete----------  */}
      <Popup
        openModal={showDeleteModal}
        content={
          <DeleteListeningQuestion
            id={listeningQuestionId}
            setShowDeleteModal={setShowDeleteModal}
          />
        }
        width={"w-[40%]"}
      />

      {/*----------- popup for listening Question edit----------  */}
      <Popup
        openModal={showEditListeningQuestion}
        content={
          <EditListeningQuestion
            id={listeningQuestionId}
            setShowEditListeningQuestion={setShowEditListeningQuestion}
          />
        }
        width={"w-[70%]"}
      />

      {ListeningQuestionsData?.data?.length > 0 ? (
        <TableComponent
          columns={ListeningQuestionColumnsData}
          data={ListeningQuestionsData?.data}
          renderRow={renderRow}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">🎵</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Listening Questions Found
            </h3>
            <p className="text-gray-500 mb-4">
              There are no listening Questions available yet. Create your first
              listening Question to get started.
            </p>
            <Button
              onClick={() => setShowCreateListeningQuestion(true)}
              className="bg-darkSky/90 hover:bg-darkSky text-white"
            >
              <FaPlus className="mr-2" />
              Create First listening Question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeningQuestionsPage;
