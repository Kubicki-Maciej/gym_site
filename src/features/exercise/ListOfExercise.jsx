import StudentExerciseItem from "../../components/Student/StudentExerciseItem";
import { List } from "@mui/material";

export default function ListOfExercise({ listOfExercise }) {
  console.log("listOfExercise");
  console.log(listOfExercise);
  if (!listOfExercise) return null;
  return (
    <List sx={{ width: "100%", p: 0 }}>
      {listOfExercise.map(exercise => (
        <StudentExerciseItem
          key={exercise.id || ""}
          exercise={exercise || ""}
        />
      ))}
    </List>
  );
}
