import { useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import { useBodyMeasurements } from "hooks/BodyMeasurements/useBodyMeasurements";
import BodyMeasurementForm from "features/statistics/Bodymeasurement/BodyMeasurementForm";
import BodyMeasurementChart from "features/statistics/charts/BodyMeasurementChart";
import BodyMeasurementControls from "features/statistics/Bodymeasurement/BodyMeasurementControls";
import {
  getFirstDayOfTheCurrentMonthString,
  getLastDayOfCurrentMonthString,
} from "components/Date/DateCurrentMonth";
import useSelectedUser from "hooks/useSelectedUser";

export default function BodyStatsPage() {
  const { getSelectedUserFromLocalStorage } = useSelectedUser();

  const [dateRange, setDateRange] = useState({
    startDate: getFirstDayOfTheCurrentMonthString(),
    endDate: getLastDayOfCurrentMonthString(),
  });

  const [field, setField] = useState("waist");

  const { data, loading, error, refetch } = useBodyMeasurements(
    getSelectedUserFromLocalStorage(),
    dateRange.startDate,
    dateRange.endDate,
  );

  return (
    <Container maxWidth="lg">
      <BodyMeasurementForm
        onSaved={refetch}
        userId={getSelectedUserFromLocalStorage()}
      />
      <BodyMeasurementControls
        field={field}
        setField={setField}
        initialStart={dateRange.startDate}
        initialEnd={dateRange.endDate}
        onChange={(start, end) => {
          setDateRange({ startDate: start, endDate: end });
        }}
      />

      {error && <p>Błąd ładowania danych</p>}

      {!loading && !error && (
        <BodyMeasurementChart
          data={data}
          field={field}
          label={`Postęp – ${field}`}
        />
      )}
    </Container>
  );
}
