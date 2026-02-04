import ExerciseSelector from "../exercise/ExerciseSelector";
import { useState } from "react";
import { Card } from "@mui/material";
import ListOfExercise from "../exercise/ListOfStudentExercise";

export default function ExerciseSelectHistory({ data }) {
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (!data) return "";
  return (
    <div>
      ExerciseSelectHistory
      <ExerciseSelector exercises={data} onSelect={setSelectedExercise} />
      {selectedExercise && (
        <Card>
          <ListOfExercise listOfExercise={selectedExercise.data} />
        </Card>
      )}
    </div>
  );
}
