import { useState } from "react";
import { Container, Box, Tab, Tabs } from "@mui/material";
import { useBodyMeasurements } from "hooks/BodyMeasurements/useBodyMeasurements";
import BodyMeasurementForm from "features/statistics/Bodymeasurement/BodyMeasurementForm";
import BodyMeasurementChart from "features/statistics/charts/BodyMeasurementChart";
import BodyMeasurementControls from "features/statistics/Bodymeasurement/BodyMeasurementControls";
import {
  getFirstDayOfTheCurrentMonthString,
  getLastDayOfCurrentMonthString,
} from "components/Date/DateCurrentMonth";
import useSelectedUser from "hooks/useSelectedUser";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function BodyStatsPage() {
  const { getSelectedUserFromLocalStorage } = useSelectedUser();
  const [tabValue, setTabValue] = useState(0);

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
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        centered={false}
        sx={{ mb: 2 }}
      >
        <Tab label="Dodaj pomiar" />
        <Tab label="Analiza" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <BodyMeasurementForm
          onSaved={refetch}
          userId={getSelectedUserFromLocalStorage()}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
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
      </TabPanel>
    </Container>
  );
}
