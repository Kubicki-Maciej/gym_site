// components/TrainingHeatMapMuscle.jsx
import React, { useState } from "react";
import MuscleVisualizer from "features/muscleBody/MuscleVisualizer";
import useConvertTrainingToMuscleUsage from "hooks/useConvertTrainingToMuscleUsage";

export default function TrainingHeatMapMuscle({ dataTraining }) {
  const [warmUp, setWarmUp] = useState(0);

  const excludeWarmUp = warmUp === 1;

  const muscleUsage = useConvertTrainingToMuscleUsage(
    dataTraining,
    excludeWarmUp,
  );

  return (
    <MuscleVisualizer
      muscleData={muscleUsage}
      warmUp={warmUp}
      onWarmUpChange={setWarmUp}
    />
  );
}
