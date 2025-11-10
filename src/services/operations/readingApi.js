import { apiConnector } from "../apiConnector";
import { readingApiEndPoint } from "../apis";

const {
  GET_ALL_READING,
  GET_SINGLE_READING_BY_ID,
  CREATE_READING,
  UPDATE_READING_BY_ID,
  UPDATE_READING_STATUS,
  DELETE_READING_BY_ID,
} = readingApiEndPoint;

export const readingApis = {
  //--------------------------------get All Reading --------------------------------

  getAllReading: async () => {
    const response = await apiConnector("GET", GET_ALL_READING);
    return response.data;
  },

  //--------------------------------get Single Reading --------------------------------

  getSingleReadingById: async (readingId) => {
    const response = await apiConnector(
      "GET",
      GET_SINGLE_READING_BY_ID(readingId)
    );
    return response.data;
  },

  //---------------------------------create Reading--------------------------------

  createReading: async (data) => {
    const response = await apiConnector("POST", CREATE_READING, data);
    return response.data;
  },

  //--------------------------------update Reading By Id --------------------------

  updateReadingById: async (readingId, data) => {
    const response = await apiConnector(
      "PUT",
      UPDATE_READING_BY_ID(readingId),
      data
    );
    return response.data;
  },

  //--------------------------------update Reading Status By Id --------------------------

  updateReadingStatusById: async (readingId, data) => {
    const response = await apiConnector(
      "PUT",
      UPDATE_READING_STATUS(readingId),
      data
    );
    return response.data;
  },

  //--------------------------------delete Reading By Id --------------------------

  deleteReadingById: async (readingId) => {
    const response = await apiConnector(
      "DELETE",
      DELETE_READING_BY_ID(readingId)
    );
    return response.data;
  },
};
