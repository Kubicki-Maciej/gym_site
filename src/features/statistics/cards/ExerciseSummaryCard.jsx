import { useState } from "react";
import ExerciseSelector from "features/exercise/ExerciseSelector";
import useGetUserAllExerciseName from "features/users/hooks/useGetUserAllExerciseName";
import { useUserExerciseProgressCard } from "hooks/statistic/useCardStatistic";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import SummaryStatisticCard from "components/Cards/SummaryStatisticCard";
import { isEmpty } from "utils/utils";

export default function ExerciseSummaryCard({ userId }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const {
    data: exerciseList,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  } = useGetUserAllExerciseName({ userId });

  const {
    data: exerciseSummary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    error: summaryError,
  } = useUserExerciseProgressCard(userId, selectedExercise?.id);

  const dataEx = exerciseSummary ?? [];
  console.log("selectedExercise :", selectedExercise);

  console.log("*******************");
  console.log("exerciseSummary :", exerciseSummary);

  return (
    <QueryStateHandler
      isLoading={isListLoading}
      isError={isListError}
      error={listError}
    >
      <ExerciseSelector
        onSelect={setSelectedExercise}
        exercises={exerciseList}
      />

      {selectedExercise ? (
        <QueryStateHandler
          isLoading={isSummaryLoading}
          isError={isSummaryError}
          error={summaryError}
        >
          {!isEmpty(exerciseSummary) ? (
            <SummaryStatisticCard data={exerciseSummary} />
          ) : (
            <p>ćwiczenie nie ma danych</p>
          )}

          {/* {JSON.stringify(exerciseSummary, null, 2)}
           */}
        </QueryStateHandler>
      ) : (
        <p>Prosze wybrać ćwiczenie</p>
      )}
    </QueryStateHandler>
  );
}

// GET /statistics/user_exercise_progres/12/33

// HTTP 200 OK
// Allow: GET, OPTIONS
// Content-Type: application/json
// Vary: Accept

// {
//     "start_weight": 20.0,
//     "last_weight": 60.0,
//     "avg_weight": 55,
//     "progress_kg": 40.0,
//     "progress_percentage": 200.0,
//     "max": {
//         "weight": 111.0,
//         "repeats": 8,
//         "date": "2026-01-02"
//     }
// }
