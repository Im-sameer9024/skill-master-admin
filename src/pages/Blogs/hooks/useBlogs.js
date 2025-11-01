import { blogApi } from "@/services/operations/blogApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllBlogs = (page, limit) => {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => blogApi.getBlogs({ page, limit }),
    keepPreviousData: true,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => blogApi.createBlog(data),

    onSuccess: (data) => {
      // invalidate and refetch blogs queries to update
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log("data is here", data);
    },
    onError: (error) => {
      console.error("Error creating blog", error);
    },
  });
};

export const useGetSingleBlog = (data) => {
  return useQuery({
    queryKey: ["blogs", data],
    queryFn: () => blogApi.getSingleBlog(data),
    enabled: !!data,
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => blogApi.deleteBlog(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log("Blog deleted successfully", data);
    },
    onError: (error) => {
      console.error("Error creating blog", error);
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => blogApi.updateBlog(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log("Blog updated successfully", data);
    },

    onError: (error) => {
      console.error("Error updating blog", error);
    },
  });
};
