import React, { useState, useCallback, useMemo } from "react";
import WeekStrip from "components/Calendar/WeekStrip";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import useUserTrainingsInDateRangeQuery from "hooks/Training/useUserTrainingInDateRangeQuerry";
import CardExerciseWithPicture from "components/Cards/CardExerciseWithPicture";
import useUserTraining from "hooks/useUserTraining";
import { Box, Grid } from "@mui/material";
import ExerciseCard from "components/Workout/ExerciseCard";
import StudentCreateWorkout from "./StudentCreateWorkout";
import CreateTrainingStudentButton from "components/Workout/CreateTrainingStudentButton";

import { useUserContext } from "components/User/context";

const mapExerciseToCardFormat = exercise => ({
  userExerciseId: exercise.id,
  exerciseId: exercise.exercise,
  name: exercise.name,
  exerciseSeries: exercise.exercises_series || [],
});

export default function StudentPlanTrainingWorkout() {
  const { getUserId } = useUserContext();
  const userId = getUserId();

  const [payload, setPayload] = useState({
    start_date: null,
    end_date: null,
  });

  const [selectedDateIso, setSelectedDateIso] = useState(null);

  const handleWeekChange = useCallback(({ startIso, endIso }) => {
    setPayload(prev => {
      if (prev.start_date === startIso && prev.end_date === endIso) {
        return prev;
      }
      return {
        start_date: startIso,
        end_date: endIso,
      };
    });
  }, []);

  const handleDateChange = useCallback(({ iso }) => {
    setSelectedDateIso(prev => (prev === iso ? prev : iso));
  }, []);

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useUserTrainingsInDateRangeQuery(userId, payload);

  const markedDates = useMemo(() => {
    return data.map(item => item.training_date);
  }, [data]);

  const selectedDayTrainings = useMemo(() => {
    if (!selectedDateIso) return [];

    return data.filter(item => {
      const trainingDayIso = item.training_date.slice(0, 10);
      return trainingDayIso === selectedDateIso;
    });
  }, [data, selectedDateIso]);

  // Rozdzielenie treningów na własne i przypisane
  const { ownTrainings, assignedTrainings } = useMemo(() => {
    return selectedDayTrainings.reduce(
      (acc, training) => {
        if (training.created_by === training.user) {
          acc.ownTrainings.push(training);
        } else {
          acc.assignedTrainings.push(training);
        }
        return acc;
      },
      { ownTrainings: [], assignedTrainings: [] },
    );
  }, [selectedDayTrainings]);

  // Callback po utworzeniu treningu
  const handleTrainingCreated = useCallback(() => {
    refetch();
  }, [refetch]);

  const showCreateButton =
    !isLoading && selectedDateIso && ownTrainings.length === 0;

  return (
    <>
      <WeekStrip
        onWeekChange={handleWeekChange}
        onDateChange={handleDateChange}
        markedDates={markedDates}
      />

      <QueryStateHandler isLoading={isLoading} error={error}>
        <Box sx={{ marginTop: 0, width: "100%" }}>
          {assignedTrainings.length > 0 && (
            <Grid container spacing={0}>
              {assignedTrainings.flatMap(training =>
                training.user_exercises.map(exercise => {
                  const mappedExercise = mapExerciseToCardFormat(exercise);

                  return (
                    <Grid
                      item
                      size={{ xs: 12 }}
                      key={exercise.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardExerciseWithPicture>
                        <ExerciseCard
                          exercise={mappedExercise}
                          mode="readonly"
                          trainingObject={training}
                        />
                      </CardExerciseWithPicture>
                    </Grid>
                  );
                }),
              )}
            </Grid>
          )}

          {/* Własne treningi - edytowalne */}
          {ownTrainings.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {ownTrainings.map(training => (
                <StudentCreateWorkout
                  key={training.id}
                  trainingId={training.id}
                />
              ))}
            </Box>
          )}

          {/* Przycisk tworzenia - gdy brak własnych treningów */}
          {showCreateButton && (
            <CreateTrainingStudentButton
              userId={userId}
              selectedDate={selectedDateIso}
              onSuccess={handleTrainingCreated}
            />
          )}
        </Box>
      </QueryStateHandler>
    </>
  );
}
