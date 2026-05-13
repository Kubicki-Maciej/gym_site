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

export function useDiaryEntries(payload) {
  console.log(payload);
  const startDate = payload?.start_date;
  const endDate = payload?.end_date;
  return useQuery({
    queryKey: ["diaryEntries"],
    // queryKey: ["diaryEntries", startDate, endDate],
    // queryFn: fitappApi.getDiaryEntries,
    queryFn: () =>
      fitappApi.getDiaryEntries({
        start_date: startDate,
        end_date: endDate,
      }),
    enabled: !!startDate && !!endDate,
  });
}
