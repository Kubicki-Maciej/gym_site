import {
  Dialog,
  Box,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";

import { useMeals } from "hooks/Fitapp/useNutrition";
import { useMemo, useState } from "react";
import MealIngredientsModal from "./MealIngredientsModal";
import MealCreatorModal from "./MealCreatorModal";
import MealCard from "components/Fitapp/MealCard";
import MealSliderCards from "components/Fitapp/MealSliderCards";

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
      <Dialog open={open} onClose={onClose} fullWidth>
        <Box p={2}>
          <Typography variant="h6">Dodaj posiłek</Typography>

          <TextField
            fullWidth
            placeholder="Search meals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Stack spacing={1} mt={2}>
            <MealSliderCards
              filteredMeals={filteredMeals}
              onMealClick={setSelectedMeal}
            />
            {/* {filteredMeals.map(meal => (
              
              <MealCard
                key={meal.id}
                name={meal.name}
                onClick={() => setSelectedMeal(meal)}
              />
            ))} */}
          </Stack>

          <Button
            fullWidth
            sx={{
              mt: 3,
              bgcolor: "green",
              color: "white",
            }}
            onClick={() => setOpenMealModal(true)}
          >
            + Create custom meal
          </Button>
        </Box>
      </Dialog>

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
