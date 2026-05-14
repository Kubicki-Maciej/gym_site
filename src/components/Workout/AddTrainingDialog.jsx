import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";

export default function AddTrainingDialog({
  open,
  onClose,
  onAdd,
  trainingsList,
  existingTraining = null,
}) {
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");

  // Filtruj dostępne treningi (wyklucz aktualny trening)
  const availableTrainings = trainingsList.filter(
    training => training.id !== existingTraining,
  );

  const handleAdd = async () => {
    if (!selectedId) {
      setError("Wybierz trening");
      return;
    }

    try {
      await onAdd(Number(selectedId));
      handleClose();
    } catch (err) {
      setError("Błąd przy dodawaniu treningu");
    }
  };

  const handleClose = () => {
    setSelectedId("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Dodaj trening</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
            {error}
          </Alert>
        )}

        {availableTrainings.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            Brak dostępnych treningów do dodania
          </Alert>
        ) : (
          <select
            value={selectedId}
            onChange={e => {
              setSelectedId(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <option value="">-- Wybierz trening --</option>
            {availableTrainings.map(training => (
              <option key={training.id} value={training.id}>
                {training.name}
              </option>
            ))}
          </select>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button
          onClick={handleAdd}
          disabled={!selectedId || availableTrainings.length === 0}
          variant="contained"
        >
          Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
