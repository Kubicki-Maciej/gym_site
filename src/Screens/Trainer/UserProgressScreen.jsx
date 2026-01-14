import { useUserStatistics } from "../../features/statistics/hooks/useUserStatistic";
import { useUserContext } from "../../components/User/context";
import useMonthControler from "../../features/calendarNavigation/useMonthControler";
import CalendarNavigator from "../../features/calendarNavigation/CalendarNavigator";
import { TrainingDashboard } from "../../features/statistics/TrainingDashboard";

export default function UserProgressScreen() {
  const { selectedUser } = useUserContext();
  const { year, month, nextMonth, prevMonth } = useMonthControler();
  console.log("year");
  console.log(year);
  const userId = selectedUser?.id;

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
      <TrainingDashboard data={statistics} />

      <pre>{JSON.stringify(statistics, null, 2)}</pre>
    </div>
  );
}
