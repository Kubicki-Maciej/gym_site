import useUserExerciseInDateRangeStatistic from "./hooks/useUserExerciseInDateRangeStatistic";
import useUserListExerciseOption from "../exercise/hooks/useUserListExerciseOption";

import { useState } from "react";
import DateRangePicker from "../dateRange/DateRangePicker";

import {
  getFirstDayOfTheCurrentMonthString,
  getLastDayOfCurrentMonthString,
} from "../../components/Date/DateCurrentMonth";

export default function ExerciseSelectInDateRangeStatistic() {
  const [startDate, setStartDate] = useState(
    getFirstDayOfTheCurrentMonthString()
  );
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonthString());

  const exerciseId = 33;
  const userId = 12;

  const { data, isLoading, isError, error } =
    useUserExerciseInDateRangeStatistic({
      exerciseId,
      userId,
      startDate,
      endDate,
    });

  const {
    data: listData,
    isLoading: listIsLoading,
    isError: listIsError,
    error: listError,
  } = useUserListExerciseOption();

  if (isLoading) return <p>Ładowanie statystyk...</p>;
  if (isError) return <p>Błąd: {error.message}</p>;
  if (listIsError) return <p>Ładowanie statystyk...</p>;
  if (listError) return <p>Błąd: {error.message}</p>;

  const statistics = data;
  const listOfExercise = listData;

  return (
    <div>
      <DateRangePicker
        initialStart={startDate}
        initialEnd={endDate}
        onChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />
      ExerciseSelectInDateRangeStatistic
      <pre>{JSON.stringify(statistics, null, 2)}</pre>
    </div>
  );
}
