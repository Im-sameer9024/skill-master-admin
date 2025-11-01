import { apiConnector } from "../apiConnector";
import { listeningQuestionApiEndPoint } from "../apis";

const {
  GET_ALL_LISTENING_QUESTIONS,
  GET_SINGLE_LISTENING_QUESTION_BY_ID,
  CREATE_LISTENING_QUESTION,
  UPDATE_LISTENING_QUESTIONS_BY_ID,
  UPDATE_LISTENING_QUESTIONS_STATUS_BY_ID,
  DELETE_LISTENING_QUESTIONS_BY_ID,
} = listeningQuestionApiEndPoint;

export const listeningQuestionApi = {
  //-------------------------get all Listening Questions by Id --------------------------

  getAllListeningItemQuestionsById: async (listeningItemId) => {
    const response = await apiConnector(
      "GET",
      GET_ALL_LISTENING_QUESTIONS(listeningItemId)
    );
    return response.data;
  },

  //-------------------------get Single Listening Question by Id --------------------------

  getSingleListeningQuestion: async (id) => {
    const response = await apiConnector(
      "GET",
      GET_SINGLE_LISTENING_QUESTION_BY_ID(id)
    );
    return response.data;
  },

  //-----------------------Create Listening Question---------------------

  createListeningQuestion: async (data) => {
    const response = await apiConnector(
      "POST",
      CREATE_LISTENING_QUESTION,
      data
    );
    return response.data;
  },

  //-------------------------update Listening Question by Id --------------------------

  updateListeningQuestionById: async (id, data) => {
    const response = await apiConnector(
      "PUT",
      UPDATE_LISTENING_QUESTIONS_BY_ID(id),
      data
    );
    return response.data;
  },

  //-------------------------update Listening Question Status by Id --------------------------

  updateListeningQuestionStatusById: async (id, data) => {
    const response = await apiConnector(
      "PUT",
      UPDATE_LISTENING_QUESTIONS_STATUS_BY_ID(id),
      data
    );
    return response.data;
  },

  //-------------------------delete Listening Question by Id --------------------------

  deleteListeningQuestionById: async (id) => {
    const response = await apiConnector(
      "DELETE",
      DELETE_LISTENING_QUESTIONS_BY_ID(id)
    );
    return response.data;
  },
};
