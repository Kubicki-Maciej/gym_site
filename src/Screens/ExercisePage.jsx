import { useState } from 'react';
import { Route } from 'react-router-dom';
import { Container } from '@mui/material';
import CardContainer from '../components/Cards/CardContainer';
import CardExercise from '../components/Cards/CardExercise';
// import ExerciseCard from './components/ExerciseCard';
import { MOCK_EXERCISES } from '../components/Section/AppRoutes';
export default function ExercisesPage() {
  const [exercises, setExercises] = useState(MOCK_EXERCISES);

  const handleSelectExercise = (exercise) => {
    console.log('Wybrane ćwiczenie:', exercise);
    alert(`Edytuj: ${exercise.name}`);
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter(e => e.id !== id));
    console.log(`Usunięte ćwiczenie o ID: ${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CardContainer
        items={exercises}
        columns={3}
        spacing={2}
        renderCard={(exercise) => (
          <CardExercise
            exercise={exercise}
            onSelect={handleSelectExercise}
            onDelete={handleDeleteExercise}
          />
        )}
      />
    </Container>
  );
}

// Dodaj do Routes:
export const exerciseRoute = (
  <Route
    path="test/"
    element={<ExercisesPage />}
  />
);