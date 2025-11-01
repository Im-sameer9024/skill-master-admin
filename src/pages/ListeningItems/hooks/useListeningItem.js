import { listeningItemApis } from "@/services/operations/listeningItemApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//---------------------hook for get all Listening Items by Listening Id --------------------
export const useGetListeningItemsById = (id) => {
  return useQuery({
    queryKey: ["listening", id],
    queryFn: () => listeningItemApis.getAllListeningItemsByListeningId(id),
    enabled: !!id, //only run the query if id is provided
  });
};

//---------------------hook for create Listening Item --------------------
export const useCreateListeningItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => listeningItemApis.createListeningItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["listening"]);
    },
    onError: (error) => {
      console.log("Error occur to create listening Item ", error);
    },
  });
};

//---------------------hook for get Listening Item by id --------------------

export const useGetSingleListeningItemById = (id) => {
  return useQuery({
    queryKey: ["listeningItem", id],
    queryFn: () => listeningItemApis.getListeningItemById(id),
    enabled: !!id, //only run the query if id is provided
  });
};

//----------------------- hook for update Listening Item by id --------------------

export const useUpdateListeningItemById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      listeningItemApis.updateListeningItemById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["listeningItem"]);
    },
    onError: (error) => {
      console.log("Error occur to update listening Item ", error);
    },
  });
};

//----------------------- hook for update Listening Item Status by id --------------------

export const useUpdateListeningItemStatusById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      listeningItemApis.updateListeningItemStatusById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["listeningItem"]);
    },
    onError: (error) => {
      console.log("Error occur to update listening Item ", error);
    },
  });
};


//----------------------- hook for delete Listening Item by id --------------------

export const useDeleteListeningItemById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => listeningItemApis.deleteListeningItemById(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listeningItem"]);
    },
    onError: (error) => {
      console.log("Error occur to delete listening Item ", error);
    }
  })
}
