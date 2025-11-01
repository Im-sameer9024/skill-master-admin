import { apiConnector } from "../apiConnector";
import { usersApiEndPoint } from "../apis";

const { GET_ALL_USERS,GET_USER_BY_ID } = usersApiEndPoint;

export const usersApi = {
  //------------- get all users -----------------

  getAllUsers: async () => {
    const response = await apiConnector("GET", GET_ALL_USERS);
    return response.data;
  },

  //------------- get single user -----------------
  getSingleUser :async(userId) =>{
    const response = await apiConnector(
        "GET",
        GET_USER_BY_ID(userId))
        return response.data;
  }
};
