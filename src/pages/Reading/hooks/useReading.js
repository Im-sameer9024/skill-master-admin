




//----------------------------get all Reading ------------------------

import { useQuery } from "@tanstack/react-query"

export const useGetAllListening = () => {
    return useQuery({
        queryKey:["AllReading"]
    })
}