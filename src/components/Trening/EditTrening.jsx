import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";

import CreateExerciseForm from "../Exercise/CreateExercise";
import Notification from "../Core/Messager";
import Searcher from "../Core/Searcher";

import SnackbarAlert from "../Alerts/SnackbarAlert";
import Poput from "../Popout/Poput";
import useTraining from "../../hooks/useTraining";

export default function EditTrening() {
  const { error, loading, updateMainTraining } = useTraining();

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

  // Obsługa błędów z hooka
  useEffect(() => {
    if (error) {
      setStatusAlert({
        open: true,
        message: error,
        severity: "error",
      });
    }
  }, [error]);

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

  const handleSelectTraining = training => {
    if (training) {
      setSelectedTraining(training);
      setTrainingName(training.name);
      setTrainingId(training.id);
      setTrainingComment(training.description);
      setExercises(training.exercise_groups || []);
    } else {
      resetForm();
    }
  };

  const handleSaveTraining = async () => {
    if (!trainingComment || exercises.length === 0) {
      showAlert(
        "Wprowadź komentarz oraz dodaj przynajmniej jedno ćwiczenie.",
        "error"
      );
      return;
    }

    if (!selectedTraining) {
      showAlert("Wybierz trening do edycji", "error");
      return;
    }

    try {
      // ("TrainingId:", trainingId, typeof trainingId);
      // ("Exercises:", exercises);
      // (
      //   "Exercise groups IDs:",
      //   exercises.map(ex => ex.id)
      // );
      await updateMainTraining({
        trainingId: trainingId,
        description: trainingComment,
        exercise_groups: exercises.map(ex => ex.id),
      });
      showAlert("Trening zaktualizowany pomyślnie!", "success");
      resetForm();
    } catch (err) {
      showAlert(err.message || "Nie udało się zaktualizować treningu", "error");
    }
  };

  const resetForm = () => {
    setSelectedTraining(null);
    setTrainingName("");
    setTrainingId("");
    setTrainingComment("");
    setExercises([]);
    setExerciseObject(null);
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

        <Searcher
          dataOutput={handleSelectTraining}
          labelName="Szukaj treningu"
          apiAdress="training/all"
          disabled={loading}
        />

        {selectedTraining && (
          <>
            <TextField
              label="Nazwa treningu"
              value={trainingName}
              disabled
              fullWidth
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
              color="secondary"
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
                    Zaktualizuj trening
                  </span>
                </>
              ) : (
                "Zaktualizuj trening"
              )}
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={resetForm}
              disabled={loading}
            >
              Anuluj edycję
            </Button>
          </>
        )}
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
