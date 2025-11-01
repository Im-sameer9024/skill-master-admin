// hooks/useAbout.js
import { notificationApis } from "@/services/operations/notificationApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//--------------------------------create notification hook-----------------------------

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => notificationApis.createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["notification"]);
    },
    onError: (error) => {
      console.error("Error creating notification:", error);
    },
  });
};

//-----------------------------------get all notification data hook-----------------------------
export const useNotificationData = () => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: () => notificationApis.getAllNotifications(),
  });
};

//-----------------------------------get notification by id hook-----------------------------
export const useNotificationById = (id) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: () => notificationApis.getNotificationById(id),
    enabled: !!id, // only run the query if id is provided
  });
};

//-----------------------------------update status notification hook-----------------------------

export const useUpdateStatusNotification = (id, data) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApis.updateNotificationById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["notification"]);
    },
    onError: (error) => {
      console.error("Error updating notification status:", error);
    },
  });
};

//-----------------------------------delete notification hook-----------------------------

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => notificationApis.deleteNotificationById(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notification"]);
    },
    onError: (error) => {
      console.error("Error deleting notification:", error);
    },
  });
};

//-----------------------------------update notification hook-----------------------------
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      notificationApis.updateNotificationById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["notification"]);
    },
    onError: (error) => {
      console.error("Error updating notification:", error);
    },
  });
};
