import { apiConnector } from "../apiConnector";
import { categoryApiEndPoint } from "../apis";

const {
  GET_ALL_CATEGORIES,
  GET_CATEGORY_BY_ID,
  CREATE_CATEGORY,
  UPDATE_CATEGORY_BY_ID,
} = categoryApiEndPoint;

export const categoryApis = {
  //------------------ get all categories ------------------

  getAllCategories: async () => {
    const response = await apiConnector("GET", GET_ALL_CATEGORIES);
    return response.data;
  },

  //------------------ get category by id ------------------

  getCategoryById: async (id) => {
    const response = await apiConnector("GET", GET_CATEGORY_BY_ID(id));
    return response.data;
  },

  //------------------ create category ------------------

  createCategory: async (data) => {
    const response = await apiConnector("POST", CREATE_CATEGORY, data);
    return response.data;
  },

  //------------------ update category by id ------------------

  updateCategoryById: async (id, data) => {
    const response = await apiConnector("PUT", UPDATE_CATEGORY_BY_ID(id), data);
    return response.data;
  },
};
