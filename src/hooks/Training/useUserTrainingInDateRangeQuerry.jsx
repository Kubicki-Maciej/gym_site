import { useQuery } from "@tanstack/react-query";
import { trainingApi } from "../../api/trainingApi";

export default function useUserTrainingsInDateRangeQuery(
  userId,
  payload,
  options = {},
) {
  const startDate = payload?.start_date;
  const endDate = payload?.end_date;

  return useQuery({
    queryKey: ["user-trainings-in-date-range", userId, startDate, endDate],
    queryFn: () => trainingApi.userTrainingsInDateRange(userId, payload),
    enabled: !!userId && !!startDate && !!endDate,
    ...options,
  });
}
