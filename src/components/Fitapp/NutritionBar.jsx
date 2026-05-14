import { Paper, Typography, Stack, Box } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import OpacityIcon from "@mui/icons-material/Opacity";

function StatCard({ label, value, unit, icon, gradient, variant = "square" }) {
  const isRectangle = variant === "rectangle";
  const isSuperSmall = variant === "superSmall";

  return (
    <Paper
      elevation={3}
      sx={{
        width: isRectangle ? 150 : 82,
        height: isRectangle ? 70 : 82,

        borderRadius: 3,
        background: gradient,
        color: "#fff",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        px: isRectangle ? 1.5 : 0,

        transition: "0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      {isRectangle ? (
        <Stack
          direction="row"
          spacing={1.2}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>

          <Stack spacing={0.2} alignItems="flex-start" justifyContent="center">
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {value}
              {unit}
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                opacity: 0.9,
                lineHeight: 1,
              }}
            >
              {label}
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Stack
          spacing={0.3}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 0.2,
            }}
          >
            {icon}
          </Box>

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {value}
            {unit}
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              opacity: 0.9,
              lineHeight: 1,
            }}
          >
            {label}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
}

export default function NutritionBar({
  kcal,
  protein,
  carbs,
  fat,
  variant = "square", // square | rectangle
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      flexWrap="nowrap"
    >
      <StatCard
        label="Kcal"
        value={kcal}
        unit=""
        variant={variant}
        gradient="linear-gradient(135deg, #ff7043, #ff5722)"
        icon={<LocalFireDepartmentIcon sx={{ fontSize: 20 }} />}
      />

      <StatCard
        label="Protein"
        value={protein}
        unit="g"
        variant={variant}
        gradient="linear-gradient(135deg, #43a047, #2e7d32)"
        icon={<FitnessCenterIcon sx={{ fontSize: 20 }} />}
      />

      <StatCard
        label="Carbs"
        value={carbs}
        unit="g"
        variant={variant}
        gradient="linear-gradient(135deg, #42a5f5, #1e88e5)"
        icon={<BakeryDiningIcon sx={{ fontSize: 20 }} />}
      />

      <StatCard
        label="Fat"
        value={fat}
        unit="g"
        variant={variant}
        gradient="linear-gradient(135deg, #fbc02d, #f9a825)"
        icon={<OpacityIcon sx={{ fontSize: 20 }} />}
      />
    </Stack>
  );
}
