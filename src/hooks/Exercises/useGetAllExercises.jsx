import { useQuery } from "@tanstack/react-query";
import { exerciseApi } from "api/exerciseApi";

export const useGetAllExercises = () => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const data = await exerciseApi.getAllExercises();
      return data;
    },
  });
};
