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

    onSuccess: () => {
      // invalidate and refetch blogs queries to update
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Error creating blog", error);
    },
  });
};

export const useGetSingleBlog = (data) => {
  return useQuery({
    queryKey: ["blogs", data.blog_id],
    queryFn: () => blogApi.getSingleBlog(data),
    enabled: !!data,
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => blogApi.deleteBlog(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blogs",data.blog_id] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
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
      queryClient.invalidateQueries({ queryKey: ["blogs", data.blog_id] });
    },

    onError: (error) => {
      console.error("Error updating blog", error);
    },
  });
};
