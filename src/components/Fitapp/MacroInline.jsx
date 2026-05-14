import { Stack, Typography } from "@mui/material";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import OpacityIcon from "@mui/icons-material/Opacity";

import MacroInlineElement from "./MacroInlineElement";

export default function MacroInline({ protein = 0, carbs = 0, fat = 0 }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      flexWrap="wrap"
      useFlexGap
    >
      <MacroInlineElement sx={{ color: "#43a047" }}>
        <FitnessCenterIcon sx={{ fontSize: 14 }} />
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: "inherit" }}
        >
          B: {Math.round(protein)}g
        </Typography>
      </MacroInlineElement>

      <MacroInlineElement sx={{ color: "#42a5f5" }}>
        <BakeryDiningIcon sx={{ fontSize: 14 }} />
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: "inherit" }}
        >
          C: {Math.round(carbs)}g
        </Typography>
      </MacroInlineElement>

      <MacroInlineElement sx={{ color: "#f9a825" }}>
        <OpacityIcon sx={{ fontSize: 14 }} />
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: "inherit" }}
        >
          F: {Math.round(fat)}g
        </Typography>
      </MacroInlineElement>
    </Stack>
  );
}
