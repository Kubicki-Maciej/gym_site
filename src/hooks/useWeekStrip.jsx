// useWeekStrip.js
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  toDate,
  normalizeDate,
  getStartOfWeek,
  getWeekDays,
  buildDayObject,
  buildWeekMeta,
  getMonthLabel,
  isToday,
  isSameDay,
  formatDate,
} from "../utils/weekStripUtils";

export default function useWeekStrip({
  value,
  defaultValue,
  onDateChange,
  onWeekChange,
  markedDates = [],
} = {}) {
  const initialSelectedDate = normalizeDate(
    toDate(value || defaultValue || new Date()),
  );

  const isControlled = value !== undefined;

  const [internalSelectedDate, setInternalSelectedDate] =
    useState(initialSelectedDate);

  const selectedDate = isControlled
    ? normalizeDate(toDate(value))
    : internalSelectedDate;

  useEffect(() => {
    if (!isControlled && defaultValue) {
      setInternalSelectedDate(normalizeDate(toDate(defaultValue)));
    }
  }, [defaultValue, isControlled]);

  const weekStart = useMemo(() => getStartOfWeek(selectedDate), [selectedDate]);
  const weekDaysRaw = useMemo(() => getWeekDays(weekStart), [weekStart]);

  // normalizacja listy zaznaczonych dat do Set("YYYY-MM-DD")
  const markedDatesSet = useMemo(() => {
    return new Set(
      markedDates.filter(Boolean).map(date => formatDate(new Date(date))),
    );
  }, [markedDates]);

  const days = useMemo(
    () =>
      weekDaysRaw.map(date => {
        const dayObject = buildDayObject(date, selectedDate);

        return {
          ...dayObject,
          hasTraining: markedDatesSet.has(dayObject.iso),
        };
      }),
    [weekDaysRaw, selectedDate, markedDatesSet],
  );

  const selectedDay = useMemo(() => {
    const base = buildDayObject(selectedDate, selectedDate);
    return {
      ...base,
      hasTraining: markedDatesSet.has(base.iso),
    };
  }, [selectedDate, markedDatesSet]);

  const currentDay = useMemo(() => {
    const today = normalizeDate(new Date());
    const base = buildDayObject(today, selectedDate);

    return {
      ...base,
      hasTraining: markedDatesSet.has(base.iso),
    };
  }, [selectedDate, markedDatesSet]);

  const selectedWeek = useMemo(() => buildWeekMeta(weekDaysRaw), [weekDaysRaw]);

  const monthLabel = useMemo(() => getMonthLabel(weekDaysRaw), [weekDaysRaw]);

  const formatted = useMemo(
    () => ({
      iso: selectedDay.iso,
      display: selectedDay.display,
      timestamp: selectedDay.timestamp,
      dateObject: selectedDay.date,
      weekRange: {
        from: selectedWeek.startIso,
        to: selectedWeek.endIso,
      },
    }),
    [selectedDay, selectedWeek],
  );

  const updateSelectedDate = useCallback(
    date => {
      const normalized = normalizeDate(date);

      if (!isControlled) {
        setInternalSelectedDate(prev => {
          if (isSameDay(prev, normalized)) return prev;
          return normalized;
        });
      }
    },
    [isControlled],
  );

  const selectDate = useCallback(
    date => {
      updateSelectedDate(date);
    },
    [updateSelectedDate],
  );

  const setDate = useCallback(
    date => {
      updateSelectedDate(date);
    },
    [updateSelectedDate],
  );

  const goToday = useCallback(() => {
    updateSelectedDate(new Date());
  }, [updateSelectedDate]);

  const goPrev = useCallback(() => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 7);
    updateSelectedDate(prev);
  }, [selectedDate, updateSelectedDate]);

  const goNext = useCallback(() => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 7);
    updateSelectedDate(next);
  }, [selectedDate, updateSelectedDate]);

  const goToWeek = useCallback(
    date => {
      updateSelectedDate(getStartOfWeek(date));
    },
    [updateSelectedDate],
  );

  const lastDateKeyRef = useRef(null);
  const lastWeekKeyRef = useRef(null);

  useEffect(() => {
    if (!onDateChange) return;

    const currentDateKey = selectedDay.iso;
    if (lastDateKeyRef.current === currentDateKey) return;

    lastDateKeyRef.current = currentDateKey;

    onDateChange({
      date: selectedDay.date,
      iso: selectedDay.iso,
      display: selectedDay.display,
      timestamp: selectedDay.timestamp,
      selectedDay,
      selectedWeek,
    });
  }, [
    onDateChange,
    selectedDay.iso,
    selectedDay.date,
    selectedDay.display,
    selectedDay.timestamp,
    selectedDay,
    selectedWeek,
  ]);

  useEffect(() => {
    if (!onWeekChange) return;

    const currentWeekKey = `${selectedWeek.startIso}_${selectedWeek.endIso}`;
    if (lastWeekKeyRef.current === currentWeekKey) return;

    lastWeekKeyRef.current = currentWeekKey;

    onWeekChange({
      weekStart: selectedWeek.start,
      weekEnd: selectedWeek.end,
      startIso: selectedWeek.startIso,
      endIso: selectedWeek.endIso,
      selectedWeek,
      selectedDate,
    });
  }, [
    onWeekChange,
    selectedWeek.startIso,
    selectedWeek.endIso,
    selectedWeek.start,
    selectedWeek.end,
    selectedWeek,
    selectedDate,
  ]);

  return {
    days,
    monthLabel,
    formatted,

    selectedDate,
    selectedDay,
    currentDay,
    selectedWeek,
    weekStart: selectedWeek.start,
    weekEnd: selectedWeek.end,

    selectDate,
    setDate,
    goToday,
    goPrev,
    goNext,
    goToWeek,

    isToday,
    isSameDay,
  };
}
