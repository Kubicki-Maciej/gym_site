import useUserExerciseInDateRangeStatistic from "../hooks/useUserExerciseInDateRangeStatistic";
import useUserListExerciseOption from "../../exercise/hooks/useUserListExerciseOption";
import ProgressMaxChart from "../charts/ProgressMaxChart";
import { useState } from "react";
import { Card } from "@mui/material";
import DateRangePicker from "../../dateRange/DateRangePicker";
import TestChart from "./charts/TestChart";

import {
  getFirstDayOfTheCurrentMonthString,
  getLastDayOfCurrentMonthString,
} from "../../../components/Date/DateCurrentMonth";
import ListOfStudentExercise from "../../exercise/ListOfStudentExercise";

export default function ExerciseSelectInDateRangeStatistic({
  userId ,
  exerciseId 
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

  if (isLoading) return <p>Ładowanie statystyk...</p>;
  if (isError) return <p>Błąd: {error.message}</p>;
  if (listIsError) return <p>Ładowanie statystyk...</p>;
  if (listError) return <p>Błąd: {error.message}</p>;

  const statistics = data;

  
  return (
    <div>
      <>TUTAJ JEST DATE RANGE PICKER</>
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
          <ListOfStudentExercise listOfExercise={statistics.history} />
        </Card>
        
      )}
      {statistics &&
      (
        <>
        Test CHart
        <TestChart data={statistics.history}/>
      
        <ProgressMaxChart data={statistics}/></>


      )}
    </div>
  );
}
