import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import useUserTraining from "../../hooks/useUserTraining";
import { StatusAlertService } from "react-status-alert";

export default function WorkoutDetail() {
  const { id } = useParams();
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
  const [trainingEdited, setTrainingEdited] = useState(false);

  // Edit modal state
  const [editingExercise, setEditingExercise] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
  });

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

        // Map user_exercises and fetch exercise details for each
        if (
          trainingData.user_exercises &&
          Array.isArray(trainingData.user_exercises)
        ) {
          const exercisesWithDetails = await Promise.all(
            trainingData.user_exercises.map(async userExercise => {
              // Fetch full exercise details using exercise ID
              const exerciseDetails = await getExerciseById(
                userExercise.exercise
              );
              return {
                id: userExercise.id,
                userExerciseId: userExercise.id,
                exerciseId: userExercise.exercise,
                exerciseSeries: userExercise.exercises_series || [],
                name:
                  exerciseDetails?.name || `Ćwiczenie ${userExercise.exercise}`,
                description: exerciseDetails?.description || "",
                muscleGroups: exerciseDetails?.muscle_groups || [],
              };
            })
          );
          setExercises(exercisesWithDetails);
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

  // Handle edit click
  const handleEditClick = exercise => {
    setEditingExercise(exercise);
    setEditFormData({
      name: exercise.name || "",
      description: exercise.description || "",
    });
    setOpenEditDialog(true);
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!editFormData.name.trim()) {
      StatusAlertService.showError("Nazwa ćwiczenia nie może być pusta");
      return;
    }

    setIsSaving(true);
    const result = await updateExercise(editingExercise.id, editFormData);

    if (result) {
      const updatedExercises = exercises.map(ex =>
        ex.id === editingExercise.id ? { ...ex, ...editFormData } : ex
      );
      setExercises(updatedExercises);
      StatusAlertService.showSuccess("Ćwiczenie zaktualizowane");
    } else {
      StatusAlertService.showError("Błąd aktualizacji ćwiczenia");
    }

    setIsSaving(false);
    setOpenEditDialog(false);
    setEditingExercise(null);
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
    setIsSaving(true);
    const result = await updateTraining(id, {
      name: training.name,
      description: training.description,
      user_exercises: exercises.map(ex => ({
        id: ex.userExerciseId,
        exercise: ex.exerciseId,
        exercises_series: ex.exerciseSeries,
      })),
    });

    if (result) {
      StatusAlertService.showSuccess("Trening zapisany");
      setTrainingEdited(false);
    } else {
      StatusAlertService.showError("Błąd zapisywania treningu");
    }

    setIsSaving(false);
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

      {/* Exercises Section */}
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
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {exercise.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {exercise.description || "Brak opisu"}
                  </Typography>

                  {/* Muscle groups if available */}
                  {exercise.muscleGroups &&
                    Array.isArray(exercise.muscleGroups) &&
                    exercise.muscleGroups.length > 0 && (
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        {exercise.muscleGroups.map(muscle => (
                          <Typography
                            key={muscle.id}
                            variant="caption"
                            sx={{
                              backgroundColor: "#e0e0e0",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: "16px",
                            }}
                          >
                            {muscle.name}
                          </Typography>
                        ))}
                      </Stack>
                    )}

                  {/* Exercise Series */}
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
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Serie treningowe:
                        </Typography>
                        <Stack spacing={1}>
                          {exercise.exerciseSeries.map((serie, idx) => (
                            <Box
                              key={serie.id}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "0.9rem",
                              }}
                            >
                              <Typography variant="caption">
                                <strong>Seria {idx + 1}:</strong>
                              </Typography>
                              <Typography variant="caption">
                                Powtórzenia: {serie.repeats} | Waga:{" "}
                                {serie.weight} kg
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    )}
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditClick(exercise)}
                    title="Edytuj ćwiczenie"
                  >
                    <EditIcon />
                  </IconButton>
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

      {/* Edit Exercise Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edytuj ćwiczenie</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Nazwa ćwiczenia"
            value={editFormData.name}
            onChange={e =>
              setEditFormData({ ...editFormData, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Opis"
            value={editFormData.description}
            onChange={e =>
              setEditFormData({ ...editFormData, description: e.target.value })
            }
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} disabled={isSaving}>
            Anuluj
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            color="primary"
            disabled={isSaving}
          >
            {isSaving ? "Zapisywanie..." : "Zapisz"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
