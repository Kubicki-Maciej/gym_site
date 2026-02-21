import { useQuery } from "@tanstack/react-query";

import { statisticApi } from "features/statistics/api/statisticApi";

import React from "react";

export default function useMuscleUsage(userId, week) {
  return useQuery({
    queryKey: ["user-muscle-usage", userId, week],
    queryFn: () => statisticApi.getUserMuscleUsageWeek(userId, week),
  });
}
