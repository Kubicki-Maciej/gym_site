import Searcher from "../Core/Searcher";
import React, { useState, useEffect } from "react";
import StatusAlert, { StatusAlertService } from "react-status-alert";
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

export default function EditExercise() {
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
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/exercise/muscles/all"
      );
      if (!response.ok) {
        throw new Error("Network error: Failed to download all muscles data");
      }
      const data = await response.json();
      setMuscleGroupOptions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMuscleGroups();
  }, []);

  function getExerciseFromSercher(exercise) {
    if (exercise) {
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
    setExerciseName(exerciseObject.name);
    setExerciseDescription(exerciseObject.description);
    if (muscleGroupOptions) {
      setMuscleGroups(
        muscleGroupOptions.filter(group =>
          exerciseObject.muscle_group.includes(group.id)
        )
      );
    }
  }, [exerciseObject]);

  const handleNameChange = event => {
    setExerciseName(event.target.value);
  };
  const handleDescriptionChange = event => {
    setExerciseDescription(event.target.value);
  };

  const handleMuscleGroupsChange = (event, value) => {
    setMuscleGroups(value);
  };

  async function editExercise() {
    if (exerciseName && muscleGroups.length > 0) {
      const object = {
        name: exerciseName,
        description: exerciseDescription,
        muscle_group: muscleGroups.map(group => group.id),
      };
      console.log("Obiekt do edycji:", object);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/exercise/exercise/update/${exerciseObject.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(object),
          }
        );
        if (!response.ok)
          throw new Error("Nie udało się zaktualizować ćwiczenia");
        const data = await response.json();
        console.log("Ćwiczenie zaktualizowane:", data);
        successMessage("Ćwiczenie zaktualizowane pomyślnie!");
        successMessage("Ćwiczenie zaktualizowane (symulacja)!");
      } catch (error) {
        console.error("Błąd podczas edycji danych:", error);
        errorMessage("Nie udało się zaktualizować ćwiczenia.");
      }
    } else {
      errorMessage("Proszę uzupełnić wszystkie wymagane pola.");
    }
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight={600}>
              Edytuj ćwiczenie
            </Typography>
            <Searcher
              dataOutput={setExerciseObject}
              labelName="Szukaj ćwiczenia"
              apiAdress="http://127.0.0.1:8000/exercise/exercise/all"
            />
            <TextField
              label="Opis ćwiczenia"
              value={exerciseDescription}
              onChange={handleDescriptionChange}
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
              onClick={editExercise}
              size="large"
            >
              Edytuj ćwiczenie
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}

// export default function EditExerciseForm() {

//   return (
// <Container maxWidth="sm">
//   <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
//     <Stack spacing={3}>
//       <Typography variant="h5" fontWeight={600}>
//         Edytuj ćwiczenie
//       </Typography>

//       <TextField
//         label="Nazwa ćwiczenia"
//         value={exerciseName}
//         onChange={handleNameChange}
//         fullWidth
//         required
//       />

//       <TextField
//         label="Opis ćwiczenia"
//         value={exerciseDescription}
//         onChange={handleDescriptionChange}
//         fullWidth
//         multiline
//         minRows={3}
//         helperText="Opcjonalnie opisz sprzęt, pozycję, itp."
//       />

//       <Autocomplete
//         multiple
//         onChange={handleMuscleGroupsChange}
//         options={muscleGroupOptions}
//         getOptionLabel={option => option.name}
//         value={muscleGroups}
//         isOptionEqualToValue={(option, value) => option.id === value.id}
//         renderInput={params => (
//           <TextField
//             {...params}
//             label="Rodzaj partii mięśniowe"
//             variant="outlined"
//             placeholder="Wybierz ..."
//           />
//         )}
//       />

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={editExercise}
//         size="large"
//       >
//         Edytuj ćwiczenie
//       </Button>
//     </Stack>
//   </Paper>
// </Container>
//   );
// }
