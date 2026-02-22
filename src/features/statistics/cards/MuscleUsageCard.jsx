import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import useMuscleUsageInSeries from "hooks/BodyMeasurements/useMuscleUsage";
import { Box } from "@mui/material";
import { useState } from "react";
import MuscleVisualizer from "features/muscleBody/MuscleVisualizer";

export default function MuscleUsageCard({ userId }) {
  const [warmUp, setWarmUp] = useState(false);
  const { isLoading, isError, error, data } = useMuscleUsageInSeries(
    userId,
    1,
    warmUp,
  );

  return (
    <QueryStateHandler isLoading={isLoading} isError={isError} error={error}>
      {data ? (
        <Box sx={{ p: 0 }}>
          <MuscleVisualizer
            muscleData={data}
            warmUp={warmUp}
            onWarmUpChange={setWarmUp}
          />
        </Box>
      ) : (
        "Brak ćwiczeń"
      )}
    </QueryStateHandler>
  );
}
