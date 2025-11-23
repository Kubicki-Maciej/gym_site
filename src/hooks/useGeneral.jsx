import React from "react";
import { useState, useCallback } from "react";
// import
import { generalApi } from "../api/generalApi";

export default function useGeneral() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (err, fallbackMessage) => {
    const message = err?.message ?? fallbackMessage;
    setError(message);
    console.error(message, err);
    return null;
  };

  const getAllMuscles = useCallback(async () => {
    try {
      const data = await generalApi.getMuscles();
      setError(null);
      return data;
    } catch (err) {
      return handleError(err, "Błąd pobierania mięśni");
    }
  }, []);

  return {
    error,
    loading,
    getAllMuscles,
  };
}
