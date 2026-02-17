import { useUserStatistics } from "hooks/useUserStatistic";

import useMonthControler from "../calendarNavigation/useMonthControler";
import CalendarNavigator from "../calendarNavigation/CalendarNavigator";
import { MuscleEngagementPieChart } from "./charts/MuscleEngagementPieChart";

export default function UserMuscleUsage({ userId }) {
  const { year, month, nextMonth, prevMonth } = useMonthControler();

  const { data, isLoading, isError, error } = useUserStatistics({
    userId,
    year,
    month,
  });
  if (isLoading) return <p>Ładowanie statystyk...</p>;
  if (isError) return <p>Błąd: {error.message}</p>;
  const statistics = data;

  return (
    <div>
      <h4>Statystyki treningowe</h4>
      <CalendarNavigator
        year={year}
        month={month}
        prev={prevMonth}
        next={nextMonth}
      />
      <MuscleEngagementPieChart muscleUsage={statistics.muscle_usage} />
    </div>
  );
}
