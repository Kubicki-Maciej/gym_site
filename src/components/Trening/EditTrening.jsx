import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Chip,
  Stack,
} from "@mui/material";

import CreateExerciseForm from "../Exercise/CreateExercise";

import DeleteIcon from "@mui/icons-material/Delete";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import "react-status-alert/dist/status-alert.css";

import Notification from "../Core/Messager";
import Searcher from "../Core/Searcher";
import NavigateButton from "../Buttons/MainButton";

import Poput from "../Popout/Poput";
import { Create } from "@mui/icons-material";
import { API_URL } from "../../config";

export default function EditTrening() {
  const [popOutWindow, setPopOutWindow] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [trainingName, setTrainingName] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [trainingComment, setTrainingComment] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exerciseObject, setExerciseObject] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const errorMessage = text =>
    StatusAlertService.showError(text || "Coś poszło nie tak!");
  const successMessage = text =>
    StatusAlertService.showSuccess(text || "Operacja zakończona sukcesem!");

  const sendTrainingToApi = async dataToSend => {
    try {
      const response = await fetch(`${API_URL}training/create_training`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Błąd wysyłania na serwer");
      await response.json();
      successMessage("Trening utworzony pomyślnie!");
    } catch (error) {
      console.error(error);
      errorMessage("Nie udało się utworzyć treningu.");
    }
  };

  const updateTrainingToApi = async dataToSend => {
    try {
      const response = await fetch(`${API_URL}training/create_training`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Błąd aktualizacji na serwerze");
      await response.json();
      successMessage("Trening zaktualizowany pomyślnie!");
    } catch (error) {
      console.error(error);
      errorMessage("Nie udało się zaktualizować treningu.");
    }
  };

  const handleAddExercise = () => {
    if (!exerciseObject) return;
    if (exercises.some(ex => ex.id === exerciseObject.id)) {
      setOpenNotification(true);
      return;
    }
    setExercises([...exercises, exerciseObject]);
    setExerciseObject(null);
  };

  const handleDeleteExercise = index => {
    setExercises(exercises.filter((_, idx) => idx !== index));
  };

  const handleSaveTraining = () => {
    if (!trainingName || !trainingComment || exercises.length === 0) {
      errorMessage(
        "Wprowadź nazwę, komentarz oraz dodaj przynajmniej jedno ćwiczenie."
      );
      return;
    }

    const payload = selectedTraining
      ? {
          user_training_id: trainingId,
          description: trainingComment,
          exercise_groups: exercises.map(ex => ex.id),
        }
      : {
          name: trainingName,
          description: trainingComment,
          exercise_groups: exercises.map(ex => ex.id),
        };

    selectedTraining
      ? updateTrainingToApi(payload)
      : sendTrainingToApi(payload);
  };

  const handleSelectTraining = training => {
    if (training) {
      setSelectedTraining(training);
      setTrainingName(training.name);
      setTrainingId(training.id);
      setTrainingComment(training.description);
      setExercises(training.exercise_groups);
    } else {
      setSelectedTraining(null);
      setTrainingName("");
      setTrainingId("");
      setTrainingComment("");
      setExercises([]);
    }
  };

  return (
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
        apiAdress={`${API_URL}training/all`}
      />
      <TextField
        label="Komentarz do treningu"
        value={trainingComment}
        onChange={e => setTrainingComment(e.target.value)}
        fullWidth
        multiline
        rows={3}
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
          />
        ))}
      </Stack>
      <Searcher
        dataOutput={setExerciseObject}
        labelName="Szukaj ćwiczenia"
        apiAdress={`${API_URL}exercise/exercise/all`}
      />
      <Button onClick={handleAddExercise}>Dodaj ćwiczenie</Button>

      <Button
        variant="contained"
        color={selectedTraining ? "secondary" : "primary"}
        onClick={handleSaveTraining}
      >
        {selectedTraining ? "Zaktualizuj trening" : "Utwórz trening"}
      </Button>

      <StatusAlert />
      <Button variant="contained" onClick={() => setPopOutWindow(true)}>
        Stwórz nowe ćwiczenie
      </Button>
      <Poput
        component={<CreateExerciseForm />}
        setWindowProperty={setPopOutWindow}
        windowProperty={popOutWindow}
      />
    </Box>
  );
}
