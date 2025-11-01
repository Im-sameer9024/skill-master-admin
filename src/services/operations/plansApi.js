import { apiConnector } from "../apiConnector";
import { plansApiEndPoint } from "../apis";

const { GET_ALL_PLANS, GET_PLAN_BY_ID } = plansApiEndPoint;



export const plansApis = {
  //------------- get all plans -----------------
  getAllPlans: async () => {
    const response = await apiConnector("GET", GET_ALL_PLANS);
    return response.data;
  },

  //------------- get plan by id -----------------
  getPlanById: async (id) => {
    const response = await apiConnector("GET", GET_PLAN_BY_ID(id));
    return response.data;
  },

  
};