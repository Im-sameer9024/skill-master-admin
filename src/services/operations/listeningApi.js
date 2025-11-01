// services/operations/cmsApi.js
import { apiConnector } from "../apiConnector";
import { listeningApiEndPoint } from "../apis";

const {
  GET_ALL_LISTENING,
  GET_LISTENING_BY_ID,
  CREATE_LISTENING,
  UPDATE_LISTENING_BY_ID,
  DELETE_LISTENING_BY_ID
} = listeningApiEndPoint;


export const listeningApis = {

    //------------------------------get all Listening --------------------------

    getAllListening:async() =>{
        const response = await apiConnector("GET", GET_ALL_LISTENING);
        return response.data
    },

    //------------------------------get Listening by id --------------------------

    getListeningById:async(id) =>{
        const response = await apiConnector("GET", GET_LISTENING_BY_ID(id));
        return response.data
    },

    //------------------------------create Listening --------------------------
    
    createListening:async(data) =>{
        const response = await apiConnector("POST", CREATE_LISTENING, data);
        return response.data
    },

    //-----------------------------------update Listening by id --------------------------

    updateListeningById:async(id, data) =>{
        const response = await apiConnector("PUT", UPDATE_LISTENING_BY_ID(id), data);
        return response.data
    },

    //-----------------------------------update Listening by id --------------------------
    updateListeningStatusById:async(id, data) =>{
        const response = await apiConnector("PUT", UPDATE_LISTENING_BY_ID(id), data);
        return response.data
    },

    //-------------------------------delete Listening by id --------------------------
    deleteListeningById:async(id) =>{
        const response = await apiConnector("DELETE", DELETE_LISTENING_BY_ID(id));
        return response.data
    }

};
