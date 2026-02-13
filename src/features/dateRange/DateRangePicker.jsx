import { Box, TextField } from "@mui/material";
import { useDateRange } from "./useDateRange";

export default function DateRangePicker({
  initialStart,
  initialEnd,
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
    <Box display="flex" gap={1} mb={2}>
      <TextField
        label="Od"
        type="date"
        value={startDate}
        onChange={handleStartChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="Do"
        type="date"
        value={endDate}
        onChange={handleEndChange}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: startDate || undefined }}
        disabled={!startDate}
        fullWidth
      />
    </Box>
  );
}
