export function combineDateAndTime(date, hours, minutes) {
  const result = new Date(date);
  console.log("result");
  result.setHours(hours);
  result.setMinutes(minutes);
  return result;
}
