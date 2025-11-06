import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
  FormGroup,
  Typography,
  Alert,
} from "@mui/material";
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pl } from "date-fns/locale";

// -------------------- Pomocnicze funkcje --------------------

function formatTime(date) {
  if (!date) return "";
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function parseTimeString(timeString) {
  if (!timeString) return null;
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function parseHHMM(timeString) {
  if (!timeString) return null;
  const [hh, mm] = timeString.split(":").map(Number);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  return { hours: hh, minutes: mm };
}

function toDjangoISO(date) {
  return date.toISOString(); // ISO 8601 — zgodne z Django
}

// -------------------- Generator dat cyklicznych --------------------

function generateDatesFromSelectedDays(selectedDays, cycles) {
  const results = [];
  const now = new Date();
  const todayJsDay = now.getDay(); // niedziela=0

  const toJsWeekday = dayValue => (dayValue + 1) % 7;

  selectedDays.forEach(({ day, time = "", duration }) => {
    const targetJsDay = toJsWeekday(day);
    let diff = (targetJsDay - todayJsDay + 7) % 7;
    let firstDate = addDays(now, diff);

    const hm = parseHHMM(time);
    if (diff === 0 && hm) {
      const candidate = new Date(firstDate);
      candidate.setHours(hm.hours, hm.minutes, 0, 0);
      if (candidate <= now) {
        firstDate = addDays(firstDate, 7);
      }
    }

    for (let i = 0; i < cycles; i++) {
      const occDate = addDays(firstDate, i * 7);
      const eventDate = new Date(occDate);
      if (hm) eventDate.setHours(hm.hours, hm.minutes, 0, 0);
      results.push({
        date: toDjangoISO(eventDate),
        duration: duration ?? "",
      });
    }
  });

  results.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  return results;
}

// -------------------- Dni tygodnia --------------------

const weekDays = [
  { label: "Poniedziałek", value: 0 },
  { label: "Wtorek", value: 1 },
  { label: "Środa", value: 2 },
  { label: "Czwartek", value: 3 },
  { label: "Piątek", value: 4 },
  { label: "Sobota", value: 5 },
  { label: "Niedziela", value: 6 },
];

// -------------------- Główny komponent --------------------

export default function EventTypeSelector({ onChange, setTrainigType }) {
  const [eventType, setEventType] = useState("cykliczne");
  const [selectedDays, setSelectedDays] = useState([]);
  const [cycles, setCycles] = useState(1);
  const [singleDate, setSingleDate] = useState(null);
  const [singleTime, setSingleTime] = useState("");
  const [singleDuration, setSingleDuration] = useState("60");
  const [validationError, setValidationError] = useState("");

  // -------------------- Obsługa cyklicznego --------------------

  const handleDayChange = dayValue => {
    setSelectedDays(prev => {
      const exists = prev.find(d => d.day === dayValue);
      if (exists) {
        return prev.filter(d => d.day !== dayValue);
      } else {
        return [...prev, { day: dayValue, time: "", duration: "60" }];
      }
    });
  };

  const handleTimeChange = (dayValue, newTimeDate) => {
    const formatted = formatTime(newTimeDate);
    setSelectedDays(prev =>
      prev.map(d => (d.day === dayValue ? { ...d, time: formatted } : d))
    );
  };

  const handleDurationChange = (dayValue, newDuration) => {
    setSelectedDays(prev =>
      prev.map(d => (d.day === dayValue ? { ...d, duration: newDuration } : d))
    );
  };

  const handleSingleTimeChange = newTimeDate => {
    setSingleTime(formatTime(newTimeDate));
  };

  // -------------------- Walidacja i efekt --------------------

  useEffect(() => {
    if (eventType === "cykliczne") {
      if (selectedDays.length === 0) {
        setValidationError("Wybierz co najmniej jeden dzień tygodnia.");
        onChange?.(null);
        return;
      }
      if (Number(cycles) < 1) {
        setValidationError("Liczba tygodni musi być większa niż 0.");
        onChange?.(null);
        return;
      }
      if (selectedDays.some(d => !d.time)) {
        setValidationError("Ustaw godzinę rozpoczęcia dla każdego dnia.");
        onChange?.(null);
        return;
      }

      setValidationError("");
      setTrainigType?.("cycle");
      const events = generateDatesFromSelectedDays(
        selectedDays,
        Number(cycles)
      );

      onChange?.({
        type: "cykliczne",
        events,
      });
    } else {
      setTrainigType?.("single");
      setValidationError("");
      onChange?.({
        type: "jednorazowe",
        date: singleDate ? singleDate.toISOString() : null,
        time: singleTime,
        duration: singleDuration,
      });
    }
  }, [
    eventType,
    selectedDays,
    cycles,
    singleDate,
    singleTime,
    singleDuration,
    onChange,
    setTrainigType,
  ]);

  // -------------------- Render --------------------

  return (
    <Box sx={{ mb: 2 }}>
      <FormControl>
        <FormLabel>Typ wydarzenia</FormLabel>
        <RadioGroup
          row
          value={eventType}
          onChange={e => setEventType(e.target.value)}
        >
          <FormControlLabel
            value="cykliczne"
            control={<Radio />}
            label="Cykliczne"
          />
          <FormControlLabel
            value="jednorazowe"
            control={<Radio />}
            label="Jednorazowe"
          />
        </RadioGroup>
      </FormControl>

      {/* -------------------- CYKLICZNE -------------------- */}
      {eventType === "cykliczne" && (
        <Box sx={{ mt: 2 }}>
          <FormLabel>Wybierz dni tygodnia</FormLabel>
          <FormGroup row>
            {weekDays.map(day => (
              <FormControlLabel
                key={day.value}
                control={
                  <Checkbox
                    checked={selectedDays.some(d => d.day === day.value)}
                    onChange={() => handleDayChange(day.value)}
                  />
                }
                label={day.label}
              />
            ))}
          </FormGroup>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            {selectedDays
              .sort((a, b) => a.day - b.day)
              .map(({ day, time, duration = 60 }) => {
                const dayLabel = weekDays.find(d => d.value === day)?.label;
                return (
                  <Box
                    key={day}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mt: 2,
                      mb: 1,
                      p: 1,
                      border: "1px solid #eee",
                      borderRadius: 1,
                    }}
                  >
                    <Box sx={{ minWidth: 120, fontWeight: "bold" }}>
                      {dayLabel}
                    </Box>
                    <TimePicker
                      label="Godzina rozpoczęcia"
                      value={time ? parseTimeString(time) : null}
                      onChange={newTime => handleTimeChange(day, newTime)}
                      ampm={false}
                      minutesStep={5}
                      renderInput={params => (
                        <TextField {...params} size="small" />
                      )}
                    />
                    <TextField
                      label="Czas trwania (minuty)"
                      type="number"
                      value={duration}
                      onChange={e => handleDurationChange(day, e.target.value)}
                      size="small"
                      sx={{ width: 160 }}
                    />
                  </Box>
                );
              })}
          </LocalizationProvider>

          <TextField
            label="Ilość tygodni"
            type="number"
            value={cycles}
            onChange={e => setCycles(e.target.value)}
            sx={{ mt: 2 }}
          />

          {validationError && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              {validationError}
            </Alert>
          )}
        </Box>
      )}

      {/* -------------------- JEDNORAZOWE -------------------- */}
      {eventType === "jednorazowe" && (
        <Box sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
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
                onChange={setSingleDate}
                minDate={new Date()}
                renderInput={params => <TextField {...params} size="small" />}
              />
              <TimePicker
                label="Godzina rozpoczęcia"
                value={singleTime ? parseTimeString(singleTime) : null}
                onChange={handleSingleTimeChange}
                ampm={false}
                minutesStep={5}
                renderInput={params => <TextField {...params} size="small" />}
              />
              <TextField
                label="Czas trwania (minuty)"
                type="number"
                value={singleDuration}
                onChange={e => setSingleDuration(e.target.value)}
                size="small"
                sx={{ width: 160 }}
              />
            </Box>
          </LocalizationProvider>
        </Box>
      )}
    </Box>
  );
}
