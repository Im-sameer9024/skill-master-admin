import { apiConnector } from "../apiConnector";
import { blogApiEndPoint } from "../apis";

const { GET_ALL_BLOGS, GET_BLOG_BY_ID, CREATE_BLOG, DELETE_BLOG_BY_ID } =
  blogApiEndPoint;

export const blogApi = {
  //------------------- for get all blogs-------------------------

  getBlogs: async (params = {}) => {
    const response = await apiConnector(
      "GET",
      GET_ALL_BLOGS,
      null,
      null,
      params
    );
    return response.data;
  },

  //--------------------for get single blog-------------------------

  getSingleBlog: async (data) => {
    const response = await apiConnector(
      "POST",
      GET_BLOG_BY_ID,
      data,
      null,
      null
    );

    return response.data;
  },

  //--------------------for Create blog-------------------------

  createBlog: async (data) => {
    const response = await apiConnector("POST", CREATE_BLOG, data);
    return response.data;
  },

  //--------------------for Delete blog-------------------------

  deleteBlog: async (data) => {
    const response = await apiConnector("POST", DELETE_BLOG_BY_ID, data);
    return response.data;
  },

  updateBlog: async (data) => {
    const response = await apiConnector(
      "POST",
      blogApiEndPoint.UPDATE_BLOG_BY_ID,
      data
    );
    return response.data;
  },
};
