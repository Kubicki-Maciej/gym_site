import ProgressExerciseCard from "../../components/Cards/ProgressExerciseCard";

export default function BestProgressExercise({ bestProgressExercise }) {
  if (!bestProgressExercise) return null;
  return <ProgressExerciseCard bestProgressExercise={bestProgressExercise} />;
}
