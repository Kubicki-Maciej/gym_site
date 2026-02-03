import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import SnackbarAlert from "../Alerts/SnackbarAlert";

import CreateExerciseForm from "../Exercise/CreateExercise";

import "react-status-alert/dist/status-alert.css";

import Searcher from "../Core/Searcher";
import Notification from "../Core/Messager";

import Poput from "../Popout/Poput";
import useTraining from "./hooks/useTraining";

export default function CreateNewTraining() {
  const { error, loading, createTraining, updateMainTraining } = useTraining();

  const [popOutWindow, setPopOutWindow] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [trainingName, setTrainingName] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [trainingComment, setTrainingComment] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exerciseObject, setExerciseObject] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const [statusAlert, setStatusAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showAlert = (message, severity = "success") => {
    setStatusAlert({
      open: true,
      message,
      severity,
    });
  };
  const handleCloseAlert = () => {
    setStatusAlert({ ...statusAlert, open: false });
  };

  useEffect(() => {
    if (error) {
      setStatusAlert({
        open: true,
        message: error,
        severity: "error",
      });
    }
  }, [error]);

  const handleAddExercise = () => {
    if (!exerciseObject) {
      showAlert("Wybierz ćwiczenie", "warning");
      return;
    }
    if (exercises.some(ex => ex.id === exerciseObject.id)) {
      showAlert("To ćwiczenie jest już na liście", "warning");
      return;
    }
    setExercises([...exercises, exerciseObject]);
    setExerciseObject(null);
  };

  const handleDeleteExercise = index => {
    setExercises(exercises.filter((_, idx) => idx !== index));
  };

  const handleSaveTraining = async () => {
    if (!trainingName || !trainingComment || exercises.length === 0) {
      showAlert(
        "Wprowadź nazwę, komentarz oraz dodaj przynajmniej jedno ćwiczenie.",
        "error"
      );
      return;
    }

    try {
      if (selectedTraining) {
        // Aktualizacja treningu
        await updateMainTraining(trainingId, {
          description: trainingComment,
          exercise_groups: exercises.map(ex => ex.id),
        });
        showAlert("Trening zaktualizowany pomyślnie!", "success");
      } else {
        // Tworzenie nowego treningu
        await createTraining({
          name: trainingName,
          description: trainingComment,
          exercise_groups: exercises.map(ex => ex.id),
        });
        showAlert("Trening utworzony pomyślnie!", "success");
      }

      // Resetowanie formularza
      resetForm();
    } catch (err) {
      showAlert(err.message || "Coś poszło nie tak!", "error");
    }
  };

  const resetForm = () => {
    setTrainingName("");
    setTrainingComment("");
    setExercises([]);
    setTrainingId("");
    setSelectedTraining(null);
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
        }}
      >
        <Notification
          text={"To ćwiczenie jest już na liście."}
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
        />

        <TextField
          label="Nazwa treningu"
          value={trainingName}
          onChange={e => setTrainingName(e.target.value)}
          fullWidth
          disabled={loading}
        />

        <TextField
          label="Komentarz do treningu"
          value={trainingComment}
          onChange={e => setTrainingComment(e.target.value)}
          fullWidth
          multiline
          rows={3}
          disabled={loading}
        />

        <Stack direction="row" flexWrap="wrap">
          {exercises.map((exercise, index) => (
            <Chip
              sx={{ mr: 1, mb: 1 }}
              key={exercise.id || index}
              label={exercise.name}
              onDelete={() => handleDeleteExercise(index)}
              color="primary"
              size="small"
              disabled={loading}
            />
          ))}
        </Stack>

        <Searcher
          dataOutput={setExerciseObject}
          labelName="Szukaj ćwiczenia"
          apiAdress="exercise/exercise/all"
          disabled={loading}
        />
<Button
              onClick={handleAddExercise}
              disabled={loading}
              variant="outlined"
            >
              Dodaj ćwiczenie
            </Button>


        <Button
          variant="contained"
          color={selectedTraining ? "secondary" : "primary"}
          onClick={handleSaveTraining}
          disabled={loading}
          sx={{ position: "relative" }}
        >
          {loading ? (
            <>
              <CircularProgress
                size={20}
                sx={{
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-10px",
                }}
              />
              <span style={{ visibility: "hidden" }}>
                {selectedTraining ? "Zaktualizuj trening" : "Utwórz trening"}
              </span>
            </>
          ) : selectedTraining ? (
            "Zaktualizuj trening"
          ) : (
            "Utwórz trening"
          )}
        </Button>
      </Box>

      <SnackbarAlert
        open={statusAlert.open}
        onClose={handleCloseAlert}
        severity={statusAlert.severity}
        message={statusAlert.message}
      />
    </>
  );
}
