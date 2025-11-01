import { apiConnector } from "../apiConnector";
import { listeningItemApiEndPoint } from "../apis";

const {
  GET_ALL_LISTENING_ITEMS_BY_LISTENING_ID,
  CREATE_LISTENING_ITEM,
  GET_SINGLE_LISTENING_ITEM_BY_ID,
  UPDATE_LISTENING_ITEM_BY_ID,
  UPDATE_LISTENING_ITEM_STATUS_BY_ID,
  DELETE_LISTENING_ITEM_BY_ID,
} = listeningItemApiEndPoint;

export const listeningItemApis = {
  //------------------------------get all Listening Items by Listening Id --------------------------

  getAllListeningItemsByListeningId: async (listeningId) => {
    const response = await apiConnector(
      "GET",
      GET_ALL_LISTENING_ITEMS_BY_LISTENING_ID(listeningId)
    );
    return response.data;
  },

  //-------------------------------Create Listening Item--------------------------------------------

  createListeningItem: async (data) => {
    const response = await apiConnector("POST",CREATE_LISTENING_ITEM,data);
    return response.data;
  },


  //------------------------------get Listening Item by id --------------------------

  getListeningItemById:async(id) =>{
    const response = await apiConnector("GET",GET_SINGLE_LISTENING_ITEM_BY_ID(id))
    return response.data
  },

  //-----------------------------------update Listening Item by id --------------------------
  
  updateListeningItemById:async(id,data) =>{
    const response = await apiConnector("PUT",UPDATE_LISTENING_ITEM_BY_ID(id),data)
    return response.data
  },

  //-----------------------------------update Listening Item Status by id --------------------------
  updateListeningItemStatusById:async(id,data) =>{
    const response = await apiConnector("PUT",UPDATE_LISTENING_ITEM_STATUS_BY_ID(id),data)
    return response.data
  },

  //-------------------------------delete Listening Item by id --------------------------
  deleteListeningItemById:async(id) =>{
    const response = await apiConnector("DELETE",DELETE_LISTENING_ITEM_BY_ID(id))
    return response.data
  }
};
