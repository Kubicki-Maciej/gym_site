// hooks/useConvertTrainingToMuscleUsage.js
import { useMemo } from "react";

export default function useConvertTrainingToMuscleUsage(
  training = null,
  excludeWarmUp = false,
) {
  return useMemo(() => {
    if (!training?.user_exercises?.length) return [];

    // Pobierz datę treningu
    const trainingDate = training.training_date
      ? new Date(training.training_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    const muscles = {};

    training.user_exercises.forEach(userExercise => {
      const exercise = userExercise.exercise;
      if (!exercise) return;

      // Filtruj serie (opcjonalnie bez rozgrzewki)
      const series = excludeWarmUp
        ? userExercise.exercises_series?.filter(s => !s.warm_up) || []
        : userExercise.exercises_series || [];

      if (series.length === 0) return;

      // Dla każdej grupy mięśniowej w ćwiczeniu
      exercise.muscle_group?.forEach(muscle => {
        const muscleId = muscle.id;

        // Inicjalizuj mięsień jeśli nie istnieje
        if (!muscles[muscleId]) {
          muscles[muscleId] = {
            id: muscleId,
            name: muscle.name,
            eng_name: muscle.eng_name,
            usage_count: 0,
            exercises: {},
          };
        }

        // Zwiększ usage_count o liczbę serii
        muscles[muscleId].usage_count += series.length;

        // Dodaj ćwiczenie jeśli nie istnieje
        const exerciseId = exercise.id;
        if (!muscles[muscleId].exercises[exerciseId]) {
          muscles[muscleId].exercises[exerciseId] = {
            exercise_name: exercise.name,
            trainings: {},
          };
        }

        // Dodaj trening dla danej daty jeśli nie istnieje
        if (!muscles[muscleId].exercises[exerciseId].trainings[trainingDate]) {
          muscles[muscleId].exercises[exerciseId].trainings[trainingDate] = {
            date: trainingDate,
            sets: [],
          };
        }

        // Dodaj serie
        series.forEach(s => {
          muscles[muscleId].exercises[exerciseId].trainings[
            trainingDate
          ].sets.push({
            repeats: s.repeats,
            weight: s.weight,
          });
        });
      });
    });

    // Konwertuj na tablice (format wynikowy)
    return Object.values(muscles).map(muscle => ({
      id: muscle.id,
      name: muscle.name,
      eng_name: muscle.eng_name,
      usage_count: muscle.usage_count,
      exercises: Object.values(muscle.exercises).map(ex => ({
        exercise_name: ex.exercise_name,
        trainings: Object.values(ex.trainings),
      })),
    }));
  }, [training, excludeWarmUp]);
}
