import React, { useContext, useState } from "react";
import { UserContext } from "../../../components/User/context";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Link,
} from "@mui/material";
import SnackbarAlert from "../../../components/Alerts/SnackbarAlert";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useContext(UserContext);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    if (!username || !password) {
      setAlert({
        open: true,
        message: "Uzupełnij wszystkie pola",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access", data.access);
        setAlert({
          open: true,
          message: "Zalogowano pomyślnie!",
          severity: "success",
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("userLogged", true);
        localStorage.setItem(
          "loginExpAt",
          Date.now() + 30 * 24 * 60 * 60 * 1000
        );
        setUserData({
          logged: true,
          userData: res.data,
        });
        setTimeout(() => navigate("/"), 1500);
      } else {
        setAlert({
          open: true,
          message: data.error || "Nieprawidłowe dane logowania",
          severity: "error",
        });
      }
    } catch (err) {
      setAlert({
        open: true,
        message: "Błąd połączenia z serwerem",
        severity: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 360, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Logowanie
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Nazwa użytkownika"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label="Hasło"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.2, fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Zaloguj się"
            )}
          </Button>
          <Typography textAlign="center" mt={2}>
            Nie masz konta?{" "}
            <Link
              onClick={() => navigate("/register")}
              sx={{ cursor: "pointer" }}
            >
              Zarejestruj się
            </Link>
          </Typography>
        </form>
      </Paper>
      <SnackbarAlert
        {...alert}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </Box>
  );
}
