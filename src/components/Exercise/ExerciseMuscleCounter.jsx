import React, { useEffect, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import axios from "axios";

export default function ExerciseMuscleCounter({ exercises }) {
  const [muscles, setMuscles] = useState([]);
  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/exercise/muscles/all"
        );
        setMuscles(res.data);
      } catch (err) {
        console.error("Błąd pobierania mięśni:", err);
      }
    };
    fetchMuscles();
  }, []);

  // Zlicz wystąpienia mięśni w ćwiczeniach
  const muscleCount = {};
  exercises.forEach(exercise => {
    (exercise.muscle_group || []).forEach(muscleId => {
      muscleCount[muscleId] = (muscleCount[muscleId] || 0) + 1;
    });
  });

  // Wyświetl tylko mięśnie, które są używane
  const usedMuscles = muscles.filter(muscle => muscleCount[muscle.id]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Zaangażowane mięśnie:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {usedMuscles.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Brak ćwiczeń angażujących mięśnie.
          </Typography>
        )}
        {usedMuscles.map(muscle => (
          <Chip
            key={muscle.id}
            label={`${muscle.name} (${muscleCount[muscle.id]})`}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
}
