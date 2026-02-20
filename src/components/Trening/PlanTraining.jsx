import React from "react";

import TrainingSchedulePicker from "../trainingSchedule/TrainingSchedulePicker";

export default function PlanTraining({ onEventDataChange }) {
  const handleScheduleChange = schedule => {
    onEventDataChange(schedule);
  };

  return (
    <TrainingSchedulePicker
      onChange={handleScheduleChange}
      viewMode="auto" // lub "desktop" / "mobile"
    />
  );
}
