import { useState } from "react";
import { Card } from "@mui/material";

// Komponenty UI
import ExerciseSelector from "../exercise/ExerciseSelector";
import DateRangePicker from "../dateRange/DateRangePicker";
import ListOfStudentExercise from "../exercise/ListOfStudentExercise";
import FolderTabs from "../../components/FolderTabs/FolderTabs";
import FolderTabsMui from "../../components/FolderTabs/TabPanel";

// Wykresy
import ProgressMaxChart from "./charts/ProgressMaxChart";
import GroupedWeightChart from "./charts/GroupedWeightChart";
import WeightProgressChart from "./charts/WeightProgressChart";

// Hooki i Utilsy
import useGetUserAllExerciseName from "../users/hooks/useGetUserAllExerciseName";
import useUserExerciseInDateRangeStatistic from "./hooks/useUserExerciseInDateRangeStatistic";
import {
  getFirstDayOfTheCurrentMonthString,
  getLastDayOfCurrentMonthString,
} from "../../components/Date/DateCurrentMonth";

import useExerciseAnalysis from "./hooks/useExerciseAnalysis";

export default function UserExerciseStatistics({ userId }) {
  // 1. Stan wybranego ćwiczenia
  const [selectedExercise, setSelectedExercise] = useState(null);

  // 2. Stan zakresu dat (Inicjalizacja domyślnymi wartościami)
  const [dateRange, setDateRange] = useState({
    startDate: getFirstDayOfTheCurrentMonthString(),
    endDate: getLastDayOfCurrentMonthString(),
  });

  // 3. Pobieranie listy ćwiczeń (do selectora)
  const {
    data: exerciseList,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
  } = useGetUserAllExerciseName({ userId });

  // 4. Pobieranie statystyk (tylko jeśli wybrano ćwiczenie)
  // Przeniesione z dziecka do rodzica
  const {
    data: statisticsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
  } = useUserExerciseInDateRangeStatistic({
    userId,
    exerciseId: selectedExercise?.id,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    enabled: !!selectedExercise?.id,
  });

  const analysis = useExerciseAnalysis(statisticsData?.history ?? []);

  const chartOneRM = analysis
    ? {
        label: "📝 Wykres Serii i 1RM",
        content: <WeightProgressChart data={analysis.allSets} />,
      }
    : {
        label: "📝 Wykres Serii i 1RM",
        content: <p></p>,
      };

  const folderContent = statisticsData
    ? [
        {
          label: "📈 Wykres Postępu",
          content: <ProgressMaxChart data={statisticsData} />,
        },
        // chartOneRM,
        {
          label: "📝 Wykres Serii i 1RM",
          content: <WeightProgressChart data={analysis?.allSets} />,
        },
        {
          label: "📝 Historia Serii",
          content: (
            <ListOfStudentExercise listOfExercise={statisticsData.history} />
          ),
        },
      ]
    : [];

  if (isListLoading) return <p>Ładowanie listy ćwiczeń...</p>;
  if (isListError) return <p>Błąd listy: {listError.message}</p>;

  return (
    <div className="space-y-4">
      <h4>Statystyki ćwiczeń</h4>
      <div style={{ marginBottom: "20px" }}>
        <p>Wybierz ćwiczenie:</p>
        <ExerciseSelector
          onSelect={setSelectedExercise}
          exercises={exerciseList}
        />

        <br />
        <p>Wybierz zakres dat:</p>
        <DateRangePicker
          initialStart={dateRange.startDate}
          initialEnd={dateRange.endDate}
          onChange={(start, end) => {
            setDateRange({ startDate: start, endDate: end });
          }}
        />
      </div>

      {selectedExercise ? (
        <>
          {isStatsLoading && <p>Pobieranie danych wykresów...</p>}
          {isStatsError && <p>Błąd statystyk: {statsError.message}</p>}

          {statisticsData && (
            //  <FolderTabs tabs={folderContent} />
            <FolderTabsMui tabs={folderContent} />
          )}
        </>
      ) : (
        <p>Proszę wybrać ćwiczenie, aby zobaczyć statystyki.</p>
      )}
    </div>
  );
}
