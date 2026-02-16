// CreateTrainingFromText.jsx

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Snackbar,
  Fade,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import useTraining from "hooks/useTraining";
import TrainingLivePreview from "./TrainingLivePreview";

function parseExercises(text) {
  return text
    .split("\n")
    .map(line => line.replace(/^[-•*\d.)]+\s*/, "").trim())
    .filter(Boolean);
}

export default function CreateTrainingFromText() {
  const [name, setName] = useState("");
  const [exercisesText, setExercisesText] = useState("");
  const [result, setResult] = useState(null);
  const [snackbar, setSnackbar] = useState("");

  const { createTrainingFromText, loading, error } = useTraining();

  const exercises = parseExercises(exercisesText);

  const handleSubmit = async () => {
    if (!name.trim() || exercises.length === 0) return;

    const rawInput = [
      `${name.trim()}:`,
      ...exercises.map(ex => `- ${ex}`),
    ].join("\n");

    const data = await createTrainingFromText(rawInput);

    if (data) {
      setResult(data);
      setSnackbar("Trening utworzony!");
    }
  };

  const handleReset = () => {
    setName("");
    setExercisesText("");
    setResult(null);
  };

  const canSubmit = name.trim() && exercises.length > 0 && !loading;

  // ==================== WYNIK ====================
  if (result) {
    return (
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 3, px: 2 }}>
        <Fade in>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h5" gutterBottom>
              🏋️ {result.training.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {new Date(result.training.created_at).toLocaleString("pl-PL")}
              {" · "}
              {result.training.exercise_groups.length} ćwiczeń
            </Typography>

            <Stack spacing={1} sx={{ mb: 2 }}>
              {result.matched.length > 0 && (
                <Alert
                  icon={<CheckCircleIcon />}
                  severity="success"
                  sx={{ py: 0 }}
                >
                  <strong>Rozpoznano:</strong>{" "}
                  {result.matched.map(e => e.name).join(", ")}
                </Alert>
              )}
              {result.created.length > 0 && (
                <Alert icon={<WarningIcon />} severity="warning" sx={{ py: 0 }}>
                  <strong>Nowe:</strong>{" "}
                  {result.created.map(e => e.name).join(", ")}
                </Alert>
              )}
            </Stack>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell>Ćwiczenie</TableCell>
                    <TableCell align="center" width={70}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.training.exercise_groups.map((exercise, index) => {
                    const isNew = result.created.some(
                      c => c.id === exercise.id,
                    );
                    return (
                      <TableRow key={exercise.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {exercise.name}
                          </Typography>
                          {exercise.muscle_group?.length > 0 && (
                            <Stack
                              direction="row"
                              spacing={0.5}
                              sx={{ mt: 0.5 }}
                              flexWrap="wrap"
                              useFlexGap
                            >
                              {exercise.muscle_group.map(m => (
                                <Chip
                                  key={m.id}
                                  label={m.name}
                                  size="small"
                                  variant="outlined"
                                  sx={{ height: 20, fontSize: "0.7rem" }}
                                />
                              ))}
                            </Stack>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {isNew ? (
                            <Chip label="nowe" color="warning" size="small" />
                          ) : (
                            <Chip
                              label="✅"
                              color="success"
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
              sx={{ mt: 3 }}
            >
              Stwórz kolejny trening
            </Button>
          </Paper>
        </Fade>

        <Snackbar
          open={!!snackbar}
          autoHideDuration={3000}
          onClose={() => setSnackbar("")}
          message={snackbar}
        />
      </Box>
    );
  }

  // ==================== FORMULARZ ====================
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 3, px: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* LEWA - FORMULARZ */}
        <Paper elevation={2} sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h5"
            sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
          >
            <FitnessCenterIcon color="primary" />
            Nowy trening
          </Typography>

          <TextField
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            label="Nazwa treningu"
            placeholder="np. Trening Aleksandry"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={8}
            value={exercisesText}
            onChange={e => setExercisesText(e.target.value)}
            label="Ćwiczenia"
            placeholder={
              "wyciskanie na klate\nprzysiady\nmartwy ciąg\npompki\nplank"
            }
            helperText={
              exercises.length > 0
                ? `${exercises.length} ćwiczeń — jedno na linię`
                : "Wpisz ćwiczenia, jedno na linię"
            }
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                fontFamily: "monospace",
                fontSize: "0.95rem",
                lineHeight: 1.8,
              },
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!canSubmit}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <AddIcon />
              )
            }
          >
            {loading
              ? "Tworzę..."
              : `Stwórz trening${exercises.length > 0 ? ` (${exercises.length} ćw.)` : ""}`}
          </Button>
        </Paper>

        {/* PRAWA - LIVE PREVIEW */}
        <Box sx={{ flex: 1 }}>
          <TrainingLivePreview name={name} exercises={exercises} />
        </Box>
      </Box>
    </Box>
  );
}
