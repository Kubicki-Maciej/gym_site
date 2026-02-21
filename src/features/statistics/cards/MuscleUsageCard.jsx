import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import useMuscleUsageInSeries from "hooks/BodyMeasurements/useMuscleUsage";
import { Grid, Typography, Box } from "@mui/material";
import CardMuscle from "components/Cards/CardMuscle";

export default function MuscleUsageCard({ userId }) {
  const { isLoading, isError, error, data } = useMuscleUsageInSeries(userId, 1);

  return (
    <QueryStateHandler isLoading={isLoading} isError={isError} error={error}>
      {data ? (
        <Box sx={{ p: 1 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Grupy mięśniowe
          </Typography>
          <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
            {data.map(muscle => (
              <Grid
                item
                size={{ xs: 6, md: 4, lg: 3 }}
                key={muscle.id}
                sx={{ display: "flex" }}
              >
                <CardMuscle muscle={muscle} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        "brat ćwiczeń"
      )}
    </QueryStateHandler>
  );
}
