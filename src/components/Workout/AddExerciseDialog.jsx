import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { StatusAlertService } from "react-status-alert";
import useTraining from "../../hooks/useTraining";
// import useUserTraining from "../../hooks/useUserTraining";

export default function AddExerciseDialog({
  open,
  onClose,
  onAdd,
  exercisesList,
  idUserTraining,
  existingExercises = [],
}) {
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");
  const { addExerciseToTraining } = useTraining();

  const availableExercises = exercisesList.filter(
    exercise => !existingExercises.some(ex => ex.exerciseId === exercise.id)
  );

  const handleAdd = async () => {
    if (existingExercises.some(ex => ex.exerciseId === Number(selectedId))) {
      setError("To ćwiczenie już zostało dodane do tego treningu");
      return;
    }

    try {
      const result = await addExerciseToTraining(idUserTraining, selectedId);

      if (!result) {
        setError("Błąd przy dodawaniu ćwiczenia");
        return;
      }

      onAdd(result);
      StatusAlertService.showSuccess("✅ Ćwiczenie dodane pomyślnie!");
      handleClose();
    } catch (err) {
      setError("Błąd serwera. Spróbuj ponownie.");
      StatusAlertService.showError("❌ Błąd przy dodawaniu ćwiczenia");
    }
  };

  const handleClose = () => {
    setSelectedId("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
              setError("");
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
