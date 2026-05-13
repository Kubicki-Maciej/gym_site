import { Box, Typography, Stack, Button } from "@mui/material";
import AddMealModal from "../modal/AddMealModal";
import { useState } from "react";
// import DiaryEntryCard from "./DiaryEntryCard";
import DiaryEntryCard from "./DairyEnterCard";

export default function MealSection({
  type,
  label,
  entries,
  onEdit,
  selectedDay,
}) {
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{label}</Typography>

        <Button onClick={() => setOpenAdd(true)}>Dodaj przycisk</Button>
      </Stack>

      <Stack spacing={1} mt={2}>
        {entries.map(entry => (
          <DiaryEntryCard
            key={entry.id}
            entry={entry}
            onClick={() => onEdit(entry)}
          />
        ))}
      </Stack>

      <AddMealModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        mealType={type}
        selectedDay={selectedDay}
      />
    </Box>
  );
}
