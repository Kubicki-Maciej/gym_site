import { Box, Chip } from "@mui/material";

export default function ExerciseFilterBar({ muscles = [], active, onChange }) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: "background.default",
        py: 1,
        mb: 2,
        display: "flex",
        gap: 1,
        overflowX: "auto",
      }}
    >
      <Chip
        label="All"
        clickable
        color={active === "ALL" ? "primary" : "default"}
        onClick={() => onChange("ALL")}
      />

      {muscles.map(m => (
        <Chip
          key={m}
          label={m}
          clickable
          color={active === m ? "primary" : "default"}
          onClick={() => onChange(m)}
        />
      ))}
    </Box>
  );
}
