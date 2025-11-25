// src/features/students/components/StudentList.jsx
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { FitnessCenter } from "@mui/icons-material";
import SingleStudent from "../../users/components/SingleStudent";

export const StudentList = ({
  students,
  loading = false,
  error = null,
  onRemoveStudent,
}) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!students || students.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography color="textSecondary">
          Nie masz jeszcze żadnych studentów
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <List>
        {students.map((student, index) => (
          <SingleStudent
            key={student.id}
            student={student}
            index={index}
            onRemoveStudent={onRemoveStudent}
            totalStudents={students.length}
          />
        ))}
      </List>
    </Paper>
  );
};
