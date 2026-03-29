import { useState, useMemo } from "react";

export const useTrainingBuilder = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [search, setSearch] = useState("");

  const addExercise = exercise => {
    setSelectedExercises(prev => [...prev, exercise]);
  };

  const removeExercise = id => {
    setSelectedExercises(prev => prev.filter(e => e.id !== id));
  };

  const filterExercises = exercises => {
    return exercises.filter(
      e =>
        !selectedExercises.find(s => s.id === e.id) && // 🔥 ukrywanie
        e.name.toLowerCase().includes(search.toLowerCase()),
    );
  };

  return {
    selectedExercises,
    addExercise,
    removeExercise,
    search,
    setSearch,
    filterExercises,
  };
};
