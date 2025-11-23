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
// import { AvailableStudentsList } from "./AvailableStudentsList";
import { AvailableStudentsList } from "./AvailableStudentsList";

export const AddStudentModal = ({
  open,
  onClose,
  availableStudents,
  loading = false,
  error = null,
  onAddStudent,
  myStudentIds = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = availableStudents.filter(
    student =>
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Dodaj studenta</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Szukaj studenta..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            size="small"
          />

          {error && <Alert severity="error">{error}</Alert>}

          {loading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress />
            </Box>
          ) : (
            <AvailableStudentsList
              students={filteredStudents}
              loading={false}
              onAddStudent={onAddStudent}
              myStudentIds={myStudentIds}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  );
};
