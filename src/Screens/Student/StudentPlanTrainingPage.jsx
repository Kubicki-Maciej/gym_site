import React, { useState, useCallback, useMemo } from "react";
import WeekStrip from "components/Calendar/WeekStrip";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import useUserTrainingsInDateRangeQuery from "hooks/Training/useUserTrainingInDateRangeQuerry";
import CardExerciseWithPicture from "components/Cards/CardExerciseWithPicture";
import useUserTraining from "hooks/useUserTraining";
import { Box, Grid } from "@mui/material";
import ExerciseCard from "components/Workout/ExerciseCard";

const mapExerciseToCardFormat = exercise => ({
  userExerciseId: exercise.id,
  exerciseId: exercise.exercise,
  name: exercise.name,
  exerciseSeries: exercise.exercises_series || [],
});

export default function StudentPlanTrainingPage() {
  const { getAllExercises, getAllTrainings } = useUserTraining();
  const userId = 63;

  const [payload, setPayload] = useState({
    start_date: null,
    end_date: null,
  });

  const [selectedDateIso, setSelectedDateIso] = useState(null);
  console.log("selectedDateIso", selectedDateIso);

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

  return (
    <div>
      <WeekStrip
        onWeekChange={handleWeekChange}
        onDateChange={handleDateChange}
        markedDates={markedDates}
      />
      <QueryStateHandler
        isLoading={isLoading}
        error={error}
        children={
          <div style={{ marginTop: 0, width: "100%" }}>
            {!isLoading && selectedDayTrainings.length === 0 && (
              <p>Brak treningów dla wybranego dnia</p>
            )}
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={0}>
                {selectedDayTrainings.flatMap(training =>
                  training.user_exercises.map(exercise => {
                    const mappedExercise = mapExerciseToCardFormat(exercise);

                    return (
                      <Grid
                        item
                        size={{ xs: 12, md: 6 }}
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
            </Box>
          </div>
        }
      ></QueryStateHandler>
    </div>
  );
}
