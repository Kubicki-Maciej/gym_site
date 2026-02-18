import React from "react";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import {
  getFirstDayOfTheCurrentMonthString,
  getLastDayOfCurrentMonthString,
} from "components/Date/DateCurrentMonth";
import useSelectedUser from "hooks/useSelectedUser";
import { useBodyMeasurements } from "hooks/BodyMeasurements/useBodyMeasurements";
import BodyMeasurementChart from "../charts/BodyMeasurementChart";
import MeasurementSelect from "components/Statistic/MeasurementSelect";
import MeasurementSelectButtons from "components/Statistic/MeasurementSelectButtons";

export default function BodyMeasurementSection({ userId }) {
  const [field, setField] = useState("waist");
  const [dateRange, setDateRange] = useState({
    startDate: getFirstDayOfTheCurrentMonthString(),
    endDate: getLastDayOfCurrentMonthString(),
  });

  const { getSelectedUserFromLocalStorage } = useSelectedUser();
  const { data, loading, error, refetch } = useBodyMeasurements(
    userId,
    dateRange.startDate,
    dateRange.endDate,
  );

  return (
    <Grid container spacing={2} p={1}>
      <Grid size={{ xs: 2, sm: 1 }} paddingRight={1}>
        <MeasurementSelectButtons value={field} onChange={setField} />
      </Grid>
      <Grid size={{ xs: 10, sm: 11 }} paddingLeft={2}>
        <Typography variant="body1" textAlign="center">
          {field.toUpperCase()}
        </Typography>
        <BodyMeasurementChart
          data={data}
          field={field}
          label={`Postęp - ${field}`}
        />
      </Grid>
    </Grid>
  );
}
