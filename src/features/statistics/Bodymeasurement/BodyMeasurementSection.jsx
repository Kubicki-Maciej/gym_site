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

export default function BodyMeasurementSection() {
  const [field, setField] = useState("waist");
  const [dateRange, setDateRange] = useState({
    startDate: getFirstDayOfTheCurrentMonthString(),
    endDate: getLastDayOfCurrentMonthString(),
  });

  const { getSelectedUserFromLocalStorage } = useSelectedUser();
  const { data, loading, error, refetch } = useBodyMeasurements(
    getSelectedUserFromLocalStorage(),
    dateRange.startDate,
    dateRange.endDate,
  );

  return (
    <Grid container spacing={2} p={1}>
      <Grid size={{ xs: 12, sm: 1 }} paddingRight={1}>
        <MeasurementSelectButtons value={field} onChange={setField} />
        {/* <MeasurementSelect
          value={field}
          label={"Parametr"}
          onChange={e => setField(e.target.value)}
        /> */}
      </Grid>
      <Grid size={{ xs: 12, sm: 11 }} paddingLeft={4}>
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
