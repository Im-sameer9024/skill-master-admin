import { listeningQuestionApi } from "@/services/operations/listeningQuestionApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//----------------------hook for get all questions by listening Item id --------------------

export const useGetListeningQuestionsById = (id) => {
  return useQuery({
    queryKey: ["listeningQuestions", id],
    queryFn: () => listeningQuestionApi.getAllListeningItemQuestionsById(id),
    enabled: !!id,
  });
};

//----------------------hook for get Single question by listening Item id --------------------

export const useGetSingleListeningQuestionById = (id) => {
  return useQuery({
    queryKey: ["listeningQuestions", id],
    queryFn: () => listeningQuestionApi.getSingleListeningQuestion(id),
    enabled: !!id,
  });
};

//----------------------hook for create new question ---------------------------

export const useCreateListeningQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => listeningQuestionApi.createListeningQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["listeningQuestions"]);
    },
    onError: (error) => {
      console.log("Error occur to create listening question", error);
    },
  });
}

//----------------------hook for update question by Id ---------------------------

export const useUpdateListeningQuestionById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      listeningQuestionApi.updateListeningQuestionById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["listeningQuestions"]);
    },
    onError: (error) => {
      console.log("Error occur to update listening question", error);
    },
  });
};

//---------------------hook for update question status by Id ---------------------------

export const useUpdateListeningQuestionStatusById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      listeningQuestionApi.updateListeningQuestionStatusById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["listeningQuestions"]);
    },
    onError: (error) => {
      console.log("Error occur to update listening question", error);
    },
  });
};

//---------------------hook for delete question by Id ---------------------------

export const useDeleteListeningQuestionById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => listeningQuestionApi.deleteListeningQuestionById(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listeningQuestions"]);
    },
    onError: (error) => {
      console.log("Error occur to delete listening question", error);
    },
  });
};
