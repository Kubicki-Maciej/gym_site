// src/features/students/hooks/useStudents.js
import { useState, useEffect, useCallback } from "react";
import { studentApi } from "../api/studentApi";

export const useStudents = () => {
  const [myStudents, setMyStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await studentApi.getMyStudents();
      setMyStudents(data.results || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Błąd przy pobieraniu studentów");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAvailableStudents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await studentApi.getAvailableStudents();
      setAvailableStudents(data.results || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Błąd przy pobieraniu dostępnych studentów");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createStudentToTrainer = useCallback(
    async (data, onSuccess) => {
      try {
        const result = await studentApi.createStudent(data);
        await fetchMyStudents();
        await fetchAvailableStudents();

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        const errorMsg = err.message || "Błąd przy dodawaniu studenta";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    },
    [fetchMyStudents, fetchAvailableStudents],
  );

  const addStudentToTrainer = useCallback(
    async studentId => {
      try {
        await studentApi.addStudent(studentId);
        await fetchMyStudents();
        await fetchAvailableStudents();
        return { success: true };
      } catch (err) {
        const errorMsg = err.message || "Błąd przy dodawaniu studenta";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    },
    [fetchMyStudents, fetchAvailableStudents],
  );

  const removeStudentFromTrainer = useCallback(
    async studentId => {
      try {
        await studentApi.removeStudent(studentId);
        await fetchMyStudents();
        await fetchAvailableStudents();
        return { success: true };
      } catch (err) {
        const errorMsg = err.message || "Błąd przy usuwaniu studenta";
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    },
    [fetchMyStudents, fetchAvailableStudents],
  );

  useEffect(() => {
    fetchMyStudents();
    fetchAvailableStudents();
  }, [fetchMyStudents, fetchAvailableStudents]);

  return {
    myStudents,
    availableStudents,
    loading,
    error,
    addStudentToTrainer,
    removeStudentFromTrainer,
    createStudentToTrainer,
    refetch: async () => {
      await fetchMyStudents();
      await fetchAvailableStudents();
    },
  };
};
