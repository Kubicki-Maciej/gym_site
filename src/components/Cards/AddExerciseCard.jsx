import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

export default function AddExerciseCard({
  onAdd,
  excludedExercises,
  userSelected,
}) {
  const [open, setOpen] = useState(false);

  const [allExercises, setAllExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/exercise/exercise/all",
        );
        setAllExercises(res.data);
      } catch (err) {
        alert("Błąd pobierania ćwiczeń");
      }
    };
    fetchExercises();
  }, []);
  const availableExercises = allExercises.filter(
    ex => !excludedExercises.some(e => e.id === ex.id),
  );

  const handleAdd = () => {
    if (selectedExercise) {
      onAdd(selectedExercise);
      setSelectedExercise(null);
      setOpen(false);
    }
  };

  return (
    <Card
      sx={{
        width: 200,
        aspectRatio: "4 / 3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: 1,
      }}
      elevation={3}
    >
      {!open ? (
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => setOpen(true)}
          disabled={!userSelected}
        >
          Dodaj ćwiczenie
        </Button>
      ) : (
        <CardContent sx={{ width: "100%" }}>
          <Autocomplete
            options={availableExercises}
            getOptionLabel={option => option.name}
            value={selectedExercise}
            onChange={(_, value) => setSelectedExercise(value)}
            renderInput={params => (
              <TextField {...params} label="Wybierz ćwiczenie" size="small" />
            )}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleAdd}
              disabled={!selectedExercise}
              fullWidth
            >
              Dodaj
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                setSelectedExercise(null);
              }}
              fullWidth
            >
              Anuluj
            </Button>
          </Box>
        </CardContent>
      )}
    </Card>
  );
}
