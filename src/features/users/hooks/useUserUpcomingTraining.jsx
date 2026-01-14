import { useState, useEffect, useCallback } from "react";
import { trainingApi } from "../api/trainingApi";

export default function useUserUpcomingTraining(userId) {
  const [trainingList, setTrainingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserUpcomingTraining = useCallback(async () => {
    if (!userId) {
      setTrainingList([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await trainingApi.getUserUpcomingTraining(userId);
      const trainings = data.results || data || [];
      setTrainingList(Array.isArray(trainings) ? trainings : []);
    } catch (err) {
      setError(err?.message ?? "Nie udało się pobrać treningów");
      setTrainingList([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserUpcomingTraining();
  }, [fetchUserUpcomingTraining]);

  return {
    trainingList,
    loading,
    error,
    refetch: fetchUserUpcomingTraining,
  };
}
