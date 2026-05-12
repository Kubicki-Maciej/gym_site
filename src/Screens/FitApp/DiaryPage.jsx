import { Box, Typography, Button, Stack } from "@mui/material";
import WeekStrip from "components/Calendar/WeekStrip";
import { useDiaryEntries } from "hooks/Fitapp/useNutrition";
import { useState } from "react";

import AddMealModal from "./modal/AddMealModal";
import EditDiaryEntryModal from "./modal/EditDiaryEntryModal";

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "snack"];

export default function DiaryPage() {
  const { data } = useDiaryEntries();
  const [openAdd, setOpenAdd] = useState(null);
  const [editing, setEditing] = useState(null);

  return (
    <Box p={2}>
      <WeekStrip />

      <Stack spacing={2}>
        {MEAL_TYPES.map(type => (
          <Box key={type}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>{type}</Typography>
              <Button onClick={() => setOpenAdd(type)}>+</Button>
            </Stack>

            {data
              ?.filter(e => e.meal_type === type)
              .map(entry => (
                <Box
                  key={entry.id}
                  onClick={() => setEditing(entry)}
                  sx={{ p: 1, cursor: "pointer" }}
                >
                  {entry.snapshot.name} ({Math.round(entry.snapshot.kcal)} kcal)
                </Box>
              ))}
          </Box>
        ))}
      </Stack>

      <AddMealModal
        open={!!openAdd}
        mealType={openAdd}
        onClose={() => setOpenAdd(null)}
      />

      <EditDiaryEntryModal entry={editing} onClose={() => setEditing(null)} />
    </Box>
  );
}
