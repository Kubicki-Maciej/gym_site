import { Box, Typography } from "@mui/material";

export default function DayBall({ day, onSelect }) {
  const getBallStyles = () => {
    if (day.isSelected && day.isToday) {
      return {
        bgcolor: "#42a5f5",
        color: "primary.contrastText",
        border: "2px solid",
        borderColor: "primary.dark",
        boxShadow: "0 4px 14px rgba(25, 118, 210, 0.35)",
      };
    }

    if (day.isSelected) {
      return {
        bgcolor: "#42a5f5",
        color: "primary.contrastText",
        border: day.hasTraining ? "2px solid #008cff" : "2px solid transparent",
        boxShadow: "0 4px 14px rgba(25, 118, 210, 0.35)",
      };
    }

    if (day.isToday) {
      return {
        bgcolor: "#E8F5E9",
        color: "#2E7D32",
        border: day.hasTraining ? "2px solid #008cff" : "2px solid transparent",
        boxShadow: "none",
      };
    }

    if (day.hasTraining) {
      return {
        bgcolor: "transparent",
        color: "text.primary",
        border: "2px solid #008cff",
        boxShadow: "none",
      };
    }

    return {
      bgcolor: "transparent",
      color: "text.primary",
      border: "2px solid transparent",
      boxShadow: "none",
    };
  };

  const ballStyles = getBallStyles();

  return (
    <Box
      onClick={() => onSelect(day.date)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        flexShrink: 1,
      }}
    >
      <Box
        sx={{
          width: { xs: 34, sm: 42, md: 52 },
          height: { xs: 34, sm: 42, md: 52 },
          borderRadius: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 0.1, sm: 0.2, md: 0.3 },
          transition: "all 0.2s ease",
          ...ballStyles,
          "&:hover": {
            transform: "scale(1.06)",
            bgcolor: day.isSelected
              ? "primary.dark"
              : day.isToday
                ? "#DDF3E1"
                : "rgba(0,0,0,0.04)",
          },
          "&:active": {
            transform: "scale(0.96)",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 8, sm: 10, md: 11 },
            fontWeight: 700,
            lineHeight: 1,
            color: "inherit",
          }}
        >
          {day.label}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 10, sm: 12, md: 14 },
            fontWeight: 700,
            lineHeight: 1,
            color: "inherit",
          }}
        >
          {day.number}
        </Typography>
      </Box>
    </Box>
  );
}
