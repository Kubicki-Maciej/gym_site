// weekStrip.utils.js

export const DAY_LABELS = ["P", "W", "Ś", "C", "P", "S", "N"];

export const MONTH_NAMES = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

export const toDate = value => {
  if (!value) return new Date();
  if (value instanceof Date) return new Date(value);
  return new Date(value);
};

export const normalizeDate = date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getStartOfWeek = date => {
  const d = normalizeDate(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d;
};

export const getEndOfWeek = date => {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getWeekDays = start =>
  Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    day.setHours(0, 0, 0, 0);
    return day;
  });

export const isSameDay = (a, b) => {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const isToday = date =>
  isSameDay(normalizeDate(date), normalizeDate(new Date()));

export const formatDate = date => {
  const d = normalizeDate(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const formatDatePL = date => {
  const d = normalizeDate(date);
  const day = String(d.getDate()).padStart(2, "0");
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const y = d.getFullYear();
  return `${day}.${m}.${y}`;
};

export const getDayLabel = date => {
  const jsDay = date.getDay(); // 0 = niedziela
  const mondayFirstIndex = (jsDay + 6) % 7;
  return DAY_LABELS[mondayFirstIndex];
};

export const buildDayObject = (date, selectedDate) => {
  const normalized = normalizeDate(date);

  return {
    date: normalized,
    key: formatDate(normalized),
    label: getDayLabel(normalized),
    number: normalized.getDate(),
    iso: formatDate(normalized),
    display: formatDatePL(normalized),
    timestamp: normalized.getTime(),
    isSelected: isSameDay(normalized, selectedDate),
    isToday: isToday(normalized),
    dayOfWeek: normalized.getDay(),
  };
};

export const buildWeekMeta = weekDays => {
  const start = weekDays[0];
  const end = weekDays[6];

  return {
    start,
    end,
    startIso: formatDate(start),
    endIso: formatDate(end),
    startDisplay: formatDatePL(start),
    endDisplay: formatDatePL(end),
    days: weekDays,
    key: `${formatDate(start)}_${formatDate(end)}`,
  };
};

export const getMonthLabel = weekDays => {
  const first = weekDays[0];
  const last = weekDays[6];

  if (first.getMonth() === last.getMonth()) {
    return `${MONTH_NAMES[first.getMonth()]} ${first.getFullYear()}`;
  }

  if (first.getFullYear() === last.getFullYear()) {
    return `${MONTH_NAMES[first.getMonth()]} / ${MONTH_NAMES[last.getMonth()]} ${first.getFullYear()}`;
  }

  return `${MONTH_NAMES[first.getMonth()]} ${first.getFullYear()} / ${MONTH_NAMES[last.getMonth()]} ${last.getFullYear()}`;
};
