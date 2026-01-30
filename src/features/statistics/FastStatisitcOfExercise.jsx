import { useState } from "react";
import ExerciseSelectInDateRangeStatistic from "./ExerciseSelectInDateRangeStatistic";
import ExerciseSelector from "../exercise/ExerciseSelector";
import useGetUserAllExerciseName from "../users/hooks/useGetUserAllExerciseName";

export default function FastStatisitcOfExercise({ userId }) {
  // change name to USER ?
  const [selectedExercise, setSelectedExercise] = useState(null);

  const {
    data: exerciseData,
    isLoading,
    isError,
    error,
  } = useGetUserAllExerciseName({ userId });

  if (isLoading) return <p>Ładowanie statystyk...</p>;
  if (isError) return <p>Błąd: {error.message}</p>;
  console.log("exerciseData");
  console.log(exerciseData);
  return (
    <div>
      <h4>FastStatisitcOfExercise</h4>
      <>Wybierz ćwiczenie</>
      {/* <ExerciseSelector
        onSelect={setSelectedExercise}
        exercises={exerciseData}
      /> */}
      <br />

      <>Wybierz Date</>
      {/* to wybiera date potrzebuje Id cwiczenia  if statment if selected exercise jest czyms to */}
      <ExerciseSelectInDateRangeStatistic userId={userId} />
    </div>
  );
}
