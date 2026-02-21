import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

export default function CardMuscle({ muscle }) {
  const getColor = value => {
    switch (true) {
      case value <= 5:
        return "primary";
      case value <= 22:
        return "success";
      case value <= 29:
        return "warning";
      default:
        return "error";
    }
  };

  return (
    <Card
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 1,
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 500 }}>
        {muscle.name}
      </Typography>

      <Chip
        label={muscle.usage_count}
        color={getColor(muscle.usage_count)}
        size="small"
        sx={{ height: 18, fontSize: "0.7rem" }}
      />
    </Card>
  );
}
