import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext({
  logged: false,
  user: null,
  selectedUser: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  setSelectedUserData: () => {},
  accessToken: null,
  refreshToken: null,
});

export function UserProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("--USER--");
  console.log(user);

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
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = response => {
    const { access, refresh, user: userData } = response;

    localStorage.setItem("token", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(userData));
    if (!userData?.is_user_trainer) {
      localStorage.setItem("selectedObjectUser", JSON.stringify(userData));
      localStorage.setItem("selectedUser", JSON.stringify(userData.id));
    } else {
      localStorage.setItem("selectedObjectUser", []);
      localStorage.setItem("selectedUser", 0);
    }

    setAccessToken(access);
    setRefreshToken(refresh);
    setUser(userData);
    setLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setSelectedUser(null);
    setLogged(false);
  };

  const updateUser = updatedData => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const setSelectedUserData = userData => {
    setSelectedUser(userData);
  };

  const setNewAccessToken = token => {
    setAccessToken(token);
    localStorage.setItem("token", token);
  };

  const getUserId = () => {
    return user?.id;
  };

  const value = {
    logged,
    user,
    selectedUser,
    accessToken,
    refreshToken,
    loading,
    login,
    logout,
    updateUser,
    setSelectedUserData,
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
      selectedUser: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      login: () => {},
      logout: () => {},
      updateUser: () => {},
      setSelectedUserData: () => {},
      setNewAccessToken: () => {},
      getUserId: () => {},
    };
  }
  return context;
}
