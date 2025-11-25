import React from "react";
import { useNavigate } from "react-router-dom";
import useUserUpcomingTraining from "../hooks/useUserUpcomingTraining";
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

export default function SingleStudent({
  student,
  index,
  onRemoveStudent,
  totalStudents, // ✅ Przyjmij
}) {
  console.log(student);
  const { loading, trainingList } = useUserUpcomingTraining(student.id);
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ListItem
      secondaryAction={
        <Box>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onRemoveStudent(student.id)} // ✅ To powinno działać
            color="error"
          >
            <PersonRemoveIcon />
          </IconButton>
          {trainingList && trainingList.length > 0 ? (
            <IconButton
              color="success"
              onClick={() =>
                navigate(`/training/details/${trainingList[0].id}`)
              }
            >
              <FitnessCenter />
            </IconButton>
          ) : (
            <IconButton disabled={true} color="">
              <FitnessCenter />
            </IconButton>
          )}
        </Box>
      }
      divider={index !== totalStudents - 1} // ✅ Poprawka
    >
      <ListItemText
        primary={
          `${student.first_name} ${student.last_name}`.trim() || student.email
        }
        secondary={student.email}
      />
    </ListItem>
  );
}
