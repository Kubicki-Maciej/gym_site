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

export function useLookupProductByEan(ean) {
  const cleanEan = String(ean ?? "").replace(/\D/g, "");

  return useQuery({
    queryKey: ["products", "lookup-ean", cleanEan],
    queryFn: () => fitappApi.lookupProductByEan(cleanEan),
    enabled: cleanEan.length === 13,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
