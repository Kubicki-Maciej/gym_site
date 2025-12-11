import { Box, Typography } from "@mui/material";

export default function StudentSeriesCard({ series, seriesNumber }) {
  const seriesStyles = {
    container: {
      p: 1,
      backgroundColor: "#f5f5f5",
      border: "1px solid #e0e0e0",
      borderRadius: 0.75,
      display: "flex",
      gap: 1.5,
      alignItems: "center",
      "&:hover": {
        backgroundColor: "#efefef",
      },
    },
    numberBadge: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      backgroundColor: "success.main",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "0.7rem",
      flexShrink: 0,
    },
    statBox: {
      display: "flex",
      flexDirection: "column",
      gap: 0.25,
      flex: 1,
    },
    label: {
      fontSize: "0.7rem",
      lineHeight: "1",
    },
    value: {
      fontSize: "0.85rem",
      fontWeight: "600",
      lineHeight: "1.2",
    },
  };

  return (
    <Box sx={seriesStyles.container}>
      <Box sx={seriesStyles.statBox}>
        <Typography sx={seriesStyles.value}>{series.repeats || 0}x</Typography>
      </Box>

      <Box sx={seriesStyles.statBox}>
        <Typography sx={seriesStyles.value}>{series.weight || 0}kg</Typography>
      </Box>
    </Box>
  );
}
