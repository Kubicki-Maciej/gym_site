// src/hooks/useUserUpcomingTraining.js
import { useState, useEffect } from "react";
import trainingApi from "../api/trainingApi";

export default function useUserUpcomingTraining(id) {
  const { getUserUpcomingTraining } = trainingApi;
  const [trainingList, setTrainingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;

    const fetchUserUpcomingTraining = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserUpcomingTraining(id);
        if (!isCancelled) {
          setTrainingList(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err?.message ?? "Wystąpił błąd");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchUserUpcomingTraining();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { trainingList, loading, error };
}
