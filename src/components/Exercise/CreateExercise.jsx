import { useState, useEffect } from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SnackbarAlert from "../Alerts/SnackbarAlert";
import Searcher from "../Core/Searcher";
import useGeneral from "../../hooks/useGeneral";
import useExercise from "./hooks/useExercise";

export default function CreateExercise() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
    <Container
      maxWidth="sm"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Paper
        elevation={isMobile ? 1 : 3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          mt: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: 2, md: 3 },
          mb: 3,
        }}
      >
        <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={600}
            sx={{ mb: { xs: 1, sm: 0 } }}
          >
            Dodaj nowe ćwiczenie
          </Typography>

          {/* Wyszukiwanie istniejącego ćwiczenia */}
          <Box
            sx={{
              py: { xs: 1.5, sm: 2 },
              borderBottom: "1px solid #e0e0e0",
              mb: { xs: 1, sm: 0 },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                mb: 1,
                color: "text.secondary",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
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
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />

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
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          />

          <Autocomplete
            multiple
            onChange={handleMuscleGroupsChange}
            options={muscleGroupOptions}
            getOptionLabel={option => option.name || ""}
            value={muscleGroups}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disabled={loading}
            size={isMobile ? "small" : "medium"}
            renderInput={params => (
              <TextField
                {...params}
                label="Rodzaj partii mięśniowe"
                variant="outlined"
                placeholder="Wybierz grupy mięśniowe..."
                required
              />
            )}
            componentsProps={{
              paper: {
                sx: {
                  maxHeight: { xs: 200, sm: 300 },
                },
              },
            }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2 }}
            sx={{ mt: { xs: 1, sm: 0 } }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateNewExercise}
              disabled={loading}
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              sx={{
                position: "relative",
                minHeight: { xs: 40, sm: 44 },
                flex: isMobile ? "auto" : 1,
              }}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={isMobile ? 16 : 20}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      marginLeft: isMobile ? "-8px" : "-10px",
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
                size={isMobile ? "medium" : "large"}
                fullWidth={isMobile}
                sx={{
                  minHeight: { xs: 40, sm: 44 },
                  flex: isMobile ? "auto" : undefined,
                }}
              >
                {isMobile ? "Wyczyść" : "Czyść"}
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
