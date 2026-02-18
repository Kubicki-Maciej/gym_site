// src/hooks/useUserTraining.js
import { useState, useCallback } from "react";
import { trainingApi } from "../api/trainingApi";
import { useMutation } from "@tanstack/react-query";

export default function useTraining() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (err, fallbackMessage) => {
    const message = err?.message ?? fallbackMessage;
    setError(message);
    console.error(message, err);
    return null;
  };

  // Treningi
  const getUserDataTraining = useCallback(async id => {
    try {
      setLoading(true);
      const data = await trainingApi.getUserDataTraining(id);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania treningu");
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserUpcomingTraining = useCallback(async id => {
    try {
      setLoading(true);
      const data = await trainingApi.getUserUpcomingTraining(id);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania nadchodzących treningów");
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserAllDataTraining = useCallback(async id => {
    try {
      setLoading(true);
      const data = await trainingApi.getUserAllDataTraining(id);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania wszystkich treningów");
    } finally {
      setLoading(false);
    }
  }, []);

  const createMultipleTrainings = useCallback(async data => {
    try {
      setLoading(true);
      const result = await trainingApi.createMultipleTrainings(data);
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd tworzenia treningów");
    } finally {
      setLoading(false);
    }
  }, []);

  const getUpcomingTrainerWorkouts = useCallback(async id => {
    try {
      setLoading(true);
      const data = await trainingApi.getUpcomingTrainerWorkouts(id);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania treningów trenera");
    } finally {
      setLoading(false);
    }
  }, []);

  const getStudentAllTraining = useCallback(async id => {
    try {
      setLoading(true);
      const data = await trainingApi.getStudentAllTraining(id);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania treningów studenta");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTraining = useCallback(async (trainingId, data) => {
    try {
      setLoading(true);
      const result = await trainingApi.updateTraining(trainingId, data);
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd aktualizacji treningu");
    } finally {
      setLoading(false);
    }
  }, []);

  // Ćwiczenia
  const getAllExercises = useCallback(async () => {
    try {
      const data = await trainingApi.getAllExercises();
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania ćwiczeń");
    }
  }, []);

  const getExerciseById = useCallback(async exerciseId => {
    try {
      const data = await trainingApi.getExerciseById(exerciseId);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania ćwiczenia");
    }
  }, []);

  const updateExercise = useCallback(async (serieId, data) => {
    try {
      setLoading(true);
      const result = await trainingApi.updateExercise(serieId, data);
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd aktualizacji ćwiczenia");
    } finally {
      setLoading(false);
    }
  }, []);

  const addExerciseToTraining = useCallback(
    async (idUserTraining, idExercise) => {
      try {
        const result = await trainingApi.addExerciseToTraining(
          idUserTraining,
          idExercise,
        );
        setError(null);
        return result;
      } catch (err) {
        return handleError(err, "Błąd dodawania ćwiczenia do treningu");
      }
    },
    [],
  );

  const createSingleRep = useCallback(async data => {
    try {
      const result = await trainingApi.createSingleRep(data);
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd tworzenia ćwiczenia");
    }
  }, []);

  const deleteSeriesExercise = useCallback(async exerciseId => {
    try {
      setLoading(true);
      await trainingApi.deleteSeriesExercise(exerciseId);
      setError(null);
      return true;
    } catch (err) {
      handleError(err, "Błąd usuwania serii ćwiczenia");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteSingleExercise = useCallback(async exerciseId => {
    try {
      setLoading(true);
      await trainingApi.deleteSingleExercise(exerciseId);
      setError(null);
      return true;
    } catch (err) {
      handleError(err, "Błąd usuwania ćwiczenia");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTraining = useCallback(async data => {
    try {
      setLoading(true);
      await trainingApi.createTraining(data);
      setError(null);
      return true;
    } catch (err) {
      handleError(err, "Błąd tworzenia treningu");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMainTraining = useCallback(async data => {
    try {
      setLoading(true);
      await trainingApi.updateMainTraining(data);
      setError(null);
      return true;
    } catch (err) {
      handleError(err, "Błąd tworzenia treningu");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserTrainingsInDateRange = useCallback(async (id, payload) => {
    try {
      setLoading(true);
      const data = await trainingApi.userTrainingsInDateRange(id, payload);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania treningu");
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserRecentExercise = useCallback(
    async (userId, exerciseId, currentTrainingId) => {
      try {
        setLoading(true);
        const data = await trainingApi.getUserRecentExercise(
          userId,
          exerciseId,
          currentTrainingId,
        );
        setError(null);
        return data;
      } catch (err) {
        return handleError(err, "Błąd pobierania ćwiczenia");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createTrainingFromText = useCallback(async rawInput => {
    try {
      setLoading(true);
      const data = await trainingApi.createTrainingFromText(rawInput);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd tworzenia treningu");
    } finally {
      setLoading(false);
    }
  }, []);

  const checkUserTrainingAccess = useCallback(async (userId, trainingId) => {
    try {
      setLoading(true);
      const data = await trainingApi.checkUserTrainingAccess(
        userId,
        trainingId,
      );
      console.log("data");
      console.log(data);
      setError(null);
      return { has_access: data?.has_access ?? false };
    } catch (err) {
      handleError(err, "Błąd w sprawdzeniu użytkownika");
      return { has_access: false }; // ← Zawsze zwróć obiekt
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getUserDataTraining,
    getUserUpcomingTraining,
    getUserAllDataTraining,
    createMultipleTrainings,
    getUpcomingTrainerWorkouts,
    getStudentAllTraining,
    updateTraining,
    updateExercise,
    deleteSingleExercise,
    getExerciseById,
    getAllExercises,
    createSingleRep,
    addExerciseToTraining,
    deleteSeriesExercise,
    createTraining,
    updateMainTraining,
    getUserTrainingsInDateRange,
    getUserRecentExercise,
    createTrainingFromText,
    checkUserTrainingAccess,
  };
}
