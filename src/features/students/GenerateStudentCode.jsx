// GenerateStudentCode.jsx
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import useInvitationCodes from "hooks/useInvitationCodes"; // ← poprawna nazwa
import { StatusAlertService } from "react-status-alert";

export default function GenerateStudentCode() {
  const { loading, generateMyCode, getMyCode } = useInvitationCodes(); // ← poprawne nazwy
  const [codeData, setCodeData] = useState(null);

  useEffect(() => {
    fetchCode();
  }, []);

  const fetchCode = async () => {
    const result = await getMyCode();
    if (result && result.code) {
      setCodeData(result);
    }
  };

  const handleGenerate = async () => {
    const result = await generateMyCode();
    if (result) {
      setCodeData(result);
      StatusAlertService.showSuccess("Wygenerowano kod!");
    } else {
      StatusAlertService.showError("Błąd generowania kodu");
    }
  };

  const copyToClipboard = () => {
    if (codeData?.code) {
      navigator.clipboard.writeText(codeData.code);
      StatusAlertService.showSuccess("Skopiowano do schowka!");
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
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
      <Paper elevation={2} sx={{ p: 3, width: "100%", textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Twój kod zaproszenia
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Przekaż ten kod trenerowi, aby mógł Cię dodać
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : codeData?.code ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  letterSpacing: 6,
                  color: "primary.main",
                }}
              >
                {codeData.code}
              </Typography>
              <Tooltip title="Kopiuj">
                <IconButton onClick={copyToClipboard} color="primary">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Wygasa: {formatDate(codeData.expires_at)}
            </Typography>

            <Button
              variant="outlined"
              onClick={handleGenerate}
              disabled={loading}
              sx={{ mt: 2, width: { xs: "80%", sm: "50%" } }}
            >
              Generuj nowy kod
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={loading}
            startIcon={<RefreshIcon />}
            sx={{ width: { xs: "80%", sm: "50%" } }}
          >
            Generuj kod
          </Button>
        )}
      </Paper>
    </Box>
  );
}
