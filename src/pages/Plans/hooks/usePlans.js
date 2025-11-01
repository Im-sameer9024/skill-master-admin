import { plansApis } from "@/services/operations/plansApi";
import { useQuery } from "@tanstack/react-query";

const { getAllPlans, getPlanById } = plansApis;

export const useGetAllPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getAllPlans,
  });
};

export const useGetSinglePlan = (id) => {
  return useQuery({
    queryKey: ["plans", id],
    queryFn: () => getPlanById(id),
    enabled: !!id, // only run the query if id is truthy
  });
};
