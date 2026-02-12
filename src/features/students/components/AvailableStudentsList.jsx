// src/features/students/components/AvailableStudentsList.jsx
import React from "react";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { StudentCard } from "./StudentCard";

export const AvailableStudentsList = ({
  students,
  loading = false,
  error = null,
  onAddStudent,
  myStudentIds = [],
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!students || students.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="textSecondary">
          Brak dostępnych studentów do dodania
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Dostępni studenci ({students.length})
      </Typography>
      <Grid container spacing={2}>
        {students.map(student => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={student.id}>
            <StudentCard
              student={student}
              isAdded={myStudentIds.includes(student.id)}
              onAdd={onAddStudent}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
