import { useQuery } from "@tanstack/react-query";
import { fitappApi } from "api/fitappApi";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fitappApi.getProducts,
  });
}
export function useMeals() {
  return useQuery({
    queryKey: ["meals"],
    queryFn: fitappApi.getMeals,
  });
}
export function useDiaryEntries() {
  return useQuery({
    queryKey: ["diaryEntries"],
    queryFn: fitappApi.getDiaryEntries,
  });
}
