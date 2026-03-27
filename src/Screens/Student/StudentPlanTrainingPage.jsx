import React, { useState, useCallback, useMemo } from "react";
import WeekStrip from "components/Calendar/WeekStrip";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";
import useUserTrainingsInDateRangeQuery from "hooks/Training/useUserTrainingInDateRangeQuerry";
import CardExerciseWithPicture from "components/Cards/CardExerciseWithPicture";

export default function StudentPlanTrainingPage() {
  const userId = 63;

  const [payload, setPayload] = useState({
    start_date: null,
    end_date: null,
  });

  const [selectedDateIso, setSelectedDateIso] = useState(null);
  console.log("selectedDateIso", selectedDateIso);

  const handleWeekChange = useCallback(({ startIso, endIso }) => {
    setPayload(prev => {
      if (prev.start_date === startIso && prev.end_date === endIso) {
        return prev;
      }

      return {
        start_date: startIso,
        end_date: endIso,
      };
    });
  }, []);

  const handleDateChange = useCallback(({ iso }) => {
    setSelectedDateIso(prev => (prev === iso ? prev : iso));
  }, []);

  const {
    data = [],
    isLoading,
    error,
  } = useUserTrainingsInDateRangeQuery(userId, payload);

  const markedDates = useMemo(() => {
    return data.map(item => item.training_date);
  }, [data]);

  const selectedDayTrainings = useMemo(() => {
    if (!selectedDateIso) return [];

    return data.filter(item => {
      const trainingDayIso = item.training_date.slice(0, 10);
      return trainingDayIso === selectedDateIso;
    });
  }, [data, selectedDateIso]);

  return (
    <div>
      <WeekStrip
        onWeekChange={handleWeekChange}
        onDateChange={handleDateChange}
        markedDates={markedDates}
      />

      <div style={{ marginTop: 16 }}>
        <p>Wybrany dzień: {selectedDateIso}</p>

        {isLoading && <p>Ładowanie...</p>}
        {error && <p>Błąd: {error.message}</p>}

        {!isLoading && selectedDayTrainings.length === 0 && (
          <p>Brak treningów dla wybranego dnia</p>
        )}

        {selectedDayTrainings.map(training => (
          <CardExerciseWithPicture
            children={
              <div key={training.id}>
                <p>ID: {training.id}</p>
                <p>Data: {training.training_date}</p>
                <pre>{JSON.stringify(training, null, 2)}</pre>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
