import { useState, useEffect } from "react";
import EventCalendar from "features/calendar/EventCalendar";
import {
  useUpcomingTrainerWorkouts,
  useCreateMultipleTrainings,
} from "hooks/useTrainerCalendar";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";

export default function TrainerCalendar() {
  const trainerId = JSON.parse(localStorage.getItem("user")).id;

  const {
    data: upcomingWorkouts = [],
    isLoading,
    isError,
    error,
  } = useUpcomingTrainerWorkouts(trainerId);

  const { mutate: createMultipleTrainings } =
    useCreateMultipleTrainings(trainerId);

  const sendDataToApi = data => {
    createMultipleTrainings(data);
  };

  function transformToCalendarEvents(data) {
    return data.map(item => {
      const { first_name, last_name, spouse_name, email } = item.user;
      const label =
        spouse_name ||
        (first_name && last_name ? `${first_name} ${last_name}` : null) ||
        email;
      return {
        id: item.id,
        title: label,
        start: item.training_date,
        end: new Date(
          new Date(item.training_date).getTime() + item.duration * 60000,
        ).toISOString(),
        extendedProps: {
          idTraining: item.id,
          userId: item.user.id,
          duration: item.duration,
        },
      };
    });
  }

  return (
    <QueryStateHandler isLoading={isLoading} isError={isError} error={error}>
      <EventCalendar
        sendDataTo={sendDataToApi}
        dataEvents={transformToCalendarEvents(upcomingWorkouts)}
      />
    </QueryStateHandler>
  );
}
