import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../config";
import { DataArrayRounded } from "@mui/icons-material";

export default function useUserTraining() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserDataTraining = async id => {
    try {
      const response = await fetch(`${API_URL}training/user/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserDataUpcomingTrenings = async id => {
    try {
      const response = await fetch(
        `${API_URL}training/user/upcoming_trainigs/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserAllDataTraining = async id => {
    try {
      const response = await fetch(
        `${API_URL}training/user/all_trainings/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTreningsToUserApi = async dataToSend => {
    try {
      const response = await fetch(
        `${API_URL}training/user/create_multiple_trainings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Błąd wysyłania na serwer");
      }
      const result = await response.json();
      setError("Trening utworzony pomyślnie!");
      return result;
    } catch (error) {
      console.error("❌ Błąd tworzenia treningu:", error);
      setError("Nie udało się utworzyć treningu.");
      return null;
    }
  };

  const getUpcomingTrainerWorkouts = async id => {
    try {
      const response = await fetch(
        `${API_URL}training/upcoming_trainings/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTraining = async (trainingId, updatedData) => {
    try {
      setLoading(true);
      console.log(trainingId, updatedData);
      const response = await fetch(
        `${API_URL}training/update_user_training/${trainingId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Błąd aktualizacji treningu");
      }
      const result = await response.json();
      setError(null);
      return result;
    } catch (error) {
      console.error("❌ Błąd aktualizacji treningu:", error);
      setError("Nie udało się zaktualizować treningu");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateExercise = async (exerciseId, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/exercise/workout/updateexercise/${exerciseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Błąd aktualizacji ćwiczenia");
      }
      const result = await response.json();
      setError(null);
      return result;
    } catch (error) {
      console.error("❌ Błąd aktualizacji ćwiczenia:", error);
      setError("Nie udało się zaktualizować ćwiczenia");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllExercises = async () => {
    try {
      const response = await fetch(`${API_URL}exercise/exercise/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Błąd pobierania ćwiczeń");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Błąd pobierania ćwiczeń:", error);
      return [];
    }
  };

  const getExerciseById = async exerciseId => {
    try {
      const response = await fetch(`${API_URL}/exercise/${exerciseId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Błąd pobierania ćwiczenia");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ Błąd pobierania ćwiczenia:", error);
      return null;
    }
  };

  const deleteSeriesExercise = async exerciseId => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}exercise/delete/seriesexercise/${exerciseId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Błąd usuwania ćwiczenia");
      }

      setError(null);
      return true;
    } catch (error) {
      console.error("❌ Błąd usuwania ćwiczenia:", error);
      setError("Nie udało się usunąć ćwiczenia");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteSingleExercise = async exerciseId => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}exercise/delete/singleseries/${exerciseId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Błąd usuwania ćwiczenia");
      }
      setError(null);
      return true;
    } catch (error) {
      console.error("❌ Błąd usuwania ćwiczenia:", error);
      setError("Nie udało się usunąć ćwiczenia");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createSingleRep = async dataToSend => {
    try {
      const response = await fetch(`${API_URL}exercise/add_rep`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Błąd tworzenia ćwiczenia");
      }
      const data = await response.json();
      setError("Ćwiczenie utworzone pomyślnie!");
      return data;
    } catch (error) {
      console.error("❌ Błąd tworzenia ćwiczenia:", error);
      setError("Nie udało się utworzyć ćwiczenia.");
      return null;
    }
  };

  const addExerciseToTraining = async (idUserTraining, idExercise) => {
    const dataToSend = {
      idUserTraining: idUserTraining,
      idExercise: idExercise,
      repeats: 3,
    };

    try {
      const response = await fetch(`${API_URL}exercise/workout/addexercise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || "Błąd dodawania ćwiczenia do treningu"
        );
      }
      const result = await response.json();
      setError(null);
      return result;
    } catch (error) {
      console.error("❌ Błąd dodawania ćwiczenia do treningu:", error);
      setError("Nie udało się dodać ćwiczenia do treningu");
      return null;
    }
  };

  return {
    loading,
    error,
    getUserDataTraining,
    getUserDataUpcomingTrenings,
    getUserAllDataTraining,
    createTreningsToUserApi,
    getUpcomingTrainerWorkouts,
    updateTraining,
    updateExercise,
    deleteSingleExercise,
    getExerciseById,
    getAllExercises,
    createSingleRep,
    addExerciseToTraining,
    deleteSeriesExercise,
  };
}
