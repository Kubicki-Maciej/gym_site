import React, { useState } from "react";
import SingleTraining from "./SingleTraining";

import TrainingSchedulePicker from "../trainingSchedule/TrainingSchedulePicker";

export default function PlanTraining({ onEventDataChange }) {
  const handleScheduleChange = schedule => {
    onEventDataChange(schedule);
  };

  const handleTrainingType = type => {};

  return (
    <TrainingSchedulePicker
      onChange={handleScheduleChange}
      viewMode="auto" // lub "desktop" / "mobile"
    />
  );
}
