import { Box, TextField, Typography, Stack, Button } from "@mui/material";

import { useMeals } from "hooks/Fitapp/useNutrition";
import { useMemo, useState } from "react";
import MealIngredientsModal from "./MealIngredientsModal";
import MealCreatorModal from "./MealCreatorModal";
import MealSliderCards from "components/Fitapp/MealSliderCards";

import ResponsiveModal from "components/Core/ResponsiveModal";
import ScanEanModal from "./ScanEanModal";

export default function AddMealModal({ open, onClose, mealType, selectedDay }) {
  const { data: meals = [] } = useMeals();
  const [scanOpen, setScanOpen] = useState(false);
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
          <>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => setOpenMealModal(true)}
            >
              Stwórz swój przepis
            </Button>
            <Button
              // startIcon={<QrCodeScannerIcon />}
              onClick={() => setScanOpen(true)}
            >
              Skanuj EAN
            </Button>
          </>
        )}
      >
        <TextField
          fullWidth
          placeholder="Wyszukaj posiłek"
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
      <ScanEanModal open={scanOpen} onClose={() => setScanOpen(false)} />
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
