import React from "react";
import { useState, useCallback } from "react";
import { exerciseApi } from "../api/exerciseApi";

export default function useExercise() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (err, fallbackMessage) => {
    const message = err?.message ?? fallbackMessage;
    setError(message);
    console.error(message, err);
    return null;
  };

  const createExercise = useCallback(async data => {
    try {
      setLoading(true);
      const result = await exerciseApi.createExercise(data);
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd pobierania treningu");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExercise = useCallback(async (exerciseId, data) => {
    try {
      setLoading(true);
      const result = await exerciseApi.updateExercise(exerciseId, data);
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd aktualizacji ćwiczenia");
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllExercises = useCallback(async () => {
    try {
      const data = await exerciseApi.getAllExercises();
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania ćwiczeń");
    }
  }, []);

  const getExerciseById = useCallback(async exerciseId => {
    try {
      const data = await exerciseApi.getExerciseById(exerciseId);
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania ćwiczenia");
    }
  }, []);

  return {
    loading,
    error,
    createExercise,
    updateExercise,
    getAllExercises,
    getExerciseById,
  };
}
