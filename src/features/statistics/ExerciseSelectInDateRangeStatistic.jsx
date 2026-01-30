import useUserExerciseInDateRangeStatistic from "./hooks/useUserExerciseInDateRangeStatistic";
import useUserListExerciseOption from "../exercise/hooks/useUserListExerciseOption";

import { useState } from "react";
import { Card } from "@mui/material";
import DateRangePicker from "../dateRange/DateRangePicker";
import BestProgressExercise from "./BestProgressExercise";
import ExerciseSelectHistory from "./ExerciseSelectHistory";

import {
  getFirstDayOfTheCurrentMonthString,
  getLastDayOfCurrentMonthString,
} from "../../components/Date/DateCurrentMonth";
import ListOfExercise from "../exercise/ListOfExercise";

export default function ExerciseSelectInDateRangeStatistic({
  userId = 12,
  exerciseId = 33,
}) {
  const [startDate, setStartDate] = useState(
    getFirstDayOfTheCurrentMonthString(),
  );
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonthString());

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
  console.log("data");
  console.log(data);

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
      {statistics && (
        <Card>
          <ListOfExercise listOfExercise={statistics.history} />
        </Card>
      )}
    </div>
  );
}
