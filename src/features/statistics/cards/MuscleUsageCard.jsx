import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import useMuscleUsageInSeries from "hooks/BodyMeasurements/useMuscleUsage";
import { Box } from "@mui/material";
import { useState } from "react";
import MuscleVisualizer from "features/muscleBody/MuscleVisualizer";
import useMuscleUsageInTraining from "hooks/BodyMeasurements/useMuscleUsageInTraining";

export default function MuscleUsageCard({
  userId,
  mode = "week",
  trainingId = 0,
}) {
  const [warmUp, setWarmUp] = useState(0);

  // Wywołujemy oba hooki, ale tylko jeden będzie aktywny
  const seriesQuery = useMuscleUsageInSeries(userId, 1, warmUp, {
    enabled: mode === "week",
  });

  const trainingQuery = useMuscleUsageInTraining(userId, trainingId, warmUp, {
    enabled: mode === "single",
  });

  // Wybieramy aktywny query
  const { isLoading, isError, error, data, isFetching } =
    mode === "week" ? seriesQuery : trainingQuery;

  return (
    <QueryStateHandler isLoading={isLoading} isError={isError} error={error}>
      {data ? (
        <Box sx={{ p: 0 }}>
          <MuscleVisualizer
            muscleData={data}
            warmUp={warmUp}
            onWarmUpChange={setWarmUp}
          />
          {isFetching && <small>Ładowanie...</small>}
        </Box>
      ) : (
        "Brak ćwiczeń"
      )}
    </QueryStateHandler>
  );
}
