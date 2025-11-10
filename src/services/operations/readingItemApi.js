import { apiConnector } from "../apiConnector";
import { readingItemApiEndPoint } from "../apis";

const {
  GET_ALL_READING_ITEMS_BY_READING_ID,
  GET_SINGLE_READING_ITEM_BY_ID,
  CREATE_READING_ITEM,
  UPDATE_READING_ITEM_BY_ID,
  UPDATE_READING_ITEM_STATUS_BY_ID,
  DELETE_READING_ITEM_BY_ID,
} = readingItemApiEndPoint;

export const readingItemApis = {
  //-------------------------get all Reading Items by Reading Id --------------------------

  getAllReadingItemsByReadingId: async (readingId) => {
    const response = await apiConnector(
      "GET",
      GET_ALL_READING_ITEMS_BY_READING_ID(readingId)
    );
    return response.data;
  },

  //-----------------------------get Single Reading item by Id------------------------
  getSingleReadingItemById: async (reading_item_id) => {
    const response = await apiConnector(
      "GET",
      GET_SINGLE_READING_ITEM_BY_ID(reading_item_id)
    );
    return response.data;
  },

  //-------------------------------Create Reading Item--------------------------------------------

  createReadingItem: async (data) => {
    const response = await apiConnector("POST", CREATE_READING_ITEM, data);
    return response.data;
  },

  //-----------------------------------update Reading Item by id --------------------------

  updateReadingItemById: async (reading_item_id, data) => {
    const response = await apiConnector(
      "PUT",
      UPDATE_READING_ITEM_BY_ID(reading_item_id),
      data
    );
    return response.data;
  },

  //------------------------------------update Reading Item Status by id --------------------------

  updateReadingItemStatusById: async (reading_item_id, data) => {
    const response = await apiConnector(
      "PUT",
      UPDATE_READING_ITEM_STATUS_BY_ID(reading_item_id),
      data
    );
    return response.data;
  },

  //-------------------------------delete Reading Item by id --------------------------

  deleteReadingItemById: async (reading_item_id) => {
    const response = await apiConnector(
      "DELETE",
      DELETE_READING_ITEM_BY_ID(reading_item_id)
    );
    return response.data;
  },
};
