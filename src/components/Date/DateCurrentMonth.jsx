export function getFirstDayOfTheCurrentMonthString() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-01`;
}

export function getLastDayOfCurrentMonthString() {
  const date = new Date();
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  return `${year}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    lastDay
  ).padStart(2, "0")}`;
}
