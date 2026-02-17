export const getExerciseTypeReapetsOrTime = exerciseType => {
  const labels = {
    strength: "Powtórzenia:",
    cardio: "Czas w min:",
  };

  return labels[exerciseType] ?? "Nieznany typ ćwiczenia";
};

export const getExerciseTypeWeightOrDistance = exerciseType => {
  const labels = {
    strength: "Waga (kg):",
    cardio: "Dystans (m):",
  };

  return labels[exerciseType] ?? "Nieznany typ ćwiczenia";
};
