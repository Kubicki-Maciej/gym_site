import { Box, Typography } from "@mui/material";
import MacroInlineElement from "components/Fitapp/MacroInlineElement";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
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

      <MacroInlineElement sx={{ color: "#ff7043" }}>
        <LocalFireDepartmentIcon sx={{ fontSize: 14 }} />
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: "inherit" }}
        >
          Kcal: {Math.round(entry.total_kcal)}
        </Typography>
      </MacroInlineElement>
    </Box>
  );
}
