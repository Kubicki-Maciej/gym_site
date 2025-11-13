import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  AddCircleOutline as AddCircleIcon,
  RemoveCircleOutline as RemoveCircleIcon,
} from "@mui/icons-material";
import useUserTraining from "../../hooks/useUserTraining";
import { StatusAlertService } from "react-status-alert";

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getUserDataTraining,
    getExerciseById,
    updateTraining,
    updateExercise,
    deleteExercise,
    loading: hookLoading,
    error: hookError,
  } = useUserTraining();

  const [training, setTraining] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch training on mount
  useEffect(() => {
    const fetchTraining = async () => {
      if (!id) {
        setError("Brak ID treningu w parametrach URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const trainingData = await getUserDataTraining(id);

        if (!trainingData) {
          setError("Nie udało się pobrać treningu");
          setLoading(false);
          return;
        }

        setTraining(trainingData);

        // Map user_exercises - exercise is now an object with details
        if (
          trainingData.user_exercises &&
          Array.isArray(trainingData.user_exercises)
        ) {
          const mappedExercises = trainingData.user_exercises.map(
            userExercise => ({
              id: userExercise.id,
              userExerciseId: userExercise.id,
              exerciseId: userExercise.exercise.id,
              exerciseSeries: userExercise.exercises_series || [],
              name: userExercise.exercise.name,
              muscleGroupIds: userExercise.exercise.muscle_group || [],
            })
          );
          setExercises(mappedExercises);
        }
        setError(null);
      } catch (err) {
        console.error("Błąd pobierania treningu:", err);
        setError("Błąd pobierania treningu");
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, [id]);

  // Handle series value change (repeats or weight)
  const handleSerieChange = (exerciseId, serieId, field, value) => {
    const updatedExercises = exercises.map(ex => {
      if (ex.userExerciseId === exerciseId) {
        return {
          ...ex,
          exerciseSeries: ex.exerciseSeries.map(serie =>
            serie.id === serieId ? { ...serie, [field]: value } : serie
          ),
        };
      }
      return ex;
    });
    setExercises(updatedExercises);
  };

  // Handle +/- for repeats or weight
  const handleAdjustSerie = (exerciseId, serieId, field, delta) => {
    const updatedExercises = exercises.map(ex => {
      if (ex.userExerciseId === exerciseId) {
        return {
          ...ex,
          exerciseSeries: ex.exerciseSeries.map(serie =>
            serie.id === serieId
              ? {
                  ...serie,
                  [field]: Math.max(0, (serie[field] || 0) + delta),
                }
              : serie
          ),
        };
      }
      return ex;
    });
    setExercises(updatedExercises);
  };

  // Handle delete
  const handleDeleteExercise = async exerciseId => {
    setIsSaving(true);
    const result = await deleteExercise(exerciseId);

    if (result) {
      const updatedExercises = exercises.filter(
        ex => ex.userExerciseId !== exerciseId
      );
      setExercises(updatedExercises);
      StatusAlertService.showSuccess("Ćwiczenie usunięte");
    } else {
      StatusAlertService.showError("Błąd usuwania ćwiczenia");
    }

    setIsSaving(false);
  };

  // Handle save training changes
  const handleSaveChanges = async () => {
    // 1. Walidacja danych
    console.log("=== HANDLEAVE START ===");
    console.log("training:", training);
    console.log("exercises:", exercises);

    if (exercises.length === 0) {
      console.log("Brak ćwiczeń w treningu");
      StatusAlertService.showError(
        "Trening musi zawierać co najmniej jedno ćwiczenie"
      );
      return;
    }
    const przyklad = {
      id: 28,
      duration: 60,
      user_exercises: [
        {
          id: 15,
          exercises_series: [
            { id: 24, repeats: 8, weight: 12.5 },
            { id: 25, repeats: 10, weight: 15.0 },
            { id: 26, repeats: 6, weight: 10.0 },
          ],
        },
      ],
    };

    // const przyklad2 = {
    //   "id": 28,
    //   "user_exercises": [
    //     {
    //       "id": 15,
    //       "exercises_series": [
    //         {
    //           "id": 24,
    //           "repeats": 8,
    //           "weight": 12.5,
    //         },
    //         {
    //           "id": 25,
    //           "repeats": 10,
    //           "weight": 45,
    //         },
    //         {
    //           "id": 26,
    //           "repeats": 6,
    //           "weight": 10,
    //         },
    //       ],
    //     },
    //   ],
    // };

    // 2. Przygotowanie danych do wysłania
    const dataToSend = {
      id: training.id,
      //   name: training.name.trim(),
      user_exercises: exercises.map(ex => ({
        id: ex.userExerciseId,
        exercise: ex.exerciseId,
        exercises_series: ex.exerciseSeries.map(serie => ({
          id: serie.id,
          repeats: Math.max(0, Number(serie.repeats) || 0),
          weight: Math.max(0, Number(serie.weight) || 0),
        })),
      })),
    };

    console.log("=== DATA TO SEND ===");
    console.log(dataToSend);
    console.log("=== DATA TO SEND JSON ===");
    console.log(JSON.stringify(dataToSend, null, 2));

    // 3. Wysyłanie do backendu
    setIsSaving(true);
    try {
      const result = await updateTraining(id, dataToSend);

      console.log("=== UPDATE RESULT ===", result);

      if (result) {
        StatusAlertService.showSuccess("✅ Trening został zapisany pomyślnie!");

        // Opcjonalnie: redirect po zapisie
        // setTimeout(() => navigate("/training/list"), 1000);
      } else {
        StatusAlertService.showError("❌ Nie udało się zapisać treningu");
      }
    } catch (err) {
      console.error("Błąd zapisywania treningu:", err);
      StatusAlertService.showError("❌ Błąd serwera. Spróbuj ponownie.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!training) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">Trening nie został znaleziony</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Training Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
          {training.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {training.description}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            disabled={isSaving}
          >
            {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
          </Button>
          <Button variant="outlined" color="secondary">
            Anuluj
          </Button>
        </Stack>
      </Paper>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Ćwiczenia ({exercises.length})
          </Typography>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            Dodaj ćwiczenie
          </Button>
        </Stack>

        {exercises.length === 0 ? (
          <Alert severity="info">Brak ćwiczeń w tym treningu</Alert>
        ) : (
          <Stack spacing={2}>
            {exercises.map(exercise => (
              <Card key={exercise.userExerciseId} elevation={1}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {exercise.name}
                  </Typography>

                  {/* Exercise Series with inline editing */}
                  {exercise.exerciseSeries &&
                    Array.isArray(exercise.exerciseSeries) &&
                    exercise.exerciseSeries.length > 0 && (
                      <Box
                        sx={{
                          mb: 2,
                          p: 1.5,
                          backgroundColor: "#f5f5f5",
                          borderRadius: "8px",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 2 }}
                        >
                          Serie treningowe:
                        </Typography>
                        <Stack spacing={2}>
                          {exercise.exerciseSeries.map((serie, idx) => (
                            <Stack
                              key={serie.id}
                              direction="row"
                              alignItems="center"
                              spacing={2}
                              sx={{
                                p: 1,
                                backgroundColor: "white",
                                borderRadius: "6px",
                                border: "1px solid #e0e0e0",
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{ fontWeight: 600, minWidth: "60px" }}
                              >
                                Seria {idx + 1}
                              </Typography>

                              {/* Repeats section */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Typography variant="caption">
                                  Powtórzenia:
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleAdjustSerie(
                                      exercise.userExerciseId,
                                      serie.id,
                                      "repeats",
                                      -1
                                    )
                                  }
                                  sx={{ p: "4px" }}
                                >
                                  <RemoveCircleIcon fontSize="small" />
                                </IconButton>
                                <TextField
                                  type="number"
                                  value={serie.repeats}
                                  onChange={e =>
                                    handleSerieChange(
                                      exercise.userExerciseId,
                                      serie.id,
                                      "repeats",
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  sx={{
                                    width: "60px",
                                    "& input": {
                                      textAlign: "center",
                                      p: "4px",
                                    },
                                  }}
                                  size="small"
                                />
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleAdjustSerie(
                                      exercise.userExerciseId,
                                      serie.id,
                                      "repeats",
                                      1
                                    )
                                  }
                                  sx={{ p: "4px" }}
                                >
                                  <AddCircleIcon fontSize="small" />
                                </IconButton>
                              </Box>

                              {/* Weight section */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Typography variant="caption">
                                  Waga (kg):
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleAdjustSerie(
                                      exercise.userExerciseId,
                                      serie.id,
                                      "weight",
                                      -0.5
                                    )
                                  }
                                  sx={{ p: "4px" }}
                                >
                                  <RemoveCircleIcon fontSize="small" />
                                </IconButton>
                                <TextField
                                  type="number"
                                  value={serie.weight}
                                  onChange={e =>
                                    handleSerieChange(
                                      exercise.userExerciseId,
                                      serie.id,
                                      "weight",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  sx={{
                                    width: "70px",
                                    "& input": {
                                      textAlign: "center",
                                      p: "4px",
                                    },
                                  }}
                                  step="0.5"
                                  size="small"
                                />
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleAdjustSerie(
                                      exercise.userExerciseId,
                                      serie.id,
                                      "weight",
                                      0.5
                                    )
                                  }
                                  sx={{ p: "4px" }}
                                >
                                  <AddCircleIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Stack>
                          ))}
                        </Stack>
                      </Box>
                    )}
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      handleDeleteExercise(exercise.userExerciseId)
                    }
                    title="Usuń ćwiczenie"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
