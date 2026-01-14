import ExerciseSelector from "../exercise/ExerciseSelector";
import { useState } from "react";
import { Card } from "@mui/material";
import ListOfExercise from "../exercise/ListOfExercise";

export default function ExerciseSelectStatistic({ data }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  // ("ExerciseSELECT STATISTIC");
  // (selectedExercise.data);
  if (!selectedExercise) return "";
  return (
    <div>
      <ExerciseSelector exercises={data} onSelect={setSelectedExercise} />

      {selectedExercise && (
        <Card>
          <ListOfExercise listOfExercise={selectedExercise.data} />
          <pre>{JSON.stringify(selectedExercise, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
}
