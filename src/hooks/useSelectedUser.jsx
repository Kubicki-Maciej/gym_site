import { useState, useEffect } from "react";

const SELECTED_USER_KEY = "selectedUser";
const SELECTED_USER_OBJECT_KEY = "selectedObjectUser";

export default function useSelectedUser() {
  const [selectedUser, setSelectedUserState] = useState(null);
  const [objectSelectedUser, setObjectSelectedUserState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Wczytaj z localStorage przy montowaniu
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(SELECTED_USER_KEY);
      if (storedUser) {
        setSelectedUserState(JSON.parse(storedUser));
      }
      const storeObjectUser = localStorage.getItem(SELECTED_USER_OBJECT_KEY);
      if (storeObjectUser) {
        setObjectSelectedUserState(storeObjectUser);
      }
    } catch (error) {
      console.error("Błąd wczytywania selectedUser z localStorage:", error);
      localStorage.removeItem(SELECTED_USER_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSelectedUserFromLocalStorage = () => {
    return localStorage.getItem(SELECTED_USER_KEY);
  };

  // ✅ Ustaw selectedUser (zapisz do state + localStorage)
  const setSelectedUser = userData => {
    try {
      if (userData) {
        localStorage.setItem(SELECTED_USER_KEY, JSON.stringify(userData));

        setSelectedUserState(userData);
      } else {
        localStorage.removeItem(SELECTED_USER_KEY);
        setSelectedUserState(null);
      }
    } catch (error) {
      console.error("Błąd zapisywania selectedUser do localStorage:", error);
    }
  };
  const setSelectedObjectUser = userData => {
    try {
      if (userData) {
        localStorage.setItem(
          SELECTED_USER_OBJECT_KEY,
          JSON.stringify(userData),
        );
        setObjectSelectedUserState(userData);
      } else {
        localStorage.removeItem(SELECTED_USER_OBJECT_KEY);
        setObjectSelectedUserState(null);
      }
    } catch (error) {
      console.error(
        "Błąd zapisywania selectedObjectUser do localStorage:",
        error,
      );
    }
  };

  const getObjectUser = () => {
    return localStorage.getItem(SELECTED_USER_OBJECT_KEY);
  };

  // ✅ Wyczyść selectedUser
  const clearSelectedUser = () => {
    localStorage.removeItem(SELECTED_USER_KEY);
    setSelectedUserState(null);
  };

  // ✅ Sprawdź czy user jest wybrany
  const hasSelectedUser = selectedUser !== null;

  return {
    selectedUser,
    setSelectedUser,
    setSelectedObjectUser,
    clearSelectedUser,
    getSelectedUserFromLocalStorage,
    getObjectUser,
    hasSelectedUser,
    isLoading,
  };
}
