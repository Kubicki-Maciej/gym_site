import React from "react";
import MuscleUsageCard from "features/statistics/cards/MuscleUsageCard";

export default function TrainingHeatMapMuscle({ trainingId, userId }) {
  return (
    <>
      <MuscleUsageCard
        trainingId={trainingId}
        userId={userId}
        mode={"single"}
      />
    </>
  );
}
