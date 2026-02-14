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
// import useUserTraining from "../../hooks/useUserTraining";
import useUserTraining from "../../hooks/useUserTraining";
import { StatusAlertService } from "react-status-alert";

export default function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getUserDataTraining,
    getAllExercises,
    updateTraining,
    createSingleRep,
    deleteSeriesExercise,
    deleteSingleExercise,
  } = useUserTraining();

  const [training, setTraining] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [allExercises, setAllExercises] = useState([]);

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
            }),
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

  // Fetch all available exercises for dialog
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const res = await getAllExercises(); // lub getAllExercises()
        if (res) setAllExercises(res);
      } catch (e) {
        console.error("Błąd pobierania ćwiczeń:", e);
      }
    };
    fetchAllExercises();
  }, []);

  // --- Serie logic ---
  const handleSerieChange = (exerciseId, serieId, field, value) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.userExerciseId === exerciseId
          ? {
              ...ex,
              exerciseSeries: ex.exerciseSeries.map(serie =>
                serie.id === serieId ? { ...serie, [field]: value } : serie,
              ),
            }
          : ex,
      ),
    );
  };

  const handleAdjustSerie = (exerciseId, serieId, field, delta) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.userExerciseId === exerciseId
          ? {
              ...ex,
              exerciseSeries: ex.exerciseSeries.map(serie =>
                serie.id === serieId
                  ? {
                      ...serie,
                      [field]: Math.max(0, (serie[field] || 0) + delta),
                    }
                  : serie,
              ),
            }
          : ex,
      ),
    );
  };

  const handleAddSerie = async exerciseId => {
    const exercise = exercises.find(ex => ex.userExerciseId === exerciseId);
    const last = exercise?.exerciseSeries.at(-1);

    const payload = {
      idSeriesExercise: exerciseId,
      weight: last?.weight ?? 0,
      repeats: last?.repeats ?? 12,
    };

    const returnedRep = await createSingleRep(payload);
    setExercises(prev =>
      prev.map(ex => {
        if (ex.userExerciseId === exerciseId) {
          const lastRep = ex.exerciseSeries.at(-1);

          const newSerie = {
            id: returnedRep.id,
            repeats: lastRep.repeats || 12,
            weight: lastRep.weight || 0,
          };
          return { ...ex, exerciseSeries: [...ex.exerciseSeries, newSerie] };
        }
        return ex;
      }),
    );
  };

  const handleRemoveSerie = (exerciseId, serieId) => {
    ("tutaj dzieje sie magia");
    serieId;
    setExercises(prev =>
      prev.map(ex =>
        ex.userExerciseId === exerciseId
          ? {
              ...ex,
              exerciseSeries: ex.exerciseSeries.filter(
                serie => serie.id !== serieId,
              ),
            }
          : ex,
      ),
    );
    deleteSingleExercise(serieId);
  };

  // // --- Exercises logic ---
  // const handleAddExercise = exercise => {
  //   ("--- Exercises logic ---");
  //   (exercise);

  //   const newExercise = {
  //     userExerciseId: `temp-${Date.now()}`,
  //     exerciseId: exercise.id,
  //     name: exercise.name,
  //     exerciseSeries: [
  //       { id: `temp-serie-${Date.now()}`, repeats: 10, weight: 0 },
  //     ],
  //   };
  //   (newExercise);
  //   setExercises(prev => [...prev, newExercise]);
  // };

  const handleAddExercise = data => {
    ("--- Exercises logic ---");
    data;

    const newExercise = {
      userExerciseId: data.id || `temp-${Date.now()}`,
      exerciseId: data.exercise,
      name: data.name,
      exerciseSeries: data.exercises_series || [],
    };
    newExercise;
    setExercises(prev => [...prev, newExercise]);
  };

  const handleDeleteExercise = async exerciseId => {
    setIsSaving(true);
    ("usuwamy cwiczenie ");
    const result = await deleteSeriesExercise(exerciseId);
    if (result) {
      setExercises(prev => prev.filter(ex => ex.userExerciseId !== exerciseId));
      StatusAlertService.showSuccess("Ćwiczenie usunięte");
    } else {
      StatusAlertService.showError("Błąd usuwania ćwiczenia");
    }
    setIsSaving(false);
  };

  const handleSaveChanges = async () => {
    if (exercises.length === 0) {
      StatusAlertService.showError(
        "Trening musi zawierać co najmniej jedno ćwiczenie",
      );
      return;
    }

    const dataToSend = {
      id: training.id,
      user_exercises: exercises.map(ex => ({
        id: ex.userExerciseId.toString().startsWith("temp")
          ? null
          : ex.userExerciseId,
        exercise: ex.exerciseId,
        exercises_series: ex.exerciseSeries.map(serie => ({
          id: serie.id.toString().startsWith("temp") ? null : serie.id,
          repeats: Math.max(0, Number(serie.repeats) || 0),
          weight: Math.max(0, Number(serie.weight) || 0),
        })),
      })),
    };

    ("=== DATA TO SEND ===", dataToSend);

    setIsSaving(true);
    try {
      const result = await updateTraining(id, dataToSend);
      if (result) {
        StatusAlertService.showSuccess("✅ Trening został zapisany pomyślnie!");
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

  if (loading)
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

  if (error)
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!training)
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">Trening nie został znaleziony</Alert>
      </Box>
    );

  return (
    <Box sx={{ p: 2 }}>
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Anuluj
          </Button>
        </Stack>
      </Paper>

      {/* Exercises */}
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
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => setIsAddExerciseOpen(true)}
          >
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

                  {exercise.exerciseSeries?.length > 0 && (
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

                            {/* Powtórzenia */}
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
                                    -1,
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
                                    parseInt(e.target.value) || 0,
                                  )
                                }
                                sx={{
                                  width: "60px",
                                  "& input": { textAlign: "center", p: "4px" },
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
                                    1,
                                  )
                                }
                                sx={{ p: "4px" }}
                              >
                                <AddCircleIcon fontSize="small" />
                              </IconButton>
                            </Box>

                            {/* Waga */}
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
                                    -0.5,
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
                                    parseFloat(e.target.value) || 0,
                                  )
                                }
                                sx={{
                                  width: "70px",
                                  "& input": { textAlign: "center", p: "4px" },
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
                                    0.5,
                                  )
                                }
                                sx={{ p: "4px" }}
                              >
                                <AddCircleIcon fontSize="small" />
                              </IconButton>
                            </Box>

                            {/* Usuń serię */}
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() =>
                                handleRemoveSerie(
                                  exercise.userExerciseId,
                                  serie.id,
                                )
                              }
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        ))}
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={() =>
                            handleAddSerie(exercise.userExerciseId)
                          }
                          size="small"
                        >
                          Dodaj serię
                        </Button>
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

      {/* Add exercise dialog */}
      <AddExerciseDialog
        open={isAddExerciseOpen}
        onClose={() => setIsAddExerciseOpen(false)}
        onAdd={handleAddExercise}
        exercisesList={allExercises}
        idUserTraining={id}
        existingExercises={exercises} // Przekaż istniejące ćwiczenia
      />
    </Box>
  );
}

