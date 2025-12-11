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
  Alert,
} from "@mui/material";
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { pl } from "date-fns/locale";

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
  return date.toISOString();
}

function generateDatesFromSelectedDays(selectedDays, cycles) {
  const results = [];
  const now = new Date();
  const todayJsDay = now.getDay();

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

const weekDays = [
  { label: "Poniedziałek", value: 0 },
  { label: "Wtorek", value: 1 },
  { label: "Środa", value: 2 },
  { label: "Czwartek", value: 3 },
  { label: "Piątek", value: 4 },
  { label: "Sobota", value: 5 },
  { label: "Niedziela", value: 6 },
];

// -------------------- Małe komponenty prezentacyjne --------------------

function ScheduleTypeSelector({ value, onChange }) {
  return (
    <FormControl>
      <FormLabel>Typ wydarzenia</FormLabel>
      <RadioGroup row value={value} onChange={e => onChange(e.target.value)}>
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
  );
}

function CyclicScheduleForm({
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
                <Box sx={{ minWidth: 120, fontWeight: "bold" }}>{dayLabel}</Box>
                <TimePicker
                  label="Godzina rozpoczęcia"
                  value={time ? parseTimeString(time) : null}
                  onChange={newTime => onTimeChange(day, newTime)}
                  ampm={false}
                  minutesStep={5}
                  renderInput={params => <TextField {...params} size="small" />}
                />
                <TextField
                  label="Czas trwania (minuty)"
                  type="number"
                  value={duration}
                  onChange={e => onDurationChange(day, e.target.value)}
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
        onChange={e => onCyclesChange(e.target.value)}
        sx={{ mt: 2 }}
      />

      {validationError && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {validationError}
        </Alert>
      )}
    </Box>
  );
}

function SingleEventForm({
  singleDate,
  singleTime,
  singleDuration,
  onDateChange,
  onTimeChange,
  onDurationChange,
}) {
  return (
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
            onChange={onDateChange}
            minDate={new Date()}
            renderInput={params => <TextField {...params} size="small" />}
          />
          <TimePicker
            label="Godzina rozpoczęcia"
            value={singleTime ? parseTimeString(singleTime) : null}
            onChange={onTimeChange}
            ampm={false}
            minutesStep={5}
            renderInput={params => <TextField {...params} size="small" />}
          />
          <TextField
            label="Czas trwania (minuty)"
            type="number"
            value={singleDuration}
            onChange={e => onDurationChange(e.target.value)}
            size="small"
            sx={{ width: 160 }}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

// -------------------- Główny komponent (logika) --------------------

export default function TrainingSchedulePicker({ onChange, setTrainigType }) {
  const [eventType, setEventType] = useState("cykliczne");
  const [selectedDays, setSelectedDays] = useState([]);
  const [cycles, setCycles] = useState(1);
  const [singleDate, setSingleDate] = useState(null);
  const [singleTime, setSingleTime] = useState("");
  const [singleDuration, setSingleDuration] = useState("60");
  const [validationError, setValidationError] = useState("");

  const handleDayToggle = dayValue => {
    setSelectedDays(prev => {
      const exists = prev.find(d => d.day === dayValue);
      if (exists) {
        return prev.filter(d => d.day !== dayValue);
      }
      return [...prev, { day: dayValue, time: "", duration: "60" }];
    });
  };

  const handleCyclicTimeChange = (dayValue, newTimeDate) => {
    const formatted = formatTime(newTimeDate);
    setSelectedDays(prev =>
      prev.map(d => (d.day === dayValue ? { ...d, time: formatted } : d))
    );
  };

  const handleCyclicDurationChange = (dayValue, newDuration) => {
    setSelectedDays(prev =>
      prev.map(d => (d.day === dayValue ? { ...d, duration: newDuration } : d))
    );
  };

  const handleSingleTimeChange = newTimeDate => {
    setSingleTime(formatTime(newTimeDate));
  };

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

      const dateTime =
        singleDate && singleTime
          ? (() => {
              const parsed = parseTimeString(singleTime);
              const combined = new Date(singleDate);
              combined.setHours(parsed.getHours(), parsed.getMinutes(), 0, 0);
              return combined;
            })()
          : null;

      const events = dateTime
        ? [
            {
              date: toDjangoISO(dateTime),
              duration: singleDuration,
            },
          ]
        : [];

      onChange?.({
        type: "jednorazowe",
        events,
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

  return (
    <Box sx={{ mb: 2 }}>
      <ScheduleTypeSelector value={eventType} onChange={setEventType} />

      {eventType === "cykliczne" ? (
        <CyclicScheduleForm
          selectedDays={selectedDays}
          cycles={cycles}
          validationError={validationError}
          onDayToggle={handleDayToggle}
          onTimeChange={handleCyclicTimeChange}
          onDurationChange={handleCyclicDurationChange}
          onCyclesChange={setCycles}
        />
      ) : (
        <SingleEventForm
          singleDate={singleDate}
          singleTime={singleTime}
          singleDuration={singleDuration}
          onDateChange={setSingleDate}
          onTimeChange={handleSingleTimeChange}
          onDurationChange={setSingleDuration}
        />
      )}
    </Box>
  );
}
