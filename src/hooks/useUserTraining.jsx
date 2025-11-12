import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

export default function useUserTraining() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserDataTraining = async id => {
    try {
      const response = await fetch(`${API_URL}/training/user/${id}`, {
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
        `${API_URL}/training/user/upcoming_trainigs/${id}`,
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
        `${API_URL}/training/user/all_trainings/${id}`,
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
        `${API_URL}/training/user/create_multiple_trainings`,
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

  return {
    loading,
    error,
    getUserDataTraining,
    getUserDataUpcomingTrenings,
    getUserAllDataTraining,
    createTreningsToUserApi,
  };
}
