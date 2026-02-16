import React, { useMemo } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button, useMediaQuery, useTheme } from "@mui/material";

import useExerciseAnalysis from "../hooks/useExerciseAnalysis";
import { useCarousel } from "../../../hooks/useCarousel";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function ProgressMaxChart({ data }) {
  console.log("data", data);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartData = useMemo(() => {
    return data.history.map(session => {
      const totalVolume = session.sets.reduce((acc, set) => {
        return acc + set.weight * set.repeats;
      }, 0);

      return {
        date: session.date,
        maxWeight: session.session_max_weight,
        volume: totalVolume,
        setsCount: session.sets.length,
      };
    });
  }, [data]);

  const {
    visibleItems,
    currentIndex,
    goNext,
    goPrev,
    hasNext,
    hasPrev,
    totalItems,
  } = useCarousel(chartData, 6);

  const displayData = isMobile ? visibleItems : chartData;

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        paddingBottom: 40,
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Progres: {data.summary.exercise_name}
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
          fontSize: "0.9rem",
          color: "#555",
        }}
      >
        <span>
          Sesje: <strong>{data.summary.total_sessions}</strong>
        </span>
        <span>
          Globalny Max:{" "}
          <strong>{data.summary.global_max_weight.weight} kg</strong>
        </span>
      </div>

      <ResponsiveContainer width="100%" height="70%">
        <ComposedChart
          data={displayData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="date"
            scale="point"
            padding={{ left: 30, right: 30 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            label={{ value: "Ciężar (kg)", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: "Objętość (kg)",
              angle: 90,
              position: "insideRight",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            yAxisId="right"
            dataKey="volume"
            name="Objętość (Volume)"
            barSize={20}
            fill="#82ca9d"
            radius={[5, 5, 0, 0]}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="maxWeight"
            name="Max Ciężar"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            endIcon={<ChevronLeft />}
            onClick={goPrev}
            disabled={!hasPrev}
            size="large"
          ></Button>
          <Button
            variant="contained"
            endIcon={<ChevronRight />}
            onClick={goNext}
            disabled={!hasNext}
            size="large"
          ></Button>
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>
        <p style={{ margin: 0, color: "#8884d8" }}>
          Max Ciężar: {payload.find(p => p.name === "Max Ciężar")?.value} kg
        </p>
        <p style={{ margin: 0, color: "#82ca9d" }}>
          Objętość: {payload.find(p => p.name === "Objętość (Volume)")?.value}{" "}
          kg
        </p>
      </div>
    );
  }
  return null;
};
