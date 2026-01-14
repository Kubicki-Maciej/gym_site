import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export function MuscleEngagementPieChart({ muscleUsage }) {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:950px)");

  if (!Array.isArray(muscleUsage) || muscleUsage.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Zaangażowanie mięśni – miesiąc
      </Typography>

      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        height={isMobile ? 420 : 300}
      >
        {/* WYKRES */}
        <Box flex={1}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={muscleUsage}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 90 : 100}
              >
                {muscleUsage.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* LEGENDA */}
        <Box
          minWidth={isMobile ? "100%" : 180}
          pl={isMobile ? 0 : 2}
          pt={isMobile ? 2 : 0}
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
        >
          {muscleUsage.map((item, index) => (
            <Box key={item.name} display="flex" alignItems="center" mb={1}>
              <Box
                width={12}
                height={12}
                bgcolor={COLORS[index % COLORS.length]}
                mr={1}
              />
              <Typography variant="body2">
                {item.name} ({item.count})
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
