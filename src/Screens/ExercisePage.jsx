import { useState } from 'react';
import { Route } from 'react-router-dom';
import { Container } from '@mui/material';
import CardContainer from '../components/Cards/CardContainer';
import CardExercise from '../components/Cards/CardExercise';
import {MOCK_EXERCISES} from '../mocks/exercises'


export default function ExercisesPage() {
  const [exercises, setExercises] = useState(MOCK_EXERCISES);
  const [expandedId, setExpandedId] = useState(null);

  const handleSelectExercise = (exercise) => {
    console.log('Wybrane ćwiczenie:', exercise);
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter(e => e.id !== id));
    if (expandedId === id) {
      setExpandedId(null);
    }
  };

  return (
    <CardContainer
      items={exercises}
      columns={3}
      spacing={2}
      isOneColumn={true}
      renderCard={(exercise) => (
        <CardExercise
          exercise={exercise}
          onSelect={handleSelectExercise}
          onDelete={handleDeleteExercise}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
        />
      )}
    />
  );
}