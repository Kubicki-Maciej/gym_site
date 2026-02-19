import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { pl } from "date-fns/locale";
import { formatDate } from "utils/scheduleUtils";
import StudentSelector from "features/students/components/StudentSelector";

export default function ModalCalendarEvent({
  open,
  onClose,
  initialDate,
  onSave,
}) {
  const [timeValue, setTimeValue] = useState(null);
  const [duration, setDuration] = useState(60);
  const [isOneTime, setIsOneTime] = useState(true);
  const [repeatCount, setRepeatCount] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userError, setUserError] = useState(false);

  // ✅ FIX: bez isoToDate
  useEffect(() => {
    if (open && initialDate instanceof Date) {
      setTimeValue(initialDate);
      setDuration(60);
      setIsOneTime(true);
      setRepeatCount("");
      setSelectedUser(null);
      setUserError(false);
    }
  }, [open, initialDate]);

  const handleSave = () => {
    if (!selectedUser) {
      setUserError(true);
      return;
    }
    if (!timeValue) return;

    const hours = timeValue.getHours().toString().padStart(2, "0");
    const minutes = timeValue.getMinutes().toString().padStart(2, "0");

    onSave({
      date: initialDate, // Date
      time: `${hours}:${minutes}`,
      duration,
      isOneTime,
      repeatCount: isOneTime ? 0 : Number(repeatCount) || 0,
      user: selectedUser,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={pl}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Nowe wydarzenie</DialogTitle>

        <DialogContent dividers>
          {initialDate && (
            <Box mb={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Wybrana data:
              </Typography>
              <Typography variant="body1">
                <strong>{formatDate(initialDate)}</strong>
              </Typography>
            </Box>
          )}

          <Box mb={2}>
            <TimePicker
              label="Godzina"
              value={timeValue}
              onChange={setTimeValue}
              ampm={false}
              minutesStep={5}
              renderInput={params => <TextField {...params} fullWidth />}
            />

            <TextField
              label="Czas trwania (min)"
              type="number"
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={isOneTime}
                onChange={e => setIsOneTime(e.target.checked)}
              />
            }
            label="Jednorazowe wydarzenie"
          />

          {!isOneTime && (
            <TextField
              label="Liczba tygodni"
              type="number"
              value={repeatCount}
              onChange={e => setRepeatCount(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
          )}

          <Box mt={2}>
            <StudentSelector
              setSelectedUser={setSelectedUser}
              error={userError}
              onSelect={() => setUserError(false)}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Anuluj</Button>
          <Button variant="contained" onClick={handleSave}>
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
