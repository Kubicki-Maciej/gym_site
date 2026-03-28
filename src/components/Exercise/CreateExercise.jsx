import BoxLayout from "components/Layout/BoxLayout";
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Autocomplete,
  Stack,
  Container,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SnackbarAlert from "../Alerts/SnackbarAlert";
import Searcher from "../Core/Searcher";
import useGeneral from "../../hooks/useGeneral";
import useExercise from "../../hooks/useExercise";

export default function CreateExercise() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { createExercise, error, loading } = useExercise();
  const { getAllMuscles } = useGeneral();

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
        console.log("data muscle ", data);
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
    autoHideDuration = 4000,
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
      console.log("exercise:", exercise);
      setExerciseObject(exercise);
      setExerciseName(exercise.name);
      setExerciseDescription(exercise.description || "");

      // ✅ Użyj bezpośrednio - obiekty mają tę samą strukturę
      setMuscleGroups(exercise.muscle_group || []);

      showAlert(`Ćwiczenie: ${exercise.name} załadowane`, "info", 2000);
    } else {
      resetForm();
    }
  };

  const handleMuscleGroupsChange = (event, value) => {
    setMuscleGroups(value || []);
  };

  const handleCreateNewExercise = async () => {
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
        muscle_group: muscleGroups.map(group => group.id), // ✅ Lista ID
      };
      console.log("Wysyłam:", exerciseData); // Debug

      await createExercise(exerciseData);
      showAlert("Ćwiczenie utworzone pomyślnie! ✓", "success");
      resetForm();
    } catch (err) {
      showAlert(
        err.message || "Nie udało się utworzyć ćwiczenia",
        "error",
        5000,
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
    <BoxLayout>
      <Container
        maxWidth="sm"
        disableGutters={isMobile}
        className="Edit/Create_exercise"
      >
        <Box
          sx={{
            width: "100%",
            // px: isMobile ? 2 : 3,
            // py: isMobile ? 2 : 4,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack spacing={3} sx={{ width: "100%" }}>
            {/* Nagłówek */}
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight={700}
              sx={{
                fontSize: isMobile ? "1.25rem" : "1.5rem",
                mb: 1,
              }}
            >
              Dodaj nowe ćwiczenie
            </Typography>

            {/* Wyszukiwanie istniejącego ćwiczenia */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1.5,
                  color: "text.secondary",
                  fontSize: isMobile ? "0.875rem" : "1rem",
                }}
              >
                Lub załaduj istniejące:
              </Typography>
              <Searcher
                dataOutput={getExerciseFromSearcher}
                labelName="Szukaj ćwiczenia"
                apiAdress="exercise/exercise/all"
                disabled={loading}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "#e0e0e0",
                  mt: 2,
                }}
              />
            </Box>

            {/* Nazwa ćwiczenia */}
            <TextField
              label="Nazwa ćwiczenia"
              value={exerciseName}
              onChange={e => setExerciseName(e.target.value)}
              fullWidth
              required
              disabled={loading}
              placeholder="np. Wyciskanie sztangi leżąc"
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: isMobile ? "0.875rem" : "1rem",
                },
              }}
            />

            {/* Opis ćwiczenia */}
            <TextField
              label="Opis ćwiczenia"
              value={exerciseDescription}
              onChange={e => setExerciseDescription(e.target.value)}
              fullWidth
              multiline
              minRows={isMobile ? 2 : 3}
              disabled={loading}
              helperText="Opcjonalnie opisz sprzęt, pozycję, itp."
              placeholder="np. Leż na ławce, weź sztangę na wysokości klatki piersiowej..."
              size="small"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: isMobile ? "0.875rem" : "1rem",
                },
              }}
            />

            {/* Grupy mięśniowe */}
            <Autocomplete
              multiple
              onChange={handleMuscleGroupsChange}
              options={muscleGroupOptions}
              getOptionLabel={option => option.name || ""}
              value={muscleGroups}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              disabled={loading}
              size="small"
              renderInput={params => (
                <TextField
                  {...params}
                  label="Rodzaj partii mięśniowe"
                  variant="outlined"
                  placeholder="Wybierz grupy mięśniowe..."
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: isMobile ? "0.875rem" : "1rem",
                    },
                  }}
                />
              )}
              componentsProps={{
                paper: {
                  sx: {
                    maxHeight: 200,
                  },
                },
              }}
            />

            {/* Przyciski akcji */}
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateNewExercise}
                disabled={loading}
                fullWidth
                sx={{
                  py: isMobile ? 1.25 : 1,
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  fontWeight: 600,
                  position: "relative",
                  minHeight: 40,
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={18}
                      sx={{
                        position: "absolute",
                        color: "inherit",
                      }}
                    />
                    <span style={{ visibility: "hidden" }}>Zapisz</span>
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
                  fullWidth={isMobile}
                  sx={{
                    py: isMobile ? 1.25 : 1,
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    fontWeight: 600,
                    minHeight: 40,
                  }}
                >
                  Wyczyść
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>

        <SnackbarAlert
          open={statusAlert.open}
          onClose={handleCloseAlert}
          severity={statusAlert.severity}
          message={statusAlert.message}
          autoHideDuration={statusAlert.autoHideDuration}
        />
      </Container>
    </BoxLayout>
  );
}
