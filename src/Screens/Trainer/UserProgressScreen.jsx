import { useUserStatistics } from "../../features/statistics/hooks/useUserStatistic";
import { useUserContext } from "../../components/User/context";
import useMonthControler from "../../features/calendarNavigation/useMonthControler";
import CalendarButton from "../../components/Buttons/CalendarButton";
import CalendarNavigator from "../../features/calendarNavigation/CalendarNavigator";
import { TrainingDashboard } from "../../features/statistics/TrainingDashboard";
// import ExerciseSelectInDateRangeStatistic from "../../features/statistics/ExerciseSelectInDateRangeStatistic";
import FastStatisitcOfExercise from "../../features/statistics/FastStatisitcOfExercise";

export default function UserProgressScreen() {
  const { selectedUser } = useUserContext();
  const { year, month, nextMonth, prevMonth } = useMonthControler();
  const userId = selectedUser?.id;
  // data to    return api.get(`statistics/stats_user/${userId}/${year}/${month}/`);
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
      {/* <ExerciseSelectInDateRangeStatistic userId={userId} /> */}
      <FastStatisitcOfExercise userId={userId} />
      {/* <pre>{JSON.stringify(statistics, null, 2)}</pre> */}
    </div>
  );
}
