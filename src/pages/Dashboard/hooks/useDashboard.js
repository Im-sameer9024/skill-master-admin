import { dashboardApis } from "@/services/operations/dashboardApi";
import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardApis.getDashboardData(),
  });
};
