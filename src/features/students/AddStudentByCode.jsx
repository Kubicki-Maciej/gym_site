import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import useInvitationCodes from "hooks/useInvitationCodes";
import { StatusAlertService } from "react-status-alert";

export default function AddStudentByCode({ onSuccess }) {
  const { loading, claimStudent } = useInvitationCodes();
  const [code, setCode] = useState("");

  const handleCodeChange = e => {
    const value = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8);
    setCode(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (code.length !== 8) {
      StatusAlertService.showError("Kod musi mieć 8 znaków");
      return;
    }

    const result = await claimStudent(code);

    if (result) {
      StatusAlertService.showSuccess(result.message || "Dodaj Użytkownika!");
      setCode("");
      if (onSuccess) {
        onSuccess(result.trainer);
      }
    } else {
      StatusAlertService.showError("Nieprawidłowy kod zaproszenia");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Wprowadź 8-znakowy kod otrzymany od użytkownika
      </Typography>

      <TextField
        label="Kod zaproszenia"
        value={code}
        onChange={handleCodeChange}
        placeholder="NP. ABC12345"
        required
        autoComplete="off"
        inputProps={{
          maxLength: 8,
          style: {
            textAlign: "center",
            letterSpacing: 6,
            fontSize: "1.5rem",
            fontFamily: "monospace",
            fontWeight: "bold",
          },
        }}
        sx={{ width: { xs: "80%", sm: "50%" } }}
      />

      <Typography
        variant="caption"
        color={code.length === 8 ? "success.main" : "text.secondary"}
      >
        {code.length}/8 znaków
      </Typography>

      <Button
        type="submit"
        variant="contained"
        disabled={code.length !== 8 || loading}
        sx={{ width: { xs: "80%", sm: "50%" } }}
      >
        {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          "Dodaj użytkownika"
        )}
      </Button>
    </Box>
  );
}
