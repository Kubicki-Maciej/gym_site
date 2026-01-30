import StudentExerciseItem from "../../components/Student/StudentExerciseItem";
import { List } from "@mui/material";

export default function ListOfExercise({ listOfExercise }) {
  // if (!listOfExercise) {
  //   return null;
  // }

  return (
    <>
      {/* {JSON.stringify(listOfExercise, null, 2)} */}
      <List sx={{ width: "100%", p: 0 }}>
        {listOfExercise.map(exercise => (
          <StudentExerciseItem key={exercise.id} exercise={exercise} />
        ))}
      </List>
    </>
  );
}
