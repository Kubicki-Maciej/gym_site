export const weekDays = [
  { label: "Poniedziałek", value: 0 },
  { label: "Wtorek", value: 1 },
  { label: "Środa", value: 2 },
  { label: "Czwartek", value: 3 },
  { label: "Piątek", value: 4 },
  { label: "Sobota", value: 5 },
  { label: "Niedziela", value: 6 },
];

export function formatTime(date) {
  if (!date) return "";
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function parseTimeString(timeString) {
  if (!timeString) return null;
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function parseHHMM(timeString) {
  if (!timeString) return null;
  const [hh, mm] = timeString.split(":").map(Number);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return null;
  return { hours: hh, minutes: mm };
}

export function toDjangoISO(date) {
  return date.toISOString();
}

export function generateDatesFromSelectedDays(selectedDays, cycles) {
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
