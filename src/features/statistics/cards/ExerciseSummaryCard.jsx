import { useState } from "react";
import ExerciseSelector from "features/exercise/ExerciseSelector";
import useGetUserAllExerciseName from "features/users/hooks/useGetUserAllExerciseName";
import { useUserExerciseProgressCard } from "hooks/statistic/useCardStatistic";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import SummaryStatisticCard from "components/Cards/SummaryStatisticCard";
import { isEmpty } from "utils/utils";
import { Box } from "@mui/material";

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
  return (
    <QueryStateHandler
      isLoading={isListLoading}
      isError={isListError}
      error={listError}
    >
      <Box>
        <ExerciseSelector
          onSelect={setSelectedExercise}
          exercises={exerciseList}
          muscleDisable={true}
          sx={{ p: 2 }}
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
          ""
        )}
      </Box>
    </QueryStateHandler>
  );
}
