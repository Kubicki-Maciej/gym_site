// src/components/BodyMeasurementControls.jsx
import { Paper, Grid, TextField } from "@mui/material";
import { useDateRange } from "features/dateRange/useDateRange";
import MeasurementSelect from "components/Statistic/MeasurementSelect";

export default function BodyMeasurementControls({
  field,
  setField,
  initialStart,
  initialEnd,
  setFilters,
  onChange,
}) {
  const { startDate, endDate, onStartDateChange, onEndDateChange } =
    useDateRange(initialStart, initialEnd);

  // Wywołanie callbacku przy każdej zmianie zakresu
  // np. w parent component aktualizujesz state
  const handleStartChange = e => {
    onStartDateChange(e.target.value);
    if (onChange) onChange(e.target.value, endDate);
  };

  const handleEndChange = e => {
    onEndDateChange(e.target.value);
    if (onChange) onChange(startDate, e.target.value);
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MeasurementSelect
            value={field}
            label={"Parametr"}
            onChange={e => setField(e.target.value)}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <TextField
            label="Od"
            type="date"
            value={startDate}
            fullWidth
            onChange={handleStartChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <TextField
            label="Do"
            type="date"
            value={endDate}
            fullWidth
            onChange={handleEndChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
