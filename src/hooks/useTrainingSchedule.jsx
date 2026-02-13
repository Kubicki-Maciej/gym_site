// src/hooks/useTrainingSchedule.js
import { useEffect, useState } from "react";
import {
  formatTime,
  parseTimeString,
  generateDatesFromSelectedDays,
  toDjangoISO,
} from "../utils/scheduleUtils";

export function useTrainingSchedule({ onChange, setTrainigType } = {}) {
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
      prev.map(d => (d.day === dayValue ? { ...d, time: formatted } : d)),
    );
  };

  const handleCyclicDurationChange = (dayValue, newDuration) => {
    setSelectedDays(prev =>
      prev.map(d => (d.day === dayValue ? { ...d, duration: newDuration } : d)),
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
        Number(cycles),
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

  return {
    eventType,
    selectedDays,
    cycles,
    singleDate,
    singleTime,
    singleDuration,
    validationError,

    setEventType,
    setCycles,
    setSingleDate,
    setSingleDuration,
    setSelectedDays,
    handleDayToggle,
    handleCyclicTimeChange,
    handleCyclicDurationChange,
    handleSingleTimeChange,
  };
}
