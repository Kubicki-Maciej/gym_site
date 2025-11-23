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

export const StudentList = ({
  students,
  loading = false,
  error = null,
  onRemoveStudent,
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
          Nie masz jeszcze żadnych studentów
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <List>
        {students.map((student, index) => (
          <ListItem
            key={student.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onRemoveStudent(student.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            }
            divider={index !== students.length - 1}
          >
            <ListItemText
              primary={
                `${student.first_name} ${student.last_name}`.trim() ||
                student.email
              }
              secondary={student.email}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
