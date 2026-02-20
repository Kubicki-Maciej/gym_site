import React from "react";
import { useNavigate } from "react-router-dom";
import useUserUpcomingTraining from "../hooks/useUserUpcomingTraining";
import {
  ListItem,
  ListItemText,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import StudentButton from "features/statistics/Buttons/StudentButton";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { FitnessCenter } from "@mui/icons-material";

import ConfirmDeleteDialog from "../../../components/Dialog/ConfirmDeleteDialog";
import useConfirmDialog from "../../../hooks/useConfirmDialog";

export default function SingleStudent({
  student,
  index,
  onRemoveStudent,
  totalStudents,
}) {
  const navigate = useNavigate();
  const { open, dialogData, openDialog, closeDialog, handleConfirm } =
    useConfirmDialog();

  const { loading, trainingList } = useUserUpcomingTraining(student.id);

  //

  const handleRemoveClick = () => {
    const studentName = `${student.first_name} ${student.last_name}`.trim();
    openDialog(
      "Potwierdzenie usunięcia",
      `Czy na pewno chcesz usunąć studenta ${studentName}? Ta akcja nie może być cofnięta.`,
      () => onRemoveStudent(student.id),
    );
  };
  const handleViewTraining = () => {
    if (trainingList && trainingList.length > 0) {
      navigate(`/training/details/${trainingList[0].id}`);
    }
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <ListItem
        secondaryAction={
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <StudentButton student={student} />
              {trainingList && trainingList.length > 0 ? (
                <IconButton
                  size="small"
                  color="success"
                  onClick={handleViewTraining}
                  title="Wyświetl trening"
                >
                  <FitnessCenter />
                </IconButton>
              ) : (
                <IconButton size="small" disabled={true} title="Brak treningów">
                  <FitnessCenter />
                </IconButton>
              )}
            </Box>
          </Box>
        }
        divider={index !== totalStudents - 1}
      >
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleRemoveClick}
          color="error"
          title="Usuń studenta"
        >
          <PersonRemoveIcon />
        </IconButton>
        <ListItemText
          sx={{
            marginLeft: "16px",
          }}
          primary={
            `${student.first_name} ${student.last_name}`.trim() || student.email
          }
          secondary={student.supose_name}
        />
      </ListItem>

      <ConfirmDeleteDialog
        open={open}
        title={dialogData.title}
        message={dialogData.message}
        onConfirm={handleConfirm}
        onCancel={closeDialog}
      />
    </>
  );
}
