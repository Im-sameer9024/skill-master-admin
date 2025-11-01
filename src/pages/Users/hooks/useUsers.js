import { usersApi } from "@/services/operations/usersApi";
import { useQuery } from "@tanstack/react-query";



export const useGetAllUsers = (page,limit) =>{
    return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () =>usersApi.getAllUsers({ page, limit }),
    keepPreviousData: true,
  });

}

export const useGetSingleUser = (userId) =>{
    return useQuery({
        queryKey:["user",userId],
        queryFn:() => usersApi.getSingleUser(userId),
        enabled: !!userId, //only run if userId exists

    })

}