// src/components/trainingSchedule/SingleEventForm.jsx
import React from "react";
import { Box, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// import { parseTimeString } from "../../utils/scheduleUtils";
import { parseTimeString } from "../../utils/scheduleUtils";

export default function SingleEventForm({
  isMobile,
  singleDate,
  singleTime,
  singleDuration,
  onDateChange,
  onTimeChange,
  onDurationChange,
}) {
  return (
    <Box sx={{ mt: 2 }}>
      <Box
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
        <Box sx={{ minWidth: 120, fontWeight: "bold" }}>Data</Box>
        <DatePicker
          label="Data wydarzenia"
          value={singleDate}
          onChange={onDateChange}
          minDate={new Date()}
          renderInput={params => (
            <TextField {...params} size="small" fullWidth={isMobile} />
          )}
        />
        <TimePicker
          label="Godzina rozpoczęcia"
          value={singleTime ? parseTimeString(singleTime) : null}
          onChange={onTimeChange}
          ampm={false}
          minutesStep={5}
          renderInput={params => (
            <TextField {...params} size="small" fullWidth={isMobile} />
          )}
        />
        <TextField
          label="Czas trwania (minuty)"
          type="number"
          value={singleDuration}
          onChange={e => onDurationChange(e.target.value)}
          size="small"
          sx={{ width: isMobile ? "100%" : 160 }}
        />
      </Box>
    </Box>
  );
}
