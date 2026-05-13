import { Box, Stack } from "@mui/material";
import { useState, useMemo, useCallback } from "react";

import WeekStrip from "components/Calendar/WeekStrip";
import NutritionBar from "components/Fitapp/NutritionBar";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";

import { useDiaryEntries } from "hooks/Fitapp/useNutrition";

import MealSection from "./components/MealSection";
import EditDiaryEntryModal from "./modal/EditDiaryEntryModal";

const MEAL_TYPES = [
  { key: "breakfast", label: "Śniadanie" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Obiad" },
  { key: "snack", label: "Kolacja" },
];

const getEntryDateIso = entry => {
  const rawDate = entry?.date || entry?.snapshot_date || entry?.snapshot?.date;

  if (!rawDate) return null;

  return String(rawDate).slice(0, 10);
};

export default function DiaryPage() {
  const [payload, setPayload] = useState({
    start_date: null,
    end_date: null,
  });

  const [selectedDateIso, setSelectedDateIso] = useState(null);
  const [editingEntryId, setEditingEntryId] = useState(null);

  const { data = [], isLoading, error } = useDiaryEntries(payload);

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
    setEditingEntryId(null);
  }, []);

  const markedDates = useMemo(() => {
    return data.map(entry => getEntryDateIso(entry)).filter(Boolean);
  }, [data]);

  const selectedDayEntries = useMemo(() => {
    if (!selectedDateIso) return [];

    return data.filter(entry => getEntryDateIso(entry) === selectedDateIso);
  }, [data, selectedDateIso]);

  const editingEntry = useMemo(() => {
    return (
      selectedDayEntries.find(entry => entry.id === editingEntryId) ?? null
    );
  }, [selectedDayEntries, editingEntryId]);

  const totals = useMemo(() => {
    return selectedDayEntries.reduce(
      (acc, meal) => {
        (meal.ingredients || []).forEach(ingredient => {
          acc.kcal += parseFloat(ingredient.kcal || 0);
          acc.protein += parseFloat(ingredient.protein || 0);
          acc.carbs += parseFloat(ingredient.carbs || 0);
          acc.fat += parseFloat(ingredient.fat || 0);
        });

        return acc;
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0 },
    );
  }, [selectedDayEntries]);

  return (
    <>
      <WeekStrip
        onWeekChange={handleWeekChange}
        onDateChange={handleDateChange}
        markedDates={markedDates}
      />

      <QueryStateHandler isLoading={isLoading} error={error}>
        <Box p={2}>
          <NutritionBar
            kcal={Math.round(totals.kcal)}
            protein={Math.round(totals.protein)}
            carbs={Math.round(totals.carbs)}
            fat={Math.round(totals.fat)}
            variant="rectangle"
          />

          <Stack spacing={2} mt={2}>
            {MEAL_TYPES.map(mealType => (
              <MealSection
                key={mealType.key}
                type={mealType.key}
                label={mealType.label}
                entries={selectedDayEntries.filter(
                  entry => entry.meal_type === mealType.key,
                )}
                onEdit={entry => setEditingEntryId(entry.id)}
                selectedDay={selectedDateIso}
              />
            ))}
          </Stack>

          <EditDiaryEntryModal
            entry={editingEntry}
            onClose={() => setEditingEntryId(null)}
          />
        </Box>
      </QueryStateHandler>
    </>
  );
}
