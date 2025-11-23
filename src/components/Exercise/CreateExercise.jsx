import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Autocomplete,
  Chip,
  Stack,
  Paper,
  Container,
} from "@mui/material";

import Searcher from "../Core/Searcher";
import StatusAlert, { StatusAlertService } from "react-status-alert";
import { API_URL } from "../../config";
import api from "../../api/client";

export default function CreateExercise() {
  const errorMessage = text =>
    StatusAlertService.showError(text || "Coś poszło nie tak!");
  const successMessage = text =>
    StatusAlertService.showSuccess(text || "Operacja zakończona sukcesem!");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [selectedMuscles, setSelectedMuscles] = useState([]);

  const [muscleGroupOptions, setMuscleGroupOptions] = useState([]);
  const [exerciseObject, setExerciseObject] = useState({});
  const [muscleGroups, setMuscleGroups] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMuscleGroups() {
    console.log("halo ladujemy ?");
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(`exercise/muscles/all`);
      console.log("Muscles response:", data);
      const muscles = data.results || data || [];
      setMuscleGroupOptions(muscles);
    } catch (err) {
      setError(err.message);
      setMuscleGroupOptions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMuscleGroups();
  }, []);

  function getExerciseFromSercher(exercise) {
    if (exercise) {
      console.log("exercise.muscle_group");
      console.log(exercise.muscle_group);
      setExerciseObject(exercise);
      setExerciseName(exercise.name);
      setExerciseDescription(exercise.description);
      setMuscleGroups(
        muscleGroupOptions.filter(group =>
          exercise.muscle_group.includes(group.id)
        )
      );
    } else {
      setExerciseName("");
      setExerciseDescription("");
      setMuscleGroups([]);
    }
  }

  useEffect(() => {
    console.log("Zaktualizowany obiekt ćwiczenia:", exerciseObject);
  }, [exerciseObject]);

  const handleNameChange = event => {
    setExerciseName(event.target.value);
  };
  const handleDescriptionChange = event => {
    setExerciseDescription(event.target.value);
  };

  const handleMuscleGroupsChange = (event, value) => {
    console.log(muscleGroups);
    setMuscleGroups(value);
  };
  async function createNewExercise() {
    if (exerciseName && muscleGroups.length > 0) {
      const muscleGroupsOnlyId = array => array.every(Number.isInteger);
      console.log(muscleGroups);
      const object = {
        name: exerciseName,
        description: exerciseDescription,
        muscle_group: muscleGroups.map(group => group.id),
      };
      console.log(object);

      try {
        const response = await api.post(`exercise/exercise/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        });

        if (!response.ok) {
          throw new Error("Nie udało się wysłać danych na serwer");
        }

        const data = await response.json();
        console.log("Dane wysłane pomyślnie:", data);
        successMessage("Ćwiczenie utworzone pomyślnie!");
      } catch (error) {
        console.error("Błąd podczas wysyłania danych:", error);
        errorMessage("Nie udało się utworzyć ćwiczenia.");
      }
    } else {
      errorMessage("Proszę uzupełnić wszystkie wymagane pola.");
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600}>
            Dodaj nowe ćwiczenie
          </Typography>

          <TextField
            label="Nazwa ćwiczenia"
            value={exerciseName}
            onChange={e => setExerciseName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Opis ćwiczenia"
            value={exerciseDescription}
            onChange={e => setExerciseDescription(e.target.value)}
            fullWidth
            multiline
            minRows={3}
            helperText="Opcjonalnie opisz sprzęt, pozycję, itp."
          />

          <Autocomplete
            multiple
            onChange={handleMuscleGroupsChange}
            options={muscleGroupOptions}
            getOptionLabel={option => option.name}
            value={muscleGroups}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={params => (
              <TextField
                {...params}
                label="Rodzaj partii mięśniowe"
                variant="outlined"
                placeholder="Wybierz ..."
              />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={createNewExercise}
            size="large"
          >
            Zapisz ćwiczenie
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
