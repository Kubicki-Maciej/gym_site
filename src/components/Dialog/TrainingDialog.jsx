import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useTraining from "hooks/useTraining";
import SnackbarAlert from "components/Alerts/SnackbarAlert";

export default function TrainingDialog({
  open,
  onClose,
  selectedExercises,
  onRemove,
}) {
  const [name, setName] = useState("");
  const { error, loading, createTraining } = useTraining();
  const [statusAlert, setStatusAlert] = useState({
    open: false,
    message: "Trening Dodany",
    severity: "success",
    autoHideDuration: 3000,
  });

  const handleSave = () => {
    if (!name.trim() || selectedExercises.length === 0) return;

    createTraining({
      name: name,
      description: "-",
      exercise_groups: selectedExercises.map(ex => ex.id),
    });
    setStatusAlert({ ...statusAlert, open: true });
  };
  const handleCloseAlert = () => {
    setStatusAlert({ ...statusAlert, open: false });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Twój trening</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Nazwa treningu"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <List>
          {selectedExercises.map(ex => (
            <ListItem
              key={ex.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => onRemove(ex.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Typography>{ex.name}</Typography>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
        <Button variant="contained" onClick={handleSave} disabled={!name}>
          Zapisz
        </Button>
      </DialogActions>
      <SnackbarAlert
        open={statusAlert.open}
        onClose={handleCloseAlert}
        severity={statusAlert.severity}
        message={statusAlert.message}
        autoHideDuration={statusAlert.autoHideDuration}
      />
    </Dialog>
  );
}
