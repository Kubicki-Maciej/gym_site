/**
 * UserContext - przechowuje informacje o zalogowanym użytkowniku
 *
 * Struktura contextu:
 * {
 *   logged: boolean - czy użytkownik jest zalogowany
 *   user: object - dane zalogowanego użytkownika (id, email, imię, itd.)
 *   login: function - funkcja do zalogowania użytkownika
 *   logout: function - funkcja do wylogowania użytkownika
 *   updateUser: function - funkcja do aktualizacji danych użytkownika
 * }
 */

/**
 * UserProvider - komponent dostawcy contextu
 * Zarządza stanem zalogowanego użytkownika
 *
 * JAK UŻYWAĆ:
 * 1. Otwórz plik App.js lub main.jsx
 * 2. Opakuj aplikację (lub Router) w UserProvider:
 *    <UserProvider>
 *      <App />
 *    </UserProvider>
 *
 * 3. W dowolnym komponencie użyj hook'a useUserContext():
 *    import { useUserContext } from './path/to/context.jsx'
 *
 *    function MyComponent() {
 *      const { logged, user, login, logout, updateUser } = useUserContext();
 *
 *      // Sprawdzenie czy użytkownik jest zalogowany
 *      if (logged) {
 *        console.log('Zalogowany użytkownik:', user);
 *      }
 *
 *      // Zalogowanie użytkownika
 *      const handleLogin = (userData) => {
 *        login(userData);
 *      };
 *
 *      // Wylogowanie
 *      const handleLogout = () => {
 *        logout();
 *      };
 *
 *      // Aktualizacja danych użytkownika
 *      const handleUpdateUser = (updatedData) => {
 *        updateUser(updatedData);
 *      };
 *    }
 */ // src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext({
  logged: false,
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  accessToken: null,
  refreshToken: null,
});

export function UserProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Inicjalizuj state z localStorage przy montowaniu
  useEffect(() => {
    const token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refresh");
    const userData = localStorage.getItem("user");

    if (token && refresh && userData) {
      try {
        setAccessToken(token);
        setRefreshToken(refresh);
        setUser(JSON.parse(userData));
        setLogged(true);
      } catch (error) {
        console.error("Błąd przy wczytywaniu danych z localStorage:", error);
        // Wyczyść nieprawidłowe dane
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = response => {
    // ✅ response zawiera: { access, refresh, user }
    const { access, refresh, user: userData } = response;

    // Zapisz tokeny
    localStorage.setItem("token", access);
    localStorage.setItem("refresh", refresh);

    // Zapisz dane użytkownika
    localStorage.setItem("user", JSON.stringify(userData));

    // Zaktualizuj state
    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(userData);
    setLogged(true);
  };

  const logout = () => {
    // Wyczyść localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    // Wyczyść state
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setLogged(false);

    // Przekieruj na login
    // window.location.href = "/login";
  };

  const updateUser = updatedData => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  // ✅ Funkcja do aktualizacji access tokena
  const setNewAccessToken = token => {
    setAccessToken(token);
    localStorage.setItem("token", token);
  };

  const getUserId = () => {
    if (user) {
      return user.id;
    }
  };

  const value = {
    logged,
    user,
    accessToken,
    refreshToken,
    loading,
    login,
    logout,
    updateUser,
    setNewAccessToken,
    getUserId,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    console.error("useUserContext musi być używany wewnątrz UserProvider!");
    return {
      logged: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      login: () => {},
      logout: () => {},
      updateUser: () => {},
      setNewAccessToken: () => {},
      getUserId: () => {},
    };
  }

  return context;
}
