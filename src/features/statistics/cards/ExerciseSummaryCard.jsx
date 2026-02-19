import { useState } from "react";
import ExerciseSelector from "features/exercise/ExerciseSelector";
import useGetUserAllExerciseName from "features/users/hooks/useGetUserAllExerciseName";
import { useUserExerciseProgressCard } from "hooks/statistic/useCardStatistic";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import SummaryStatisticCard from "components/Cards/SummaryStatisticCard";
import { isEmpty } from "utils/utils";

export default function ExerciseSummaryCard({ userId }) {
  console.log("userId");
  console.log(userId);
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
        muscleDisable={true}
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
