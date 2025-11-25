// hooks/useUserTraining.js
import { useCallback } from "react";
import { workoutApi } from "../api/workoutApi";
import { exerciseApi } from "../components/Exercise/api/exerciseApi";

export default function useUserTraining() {
  const getUserDataTraining = useCallback(async trainingId => {
    try {
      const data = await workoutApi.getUserTraining(trainingId);
      return data;
    } catch (error) {
      console.error("Error fetching training:", error);
      throw error;
    }
  }, []);

  const getAllExercises = useCallback(async () => {
    try {
      const data = await exerciseApi.getAllExercises();
      return data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      throw error;
    }
  }, []);

  const getAllTrainings = useCallback(async () => {
    try {
      const data = await workoutApi.getAllTrainings();
      return data;
    } catch (error) {
      console.error("Error fetching trainings:", error);
      throw error;
    }
  }, []);

  const updateTraining = useCallback(async (trainingId, data) => {
    try {
      const result = await workoutApi.updateTraining(trainingId, data);
      return result;
    } catch (error) {
      console.error("Error updating training:", error);
      throw error;
    }
  }, []);

  const addExerciseToTraining = useCallback(
    async (userTrainingId, exerciseId) => {
      try {
        const result = await workoutApi.addExerciseToTraining(
          userTrainingId,
          exerciseId
        );
        return result;
      } catch (error) {
        console.error("Error adding exercise:", error);
        throw error;
      }
    },
    []
  );

  const addTrainingExercises = useCallback(
    async (userTrainingId, trainingId) => {
      try {
        const result = await workoutApi.addTrainingToTraining(
          userTrainingId,
          trainingId
        );
        return result;
      } catch (error) {
        console.error("Error adding training:", error);
        throw error;
      }
    },
    []
  );

  const createSingleRep = useCallback(async payload => {
    try {
      const result = await workoutApi.createSingleRep(payload);
      return result;
    } catch (error) {
      console.error("Error creating series:", error);
      throw error;
    }
  }, []);

  const deleteSeriesExercise = useCallback(async seriesId => {
    try {
      const result = await workoutApi.deleteSeries(seriesId);
      return result;
    } catch (error) {
      console.error("Error deleting series:", error);
      throw error;
    }
  }, []);

  const deleteExercise = useCallback(async exerciseId => {
    try {
      const result = await workoutApi.deleteExercise(exerciseId);
      return result;
    } catch (error) {
      console.error("Error deleting exercise:", error);
      throw error;
    }
  }, []);

  return {
    getUserDataTraining,
    getAllExercises,
    getAllTrainings,
    updateTraining,
    addExerciseToTraining,
    addTrainingExercises,
    createSingleRep,
    deleteSeriesExercise,
    deleteExercise,
  };
}
