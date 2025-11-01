// services/operations/cmsApi.js
import { apiConnector } from "../apiConnector";
import { cmsApiEndPoint } from "../apis";

const {
  GET_ABOUT_US,
  UPDATE_CMS,
  GET_TERM_CONDITION,
  GET_PRIVACY_POLICY,
  GET_FAQ,
} = cmsApiEndPoint;

export const cmsApis = {
  //------------- get data for about us page -----------------
  getAboutUs: async () => {
    const response = await apiConnector("GET", GET_ABOUT_US);
    return response.data;
  },

  //------------------get data for term and condition page -----------------
  getTermCondition: async () => {
    const response = await apiConnector("GET", GET_TERM_CONDITION);
    return response.data;
  },

  //------------------get data for privacy policy page -----------------
  getPrivacyPolicy: async () => {
    const response = await apiConnector("GET", GET_PRIVACY_POLICY);
    return response.data;
  },

  //------------------get data for faq page -----------------
  getFaqData: async () => {
    const response = await apiConnector("GET", GET_FAQ);
    return response.data;
  },

  //-------------update cms --------------------------
  updateCms: async (data) => {
    const response = await apiConnector("POST", UPDATE_CMS, data);
    return response.data;
  },
};
