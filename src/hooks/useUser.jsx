import { useState, useCallback } from "react";
import { userApi } from "../api/userApi";

export default function useUser() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (err, fallbackMessage) => {
    const message = err?.message ?? fallbackMessage;
    setError(message);
    console.error(message, err);
    return null;
  };

  const getTrainerStudents = useCallback(async idTrainer => {
    try {
      setLoading(true);
      const result = await userApi.getTrainerStudents(idTrainer);
      setError(null);
      return result;
    } catch (err) {
      return handleError(err, "Błąd pobierania treningu");
    } finally {
      setLoading(false);
    }
  }, []);
  return { error, loading, getTrainerStudents };
}
