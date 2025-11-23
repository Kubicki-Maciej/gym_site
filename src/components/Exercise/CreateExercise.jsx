import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Autocomplete,
  Stack,
  Paper,
  Container,
  CircularProgress,
} from "@mui/material";

import SnackbarAlert from "../Alerts/SnackbarAlert";
import Searcher from "../Core/Searcher";
import useGeneral from "../../hooks/useGeneral";
import useExercise from "./hooks/useExercise";

export default function CreateExercise() {
  const { createExercise, error, loading } = useExercise();
  const { getAllMuscles, errorGeneral, loadingGeneral } = useGeneral();

  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [muscleGroupOptions, setMuscleGroupOptions] = useState([]);
  const [exerciseObject, setExerciseObject] = useState(null);

  const [statusAlert, setStatusAlert] = useState({
    open: false,
    message: "",
    severity: "success",
    autoHideDuration: 4000,
  });

  // Pobranie grup mięśniowych przy załadowaniu
  useEffect(() => {
    const loadMuscleGroups = async () => {
      try {
        const data = await getAllMuscles();
        setMuscleGroupOptions(data);
      } catch (err) {
        showAlert("Nie udało się pobrać grup mięśniowych", "error");
      }
    };

    loadMuscleGroups();
  }, [getAllMuscles]);

  useEffect(() => {
    if (error) {
      setStatusAlert({
        open: true,
        message: error,
        severity: "error",
        autoHideDuration: 5000,
      });
    }
  }, [error]);

  const showAlert = (
    message,
    severity = "success",
    autoHideDuration = 4000
  ) => {
    setStatusAlert({
      open: true,
      message,
      severity,
      autoHideDuration,
    });
  };

  const handleCloseAlert = () => {
    setStatusAlert({ ...statusAlert, open: false });
  };

  const getExerciseFromSearcher = exercise => {
    if (exercise) {
      setExerciseObject(exercise);
      setExerciseName(exercise.name);
      setExerciseDescription(exercise.description || "");

      // Filtruj grupy mięśniowe na podstawie ID
      const selectedGroups = muscleGroupOptions.filter(group =>
        exercise.muscle_group.includes(group.id)
      );
      setMuscleGroups(selectedGroups);
      showAlert(`Ćwiczenie: ${exercise.name} załadowane`, "info", 2000);
    } else {
      resetForm();
    }
  };

  const handleMuscleGroupsChange = (event, value) => {
    setMuscleGroups(value || []);
  };

  const handleCreateNewExercise = async () => {
    // Walidacja
    if (!exerciseName.trim()) {
      showAlert("Wprowadź nazwę ćwiczenia", "warning");
      return;
    }

    if (muscleGroups.length === 0) {
      showAlert("Wybierz przynajmniej jedną grupę mięśniową", "warning");
      return;
    }

    try {
      const exerciseData = {
        name: exerciseName,
        description: exerciseDescription,
        muscle_group: muscleGroups.map(group => group.id),
      };

      await createExercise(exerciseData);
      showAlert("Ćwiczenie utworzone pomyślnie! ✓", "success");
      resetForm();
    } catch (err) {
      showAlert(
        err.message || "Nie udało się utworzyć ćwiczenia",
        "error",
        5000
      );
    }
  };

  const resetForm = () => {
    setExerciseName("");
    setExerciseDescription("");
    setMuscleGroups([]);
    setExerciseObject(null);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600}>
            Dodaj nowe ćwiczenie
          </Typography>

          {/* Wyszukiwanie istniejącego ćwiczenia */}
          <Box sx={{ py: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: "text.secondary" }}
            >
              Lub załaduj istniejące:
            </Typography>
            <Searcher
              dataOutput={getExerciseFromSearcher}
              labelName="Szukaj ćwiczenia"
              apiAdress="exercise/exercise/all"
              disabled={loading}
            />
          </Box>

          {/* Formularz tworzenia ćwiczenia */}
          <TextField
            label="Nazwa ćwiczenia"
            value={exerciseName}
            onChange={e => setExerciseName(e.target.value)}
            fullWidth
            required
            disabled={loading}
            placeholder="np. Wyciskanie sztangi leżąc"
          />

          <TextField
            label="Opis ćwiczenia"
            value={exerciseDescription}
            onChange={e => setExerciseDescription(e.target.value)}
            fullWidth
            multiline
            minRows={3}
            disabled={loading}
            helperText="Opcjonalnie opisz sprzęt, pozycję, itp."
            placeholder="np. Leż na ławce, weź sztangę na wysokości klatki piersiowej..."
          />

          <Autocomplete
            multiple
            onChange={handleMuscleGroupsChange}
            options={muscleGroupOptions}
            getOptionLabel={option => option.name || ""}
            value={muscleGroups}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disabled={loading}
            renderInput={params => (
              <TextField
                {...params}
                label="Rodzaj partii mięśniowe"
                variant="outlined"
                placeholder="Wybierz grupy mięśniowe..."
                required
              />
            )}
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateNewExercise}
              disabled={loading}
              size="large"
              sx={{ flex: 1, position: "relative" }}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={20}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-10px",
                      color: "inherit",
                    }}
                  />
                  <span style={{ visibility: "hidden" }}>Zapisz ćwiczenie</span>
                </>
              ) : (
                "Zapisz ćwiczenie"
              )}
            </Button>

            {exerciseObject && (
              <Button
                variant="outlined"
                color="error"
                onClick={resetForm}
                disabled={loading}
              >
                Czyść
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      <SnackbarAlert
        open={statusAlert.open}
        onClose={handleCloseAlert}
        severity={statusAlert.severity}
        message={statusAlert.message}
        autoHideDuration={statusAlert.autoHideDuration}
      />
    </Container>
  );
}
