// src/components/trainingSchedule/CyclicScheduleForm.jsx
import React from "react";
import {
  Box,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Alert,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { parseTimeString, weekDays } from "../../utils/scheduleUtils";

export default function CyclicScheduleForm({
  isMobile,
  selectedDays,
  cycles,
  validationError,
  onDayToggle,
  onTimeChange,
  onDurationChange,
  onCyclesChange,
}) {
  return (
    <Box sx={{ mt: 2 }}>
      <FormLabel>Wybierz dni tygodnia</FormLabel>
      <FormGroup row>
        {weekDays.map(day => (
          <FormControlLabel
            key={day.value}
            control={
              <Checkbox
                checked={selectedDays.some(d => d.day === day.value)}
                onChange={() => onDayToggle(day.value)}
              />
            }
            label={day.label}
          />
        ))}
      </FormGroup>

      {selectedDays
        .slice()
        .sort((a, b) => a.day - b.day)
        .map(({ day, time, duration = 60 }) => {
          const dayLabel = weekDays.find(d => d.value === day)?.label;
          return (
            <Box
              key={day}
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                gap: 2,
                mt: 2,
                mb: 1,
                p: 1,
                border: "1px solid #eee",
                borderRadius: 1,
              }}
            >
              <Box sx={{ minWidth: 120, fontWeight: "bold" }}>{dayLabel}</Box>
              <TimePicker
                label="Godzina rozpoczęcia"
                value={time ? parseTimeString(time) : null}
                onChange={newTime => onTimeChange(day, newTime)}
                ampm={false}
                minutesStep={5}
                renderInput={params => (
                  <TextField {...params} size="small" fullWidth={isMobile} />
                )}
              />
              <TextField
                label="Czas trwania (minuty)"
                type="number"
                value={duration}
                onChange={e => onDurationChange(day, e.target.value)}
                size="small"
                sx={{ width: isMobile ? "100%" : 160 }}
              />
            </Box>
          );
        })}

      <TextField
        label="Ilość tygodni"
        type="number"
        value={cycles}
        onChange={e => onCyclesChange(e.target.value)}
        sx={{ mt: 2, maxWidth: isMobile ? "100%" : 200 }}
      />

      {validationError && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {validationError}
        </Alert>
      )}
    </Box>
  );
}
