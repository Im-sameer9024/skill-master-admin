import { listeningApis } from "@/services/operations/listeningApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//---------------------------------get all Listening ------------------------------
export const useGetAllListening = () => {
  return useQuery({
    queryKey: ["AllListening"],
    queryFn: () => listeningApis.getAllListening(),
  });
};

//-------------------------------get single Listening By id ---------------------------------

export const useGetListeningById = (id) => {
  return useQuery({
    queryKey: ["Listening", id],
    queryFn: () => listeningApis.getListeningById(id),
    enabled: !!id, //only run the query if id is provided
  });
};

//-----------------------------delete Listening By id ---------------------------------

export const useDeleteListeningById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => listeningApis.deleteListeningById(id),
    onSuccess: (data,id) => {
      queryClient.invalidateQueries({queryKey:["AllListening"]});
      queryClient.invalidateQueries({queryKey:["Listening",id]});

    },
    onError: (error) => {
      console.log("Error occur to delete listening", error);
    },
  });
};

//-----------------------------create Listening ---------------------------------

export const useCreateListening = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => listeningApis.createListening(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["AllListening"]});

    },
    onError: (error) => {
      console.log("Error occur to create listening", error);
    },
  });
};

//-----------------------------update Listening By id ---------------------------------

export const useUpdateListeningById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => listeningApis.updateListeningById(id, data),
    onSuccess: (data,variables) => {
      console.log("variables",variables.id);
      queryClient.invalidateQueries({queryKey:["AllListening"]});
      queryClient.invalidateQueries({queryKey:["Listening",variables.id]});

    },
    onError: (error) => {
      console.log("Error occur to update listening", error);
    },
  });
};

//-----------------------------update Listening Status By id ---------------------------------

export const useUpdateListeningStatusById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      listeningApis.updateListeningStatusById(id, data),
    onSuccess: (data,variables) => {
      queryClient.invalidateQueries({queryKey:["AllListening"]});
      queryClient.invalidateQueries({queryKey:["Listening",variables.id]});

    },
    onError: (error) => {
      console.log("Error occur to update listening", error);
    },
  });
};
