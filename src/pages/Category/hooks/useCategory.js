import { categoryApis } from "@/services/operations/categoryApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//-------------------------------get All categories -----------------------
export const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApis.getAllCategories(),
  });
};

//------------------------------get category by id -----------------------
export const useCategoryById = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryApis.getCategoryById(id),
    enabled: !!id, //only run the query if id is provided
  });
};

//-------------------------------create category -----------------------

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => categoryApis.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      console.log("Error occur in create category", error);
    },
  });
};

//-------------------------------update category -----------------------

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => categoryApis.updateCategoryById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      console.log("Error occur in update category", error);
    },
  });
};
