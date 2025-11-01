import { apiConnector } from "../apiConnector";
import { notificationApiEndPoint } from "../apis";

const {
  GET_ALL_NOTIFICATIONS,
  CREATE_NOTIFICATION,
  GET_NOTIFICATION_BY_ID,
  UPDATE_NOTIFICATION_BY_ID,
  DELETE_NOTIFICATION_BY_ID,
  CHANGE_NOTIFICATION_STATUS,
} = notificationApiEndPoint;


export const notificationApis = {

    //------------- get all notifications -----------------
    getAllNotifications: async () => {
        const response = await apiConnector("GET", GET_ALL_NOTIFICATIONS);
        return response.data;
    },

    //------------- create notification -----------------
    createNotification: async (data) => {
        const response = await apiConnector("POST",CREATE_NOTIFICATION, data);
        return response.data;
    },

    //------------- get notification by id -----------------
    getNotificationById: async (id) => {
        const response = await apiConnector("GET", GET_NOTIFICATION_BY_ID(id));
        return response.data;
    },

    //------------- update notification by id -----------------
    updateNotificationById: async (id, data) => {
        const response = await apiConnector("PUT", UPDATE_NOTIFICATION_BY_ID(id), data);
        return response.data;
    },

    //------------- delete notification by id -----------------
    deleteNotificationById: async (id) => {
        const response = await apiConnector("DELETE", DELETE_NOTIFICATION_BY_ID(id));
        return response.data;
    },

    //------------- change notification status -----------------
    changeNotificationStatus: async (id, data) => {
        const response = await apiConnector("PATCH", CHANGE_NOTIFICATION_STATUS(id), data);
        return response.data;
    }

}
