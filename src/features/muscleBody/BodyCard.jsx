import React from "react";
import { Box, Typography } from "@mui/material";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Interpolacja koloru: niebieski -> zielony -> żółty -> czerwony
const getColorForValue = (value, max = 30) => {
  const ratio = Math.min(value / max, 1);

  if (ratio < 0.33) {
    // Niebieski -> Zielony
    const t = ratio / 0.33;
    return {
      r: Math.round(25 * (1 - t) + 46 * t),
      g: Math.round(118 * (1 - t) + 125 * t),
      b: Math.round(210 * (1 - t) + 50 * t),
    };
  } else if (ratio < 0.66) {
    // Zielony -> Żółty
    const t = (ratio - 0.33) / 0.33;
    return {
      r: Math.round(46 * (1 - t) + 255 * t),
      g: Math.round(125 * (1 - t) + 193 * t),
      b: Math.round(50 * (1 - t) + 7 * t),
    };
  } else {
    // Żółty -> Czerwony
    const t = (ratio - 0.66) / 0.34;
    return {
      r: Math.round(255 * (1 - t) + 211 * t),
      g: Math.round(193 * (1 - t) + 47 * t),
      b: Math.round(7 * (1 - t) + 47 * t),
    };
  }
};

const rgbToString = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;

// Custom Tooltip z kolorami
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const { name, value } = payload[0].payload;
  const color = rgbToString(getColorForValue(value));

  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 1.5,
        borderRadius: 1,
        boxShadow: 2,
        border: `2px solid ${color}`,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color }}>
        Użycia: {value}
      </Typography>
    </Box>
  );
};

export default function BodyCard({ muscleData }) {
  const data = muscleData || [];

  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Brak danych o mięśniach
        </Typography>
      </Box>
    );
  }

  const maxValue = Math.max(...data.map(m => m.usage_count));

  const radarData = data.map(muscle => ({
    name: muscle.name,
    value: muscle.usage_count,
    color: rgbToString(getColorForValue(muscle.usage_count)),
  }));

  // Generuj gradienty dla każdego punktu
  const gradientStops = radarData.map((item, index) => {
    const angle = (index / radarData.length) * 100;
    return { offset: `${angle}%`, color: item.color };
  });

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}
      >
        Balans mięśniowy
      </Typography>

      {/* Legenda kolorów */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#1976d2",
            }}
          />
          <Typography variant="caption">0-10</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#2e7d32",
            }}
          />
          <Typography variant="caption">10-20</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#ffc107",
            }}
          />
          <Typography variant="caption">20-25</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#d32f2f",
            }}
          />
          <Typography variant="caption">25-30+</Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%", height: 300, mb: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <defs>
              {/* Gradient koniczny (symulowany) */}
              <linearGradient
                id="multiColorGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                {gradientStops.map((stop, i) => (
                  <stop
                    key={i}
                    offset={stop.offset}
                    stopColor={stop.color}
                    stopOpacity={0.7}
                  />
                ))}
              </linearGradient>
            </defs>

            <PolarGrid gridType="polygon" />
            <PolarAngleAxis
              dataKey="name"
              tick={({ x, y, payload, index }) => {
                const color = radarData[index]?.color || "#666";
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fill={color}
                    fontSize={11}
                    fontWeight={600}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <PolarRadiusAxis angle={30} domain={[0, maxValue + 5]} />
            <Radar
              name="Użycia"
              dataKey="value"
              stroke="url(#multiColorGradient)"
              strokeWidth={2}
              fill="url(#multiColorGradient)"
              fillOpacity={0.5}
              dot={{
                r: 5,
                fill: "#fff",
                stroke: "#333",
                strokeWidth: 1,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
