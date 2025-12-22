// src/features/students/components/AddStudentModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

import CreateNewStudent from "./CreateNewStudent";

export const AddStudentModal = ({
  open,
  onClose,
  availableStudents,
  loading = false,
  error = null,
  onAddStudent,
  onStudentCreated,
}) => {
  const handleStudentCreated = () => {
    // Wywołaj callback z parent (StudentPage)
    if (onStudentCreated) {
      onStudentCreated();
    }
    // Zamknij modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Dodaj studenta</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {error && <Alert severity="error">{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          ) : (
            <CreateNewStudent onStudentCreated={handleStudentCreated} />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  );
};
