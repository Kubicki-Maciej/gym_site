import { useState, useEffect, useCallback } from "react";
import { StatusAlertService } from "react-status-alert";
import useUserTraining from "../../../hooks/useUserTraining";
import useTraining from "../../Trening/hooks/useTraining";

export default function useWorkoutDetail(
  trainingId,
  getUserDataTraining,
  getAllExercises,
  getAllTrainings // Dodaj ten parametr
) {
  const [training, setTraining] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [allExercises, setAllExercises] = useState([]);
  const [allTrainings, setAllTrainings] = useState([]); // Nowy state
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [isAddTrainingOpen, setIsAddTrainingOpen] = useState(false);

  const { deleteSingleExercise, updateTraining, createSingleRep } =
    useTraining();

  const { deleteSeriesExercise, addTrainingExercises } = useUserTraining();

  // Fetch training data na start
  useEffect(() => {
    const fetchTrainingData = async () => {
      if (!trainingId) {
        setError("Brak ID treningu w parametrach URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const trainingData = await getUserDataTraining(trainingId);

        if (!trainingData) {
          setError("Nie udało się pobrać treningu");
          setLoading(false);
          return;
        }

        setTraining(trainingData);

        if (
          trainingData.user_exercises &&
          Array.isArray(trainingData.user_exercises)
        ) {
          const mappedExercises = trainingData.user_exercises.map(
            userExercise => ({
              id: userExercise.id,
              userExerciseId: userExercise.id,
              exerciseId: userExercise.exercise.id,
              exerciseSeries: userExercise.exercises_series || [],
              name: userExercise.exercise.name,
              muscleGroupIds: userExercise.exercise.muscle_group || [],
            })
          );
          setExercises(mappedExercises);
        }
        setError(null);
      } catch (err) {
        console.error("Błąd pobierania treningu:", err);
        setError("Błąd pobierania treningu");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingData();
  }, [trainingId, getUserDataTraining]);

  // Fetch all exercises na start
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const res = await getAllExercises();
        if (res) setAllExercises(res);
      } catch (e) {
        console.error("Błąd pobierania ćwiczeń:", e);
      }
    };

    fetchAllExercises();
  }, [getAllExercises]);

  // Fetch all trainings
  useEffect(() => {
    const fetchAllTrainings = async () => {
      try {
        const res = await getAllTrainings();
        if (res) setAllTrainings(res);
      } catch (e) {
        console.error("Błąd pobierania treningów:", e);
      }
    };

    fetchAllTrainings();
  }, [getAllTrainings]);

  const handleSerieChange = useCallback((exerciseId, serieId, field, value) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.userExerciseId === exerciseId
          ? {
              ...ex,
              exerciseSeries: ex.exerciseSeries.map(serie =>
                serie.id === serieId ? { ...serie, [field]: value } : serie
              ),
            }
          : ex
      )
    );
  }, []);

  const handleAdjustSerie = useCallback((exerciseId, serieId, field, delta) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.userExerciseId === exerciseId
          ? {
              ...ex,
              exerciseSeries: ex.exerciseSeries.map(serie =>
                serie.id === serieId
                  ? {
                      ...serie,
                      [field]: Math.max(0, (serie[field] || 0) + delta),
                    }
                  : serie
              ),
            }
          : ex
      )
    );
  }, []);

  const handleAddSerie = useCallback(
    // working here
    async exerciseId => {
      const exercise = exercises.find(ex => ex.userExerciseId === exerciseId);
      const last = exercise?.exerciseSeries.at(-1);

      const payload = {
        idSeriesExercise: exerciseId,
        weight: last?.weight ?? 0,
        repeats: last?.repeats ?? 12,
      };

      try {
        const returnedRep = await createSingleRep(payload);
        setExercises(prev =>
          prev.map(ex => {
            if (ex.userExerciseId === exerciseId) {
              const lastRep = ex.exerciseSeries.at(-1);
              const newSerie = {
                id: returnedRep.id,
                repeats: lastRep.repeats || 12,
                weight: lastRep.weight || 0,
              };
              return {
                ...ex,
                exerciseSeries: [...ex.exerciseSeries, newSerie],
              };
            }
            return ex;
          })
        );
        StatusAlertService.showSuccess("✅ Seria dodana!");
      } catch (err) {
        console.error("Błąd dodawania serii:", err);
        StatusAlertService.showError("❌ Błąd dodawania serii");
      }
    },
    [exercises, createSingleRep]
  );

  const handleDeleteExercise = useCallback(
    async exerciseId => {
      console.log(" jestesmy tutaj przy usuwaniu");
      console.log(exerciseId);
      setExercises(prev => prev.filter(ex => ex.id !== exerciseId));
      setIsSaving(true);
      try {
        const result = await deleteSeriesExercise(exerciseId);
        if (result) {
          setExercises(prev =>
            prev.filter(ex => ex.userExerciseId !== exerciseId)
          );
          StatusAlertService.showSuccess("✅ Ćwiczenie usunięte");
        } else {
          StatusAlertService.showError("❌ Błąd usuwania ćwiczenia");
        }
      } catch (err) {
        console.error("Błąd usuwania ćwiczenia:", err);
        StatusAlertService.showError("❌ Błąd usuwania ćwiczenia");
      } finally {
        setIsSaving(false);
      }
    },
    [deleteSeriesExercise]
  );

  const handleRemoveSerie = useCallback(
    (exerciseId, serieId) => {
      setExercises(prev =>
        prev.map(ex =>
          ex.userExerciseId === exerciseId
            ? {
                ...ex,
                exerciseSeries: ex.exerciseSeries.filter(
                  serie => serie.id !== serieId
                ),
              }
            : ex
        )
      );
      deleteSingleExercise(serieId)
        .then(result => {
          if (result) {
            StatusAlertService.showSuccess("✅ Seria usunięta");
          } else {
            StatusAlertService.showError("❌ Błąd usuwania serii");
          }
        })
        .catch(err => {
          console.error("Błąd usuwania serii:", err);
          StatusAlertService.showError("❌ Błąd usuwania serii");
        });
    },
    [deleteSingleExercise]
  );

  const handleAddExercise = useCallback(data => {
    console.log(data);
    const newExercise = {
      id: data.id,
      name: data.name,
      exerciseId: data.exercise,
      userExerciseId: data.id,
      exerciseSeries: data.exercises_series || [],
    };
    console.log(newExercise);
    setExercises(prev => [...prev, newExercise]);
  }, []);

  // NOWA FUNKCJA - Dodawanie treningu
  const handleAddTraining = useCallback(
    async selectedTrainingId => {
      setIsSaving(true);
      try {
        const result = await addTrainingExercises(
          trainingId,
          selectedTrainingId
        );

        if (result && result.user_exercises) {
          // Aktualizuj exercises z nowymi ćwiczeniami z treningu
          const newExercises = result.user_exercises.map(userExercise => ({
            id: userExercise.id,
            userExerciseId: userExercise.id,
            exerciseId: userExercise.exercise.id,
            exerciseSeries: userExercise.exercises_series || [],
            name: userExercise.exercise.name,
            muscleGroupIds: userExercise.exercise.muscle_group || [],
          }));

          setExercises(newExercises);

          // Zaktualizuj training z usedTraining
          setTraining(prev => ({
            ...prev,
            usedTraining: selectedTrainingId,
          }));

          StatusAlertService.showSuccess("✅ Trening dodany pomyślnie!");
          setIsAddTrainingOpen(false);
        } else {
          StatusAlertService.showError("❌ Błąd przy dodawaniu treningu");
        }
      } catch (err) {
        console.error("Błąd dodawania treningu:", err);
        StatusAlertService.showError("❌ Błąd serwera. Spróbuj ponownie.");
      } finally {
        setIsSaving(false);
      }
    },
    [trainingId, addTrainingExercises]
  );

  const handleSaveChanges = useCallback(async () => {
    if (exercises.length === 0) {
      StatusAlertService.showError(
        "Trening musi zawierać co najmniej jedno ćwiczenie"
      );
      return;
    }

    const dataToSend = {
      id: training.id,
      user_exercises: exercises.map(ex => ({
        id: ex.userExerciseId.toString().startsWith("temp")
          ? null
          : ex.userExerciseId,
        exercise: ex.exerciseId,
        exercises_series: ex.exerciseSeries.map(serie => ({
          id: serie.id.toString().startsWith("temp") ? null : serie.id,
          repeats: Math.max(0, Number(serie.repeats) || 0),
          weight: Math.max(0, Number(serie.weight) || 0),
        })),
      })),
    };

    setIsSaving(true);
    try {
      const result = await updateTraining(trainingId, dataToSend);
      if (result) {
        StatusAlertService.showSuccess("✅ Trening został zapisany pomyślnie!");
      } else {
        StatusAlertService.showError("❌ Nie udało się zapisać treningu");
      }
    } catch (err) {
      console.error("Błąd zapisywania treningu:", err);
      StatusAlertService.showError("❌ Błąd serwera. Spróbuj ponownie.");
    } finally {
      setIsSaving(false);
    }
  }, [exercises, training, trainingId, updateTraining]);

  return {
    training,
    exercises,
    loading,
    error,
    isSaving,
    allExercises,
    allTrainings,
    isAddExerciseOpen,
    isAddTrainingOpen,
    handleSerieChange,
    handleAdjustSerie,
    handleAddSerie,
    handleRemoveSerie,
    handleAddExercise,
    handleAddTraining,
    handleDeleteExercise,
    handleSaveChanges,
    setIsAddExerciseOpen,
    setIsAddTrainingOpen,
  };
}
