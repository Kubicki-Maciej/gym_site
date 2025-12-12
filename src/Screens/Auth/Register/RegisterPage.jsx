// import { useState } from "react";

// export default function RegisterPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   const handleRegister = async e => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:8000/user/register/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       alert("Rejestracja zakończona sukcesem");
//     } else {
//       alert(data.error || "Błąd rejestracji");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h2 className="text-xl mb-4">Rejestracja</h2>
//       <form onSubmit={handleRegister} className="flex flex-col w-64">
//         <input
//           className="border p-2 mb-2"
//           placeholder="Username"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//         />
//         <input
//           className="border p-2 mb-2"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//         />
//         <input
//           className="border p-2 mb-2"
//           placeholder="Email"
//           value={password}
//           onChange={e => setEmail(e.target.value)}
//         />
//         <button className="bg-green-500 text-white p-2">Zarejestruj</button>
//       </form>
//     </div>
//   );
// }
import { API_URL } from "../../../config";
import React, { useState } from "react";
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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    if (!name || !password || !confirm || !email) {
      setAlert({
        open: true,
        message: "Uzupełnij wszystkie pola",
        severity: "warning",
      });
      return;
    }
    if (password.length < 6) {
      setAlert({
        open: true,
        message: "Hasło musi mieć co najmniej 6 znaków",
        severity: "warning",
      });
      return;
    }
    if (password !== confirm) {
      setAlert({
        open: true,
        message: "Hasła nie są takie same",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: name,
        password: password,
        email: email,
        password_confirm: confirm,
      };
      // console.log(payload)
      const res = await fetch(`${API_URL}user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setAlert({
          open: true,
          message: "Rejestracja zakończona sukcesem!",
          severity: "success",
        });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setAlert({
          open: true,
          message: data.error || "Błąd rejestracji",
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
          Rejestracja
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Nazwa użytkownika"
            fullWidth
            margin="normal"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            label="Email "
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Hasło"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            label="Powtórz hasło"
            fullWidth
            type="password"
            margin="normal"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2, py: 1.2, fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Zarejestruj się"
            )}
          </Button>
          <Typography textAlign="center" mt={2}>
            Masz już konto?{" "}
            <Link onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
              Zaloguj się
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
