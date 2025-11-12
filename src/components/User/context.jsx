import { createContext, useContext, useState } from "react";

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
export const UserContext = createContext({
  logged: false,
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

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
 */
export function UserProvider({ children }) {
  const [logged, setLogged] = useState(!!localStorage.getItem("userLogged"));
  const [user, setUser] = useState(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error(
        "Błąd przy parsowaniu danych użytkownika z localStorage:",
        error
      );
      // Jeśli JSON jest nieprawidłowy, wyczyść localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("userLogged");
      return null;
    }
  });

  const login = userData => {
    setLogged(true);
    setUser(userData);
    localStorage.setItem("userLogged", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setLogged(false);
    setUser(null);
    localStorage.removeItem("userLogged");
    localStorage.removeItem("user");
  };

  const updateUser = updatedData => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const value = {
    logged,
    user,
    login,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

/**
 * Hook do pobierania contextu użytkownika
 *
 * PRZYKŁAD UŻYCIA:
 * const { logged, user, login, logout, updateUser } = useUserContext();
 */
export function useUserContext() {
  const context = useContext(UserContext);

  if (context === undefined) {
    console.error("useUserContext musi być używany wewnątrz UserProvider!");
    return {
      logged: false,
      user: null,
      login: () => {},
      logout: () => {},
      updateUser: () => {},
    };
  }

  return context;
}
