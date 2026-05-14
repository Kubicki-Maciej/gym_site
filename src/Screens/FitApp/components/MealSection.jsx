import { Box, Typography, Stack, Button } from "@mui/material";
import AddMealModal from "../modal/AddMealModal";
import { useState } from "react";
// import DiaryEntryCard from "./DiaryEntryCard";
import DiaryEntryCard from "./DairyEnterCard";
import AddButton from "components/common/AddButton";
import { Add } from "@mui/icons-material";
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
      <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
        <Box sx={{ alignSelf: "flex-start" }}>
          <Typography variant="h6">{label}</Typography>
        </Box>
      </Stack>

      <Stack spacing={1} mt={2}>
        {entries.map(entry => (
          <DiaryEntryCard
            key={entry.id}
            entry={entry}
            onClick={() => onEdit(entry)}
          />
        ))}
        <Box sx={{ alignSelf: "center" }}>
          <AddButton setPickerOpen={() => setOpenAdd(true)} buttonSize={36} />
        </Box>
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
