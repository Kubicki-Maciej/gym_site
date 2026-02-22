export function combineDateAndTime(date, hours, minutes) {
  const result = new Date(date);

  result.setHours(hours);
  result.setMinutes(minutes);
  return result;
}
