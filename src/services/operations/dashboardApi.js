import { apiConnector } from "../apiConnector";
import { dashboardApiEndPoint } from "../apis";

const { GET_DASHBOARD_DATA } = dashboardApiEndPoint;

export const dashboardApis = {
  getDashboardData: async () => {
    const response = await apiConnector("GET", GET_DASHBOARD_DATA);
    return response.data;
  },
};
