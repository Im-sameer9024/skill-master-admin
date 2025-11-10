import { apiConnector } from "../apiConnector";
import { readingQuestionApiEndPoint } from "../apis";

const {
  GET_ALL_READING_ITEM_QUESTIONS,
  GET_SINGLE_READING_QUESTION_BY_ID,
  CREATE_READING_QUESTION,
  UPDATE_READING_QUESTION_BY_ID,
  UPDATE_READING_QUESTION_STATUS_BY_ID,
  DELETE_READING_QUESTION_BY_ID,
} = readingQuestionApiEndPoint;

export const readingQuestionApi = {
  //-----------------------------get all Reading question by Reading item id ------------------------------

  getAllReadingQuestionsByReadingItemId: async (readingItemId) => {
    const response = await apiConnector(
      "GET",
      GET_ALL_READING_ITEM_QUESTIONS(readingItemId)
    );
    return response.data;
  },

  //------------------------------get Single reading question by reading item id --------------------------

  getSingleReadingQuestionById: async (question_id) => {
    const response = await apiConnector(
      "GET",
      GET_SINGLE_READING_QUESTION_BY_ID(question_id)
    );
    return response.data;
  },

  //------------------------------create reading question ---------------------------------------------

  createReadingQuestion: async (data) => {
    const response = await apiConnector("POST", CREATE_READING_QUESTION, data);
    return response.data;
  },

  //------------------------------update reading question by question id ---------------------------

  updateReadingQuestionById: async (question_id, data) => {
    const response = await apiConnector(
      "PUT",
      UPDATE_READING_QUESTION_BY_ID(question_id),
      data
    );
    return response.data;
  },

  //------------------------------update reading question status by question id ---------------------------

  updateReadingQuestionStatusById: async (question_id, data) => {
    const response = await apiConnector(
      "PUT",
      UPDATE_READING_QUESTION_STATUS_BY_ID(question_id),
      data
    );
    return response.data;
  },

  //------------------------------delete reading question by question id ---------------------------

  deleteReadingQuestionById: async (question_id) => {
    const response = await apiConnector(
      "DELETE",
      DELETE_READING_QUESTION_BY_ID(question_id)
    );
    return response.data;
  },
};
