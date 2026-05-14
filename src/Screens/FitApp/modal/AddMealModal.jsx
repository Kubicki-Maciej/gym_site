import { Box, TextField, Typography, Stack, Button } from "@mui/material";

import { useMeals } from "hooks/Fitapp/useNutrition";
import { useMemo, useState } from "react";
import MealIngredientsModal from "./MealIngredientsModal";
import MealCreatorModal from "./MealCreatorModal";
import MealSliderCards from "components/Fitapp/MealSliderCards";
import ResponsiveModal from "components/Core/ResponsiveModal";

export default function AddMealModal({ open, onClose, mealType, selectedDay }) {
  const { data: meals = [] } = useMeals();

  const [search, setSearch] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [openMealModal, setOpenMealModal] = useState(false);

  const filteredMeals = useMemo(() => {
    return meals.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, meals]);

  return (
    <>
      <ResponsiveModal
        open={open}
        onClose={onClose}
        title="Dodaj posiłek"
        renderActions={({ isMobile }) => (
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => setOpenMealModal(true)}
          >
            + Create custom meal
          </Button>
        )}
      >
        <TextField
          fullWidth
          placeholder="Search meals..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <Stack spacing={1} mt={2}>
          <MealSliderCards
            filteredMeals={filteredMeals}
            onMealClick={setSelectedMeal}
          />
        </Stack>
      </ResponsiveModal>

      <MealIngredientsModal
        meal={selectedMeal}
        mealType={mealType}
        onClose={() => setSelectedMeal(null)}
        selectedDay={selectedDay}
      />

      <MealCreatorModal
        open={openMealModal}
        onClose={() => setOpenMealModal(false)}
      />
    </>
  );
}
