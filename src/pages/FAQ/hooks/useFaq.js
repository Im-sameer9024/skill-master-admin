// hooks/useAbout.js
import { cmsApis } from "@/services/operations/cmsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFaqData = () => {
  return useQuery({
    queryKey: ["faq"],
    queryFn: () => cmsApis.getFaqData(),
  });
};

export const useUpdateCms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateData) => cmsApis.updateCms(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });
};