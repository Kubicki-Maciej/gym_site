import React, { useState } from "react";
import SingleTraining from "./SingleTraining";
// import TrainingSchedulePicker from "../Calendar/TrainingScheduleConfigurator";
import TrainingSchedulePicker from "../trainingSchedule/TrainingSchedulePicker";

export default function PlanTraining({ onEventDataChange }) {
  const handleScheduleChange = schedule => {
    console.log("schedule:", schedule);
  };

  const handleTrainingType = type => {
    console.log("typ treningu:", type); // "cycle" | "single"
  };

  return (
    // <TrainingSchedulePicker
    //   onChange={onEventDataChange}
    //   setTrainigType={setTrainingType}
    // />
    <TrainingSchedulePicker
      onChange={handleScheduleChange}
      setTrainigType={handleTrainingType}
      viewMode="auto" // lub "desktop" / "mobile"
    />
  );
}
