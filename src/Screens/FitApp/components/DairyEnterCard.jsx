import { Box, Typography } from "@mui/material";

export default function DiaryEntryCard({ entry, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "background.paper",
        cursor: "pointer",
      }}
    >
      <Typography fontWeight={700}>{entry.meal_name}</Typography>

      <Typography variant="body2">
        {Math.round(entry.total_kcal)} kcal
      </Typography>
    </Box>
  );
}
