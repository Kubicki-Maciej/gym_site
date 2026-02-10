import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

import { SET_COLORS } from "./colorSetCharts";

// Funkcja do obliczania 1RM
const calculate1RM = (weight, reps) => Math.round(weight * (1 + reps / 30) * 10) / 10;

// Custom Tooltip
const CustomTooltip = ({ payload, label, chartData }) => {
  if (!payload || !payload.length) return null;

  // Znajdujemy dane dla tego dnia
  const currentDayData = chartData.find((d) => d.date === label);
  if (!currentDayData) return null;

  // Filtrujemy tylko słupki (sety), pomijamy linię 1RM
  const barPayload = payload.filter((item) => item.dataKey?.startsWith("set_"));
  const oneRMPayload = payload.find((item) => item.dataKey === "maxOneRM");

  return (
    <div
      style={{
        background: "#fff",
        padding: "12px 16px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        minWidth: "180px",
      }}
    >
      {/* Nagłówek - data */}
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "10px",
          paddingBottom: "8px",
          borderBottom: "1px solid #e5e7eb",
          color: "#374151",
        }}
      >
        📅 {label}
      </div>

      {/* Sety */}
      <div style={{ marginBottom: "10px" }}>
        {barPayload.map((item, i) => {
          const repsKey = `${item.dataKey}_reps`;
          const reps = currentDayData[repsKey] || 0;
          const volume = item.value * reps;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 0",
                fontSize: "0.9rem",
              }}
            >
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "3px",
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "#4b5563" }}>
                Set {i + 1}:{" "}
                <strong style={{ color: item.color }}>{item.value} kg</strong>
                <span style={{ color: "#9ca3af" }}> × {reps} reps</span>
                <span style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                  {" "}= {volume} kg
                </span>
              </span>
            </div>
          );
        })}
      </div>

      {/* 1RM */}
      {oneRMPayload && (
        <div
          style={{
            paddingTop: "8px",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              flexShrink: 0,
            }}
          />
          <span style={{ color: "#10b981", fontWeight: "bold" }}>
            Max 1RM: {oneRMPayload.value} kg
          </span>
        </div>
      )}
    </div>
  );
};

export default function WeightProgressChart({ data }) {
  // 1. Zabezpieczenie
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
        📊 Brak danych do wyświetlenia wykresu.
      </div>
    );
  }

  // 2. 🔧 POPRAWKA - Sprawdzamy strukturę danych i obsługujemy różne formaty
  let maxSets = 0;
  let chartData = [];

  // Sprawdzamy czy dane mają strukturę z 'sets' czy są już płaskie
  const hasSessionStructure = data[0]?.sets !== undefined;

  if (hasSessionStructure) {
    // Format 1: { date, sets: [...] }
    maxSets = Math.max(...data.map((session) => {
      // Zabezpieczenie przed undefined/null sets
      return session.sets?.length || 0;
    }));

    chartData = data.map((session) => {
      const chartPoint = {
        date: session.date,
      };

      // Zabezpieczenie przed brakiem sets
      if (!session.sets || !Array.isArray(session.sets)) {
        chartPoint.maxOneRM = 0;
        return chartPoint;
      }

      let maxOneRM = 0;

      session.sets.forEach((set, index) => {
        chartPoint[`set_${index}`] = set.weight;
        chartPoint[`set_${index}_reps`] = set.repeats || set.reps || 0;

        // Oblicz 1RM dla każdego setu
        const oneRM = calculate1RM(set.weight, set.repeats || set.reps || 0);
        if (oneRM > maxOneRM) {
          maxOneRM = oneRM;
        }
      });

      chartPoint.maxOneRM = maxOneRM;
      return chartPoint;
    });
  } else {
    // Format 2: Płaska struktura [{ weight, repeats, oneRM, date }...]
    // Grupujemy po dacie
    const groupedByDate = {};
    
    data.forEach((item) => {
      const date = item.date;
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(item);
    });

    // Znajdujemy maksymalną liczbę setów w jednym dniu
    maxSets = Math.max(...Object.values(groupedByDate).map(sets => sets.length));

    // Transformujemy zgrupowane dane
    chartData = Object.entries(groupedByDate).map(([date, sets]) => {
      const chartPoint = { date };
      let maxOneRM = 0;

      sets.forEach((set, index) => {
        chartPoint[`set_${index}`] = set.weight;
        chartPoint[`set_${index}_reps`] = set.repeats || set.reps || 0;

        // Używamy obliczonego 1RM lub obliczamy
        const oneRM = set.oneRM || calculate1RM(set.weight, set.repeats || set.reps || 0);
        if (oneRM > maxOneRM) {
          maxOneRM = oneRM;
        }
      });

      chartPoint.maxOneRM = maxOneRM;
      return chartPoint;
    });

    // Sortowanie po dacie
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  // Zabezpieczenie przed brakiem danych
  if (chartData.length === 0 || maxSets === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
        ⚠️ Nieprawidłowa struktura danych
      </div>
    );
  }

  // 4. Szerokość wykresu
  // const chartWidth = Math.max(chartData.length * 120, 400);

  return (
    <div style={{ width: "100%", padding: "16px" }}>
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: "16px",
          color: "#1f2937",
        }}
      >
        📊 Training Progress
      </h3>

      <div style={{ width: "100%", height: 380, overflowX: "auto" }}>
        <div style={{  height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              {/* Oś X - Daty */}
              <XAxis
                dataKey="date"
                tickFormatter={(val) => {
                  if (!val) return '';
                  // Zabezpieczenie przed nieprawidłową datą
                  try {
                    const date = new Date(val);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  } catch {
                    return val.slice(5);
                  }
                }}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#d1d5db" }}
              />

              {/* Lewa oś Y - Weight */}
              <YAxis
                yAxisId="weight"
                orientation="left"
                tick={{ fill: "#3b82f6", fontSize: 12 }}
                axisLine={{ stroke: "#3b82f6" }}
                label={{
                  value: "Weight (kg)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#3b82f6", fontWeight: "bold", textAnchor: "middle" },
                }}
                domain={[0, "dataMax + 10"]}
              />

              {/* Prawa oś Y - 1RM */}
              <YAxis
                yAxisId="oneRM"
                orientation="right"
                // tick={{ fill: "#10b981", fontSize: 12 }}
                // axisLine={{ stroke: "#10b981" }}
                label={{
                  value: "1RM (kg)",
                  angle: 90,
                  position: "insideRight",
                  style: { fill: "#10b981", fontWeight: "bold", textAnchor: "middle" },
                }}
                domain={[0, "dataMax + 10"]}
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                content={(props) => <CustomTooltip {...props} chartData={chartData} />}
              />

              {/* Legenda */}
              <Legend
                verticalAlign="top"
                height={40}
                wrapperStyle={{ paddingBottom: 10 }}
              />

              {/* 📊 SŁUPKI - Weight dla każdego setu */}
              {Array.from({ length: maxSets }).map((_, setIndex) => (
                <Bar
                  key={setIndex}
                  yAxisId="weight"
                  dataKey={`set_${setIndex}`}
                  name={`Set ${setIndex + 1}`}
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={SET_COLORS[setIndex % SET_COLORS.length]}
                    />
                  ))}
                </Bar>
              ))}

              {/* 📈 LINIA - 1RM */}
              <Line
                yAxisId="oneRM"
                type="monotone"
                dataKey="maxOneRM"
                name="Max 1RM"
                stroke="#10b981"
                strokeWidth={3}
                dot={{
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 6,
                }}
                activeDot={{
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 2,
                  r: 8,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}