function AddExerciseDialog({
  open,
  onClose,
  onAdd,
  exercisesList,
  idUserTraining,
  existingExercises = [], // Dodaj ten prop
}) {
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");
  const { addExerciseToTraining } = useUserTraining();

  // Filtruj już istniejące ćwiczenia
  const availableExercises = exercisesList.filter(
    exercise => !existingExercises.some(ex => ex.exerciseId === exercise.id),
  );

  const handleAdd = async () => {
    // Sprawdź czy ćwiczenie już istnieje
    if (existingExercises.some(ex => ex.exerciseId === Number(selectedId))) {
      setError("To ćwiczenie już zostało dodane do tego treningu");
      return;
    }

    const result = await addExerciseToTraining(idUserTraining, selectedId);
    ("result");
    result;
    if (!result) {
      setError("Błąd przy dodawaniu ćwiczenia");
      return;
    }

    const exercise = exercisesList.find(e => e.id === Number(selectedId));
    ("Adding exercise ID:", selectedId);
    ("idUserTraining:", idUserTraining);
    exercise;
    if (exercise) onAdd(result);
    setSelectedId("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setSelectedId("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Dodaj nowe ćwiczenie</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
            {error}
          </Alert>
        )}

        {availableExercises.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            Wszystkie dostępne ćwiczenia już zostały dodane do tego treningu
          </Alert>
        ) : (
          <TextField
            select
            label="Wybierz ćwiczenie"
            fullWidth
            value={selectedId}
            onChange={e => {
              setSelectedId(e.target.value);
              setError(""); // Wyczyść błąd gdy użytkownik zmieni wybór
            }}
            SelectProps={{ native: true }}
            sx={{ mt: 2 }}
          >
            <option value="">-- Wybierz ćwiczenie --</option>
            {availableExercises.map(exercise => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button
          onClick={handleAdd}
          disabled={!selectedId || availableExercises.length === 0}
          variant="contained"
        >
          Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
