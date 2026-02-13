import { useQuery } from "@tanstack/react-query";
import { exerciseApi } from "../api/exerciseApi";

export default function useUserListExerciseOption() {
  return useQuery({
    queryKey: ["user-list-exercise-option"],
    queryFn: () => exerciseApi.getUserListExerciseOption(),
    // enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
}
