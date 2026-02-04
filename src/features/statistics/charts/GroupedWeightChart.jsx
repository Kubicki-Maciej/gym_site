import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { SET_COLORS } from "./colorSetCharts";

export default function GroupedWeightChart({ data }) {
  // 1. Zabezpieczenie na wypadek braku danych
  if (!data || data.length === 0) {
    return <p>Brak danych do wyświetlenia wykresu.</p>;
  }

  // 2. Obliczamy maksymalną liczbę serii w jednym dniu (żeby wiedzieć ile <Bar> wygenerować)
  const maxSets = Math.max(...data.map((session) => session.sets.length));

  // 3. Transformacja danych: Twoja struktura -> format Recharts
  // Recharts potrzebuje płaskiego obiektu dla każdego dnia, np:
  // { date: "2026-02-04", set_0: 30, set_0_reps: 12, set_1: 30, ... }
  const chartData = data.map((session) => {
    const chartPoint = { 
      // Opcjonalnie formatowanie daty na krótszą, np. MM-DD
      date: session.date 
    };

    session.sets.forEach((set, index) => {
      // Klucz dla ciężaru (oś Y)
      chartPoint[`set_${index}`] = set.weight;
      // Klucz dla powtórzeń (do Tooltipa) - mapujemy Twoje 'repeats' na suffix '_reps'
      chartPoint[`set_${index}_reps`] = set.repeats;
    });

    return chartPoint;
  });

  // Szerokość wykresu zależna od ilości dni (dla scrollowania)
  const chartWidth = Math.max(chartData.length * 100, 300); 

  return (
    <div style={{ width: "100%", height: 320, overflowX: "auto" }}>
      <div style={{ width: chartWidth, height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis 
              dataKey="date" 
              // Opcjonalnie: sformatuj datę na osi X
              tickFormatter={(val) => val.slice(5)} // Pokaże MM-DD
            />
            <YAxis
              label={{
                value: "Ciężar (kg)",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: 'middle' }
              }}
            />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              content={({ payload, label }) => {
                if (!payload || !payload.length) return null;
                
                // Znajdujemy pełny obiekt danych dla tego dnia
                const currentDayData = chartData.find(d => d.date === label);

                return (
                  <div
                    style={{
                      background: "#fff",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                    }}
                  >
                    <strong style={{ display: 'block', marginBottom: '5px' }}>
                      {label}
                    </strong>
                    {payload.map((item, i) => {
                      // item.dataKey to np. "set_0"
                      const repsKey = `${item.dataKey}_reps`;
                      const reps = currentDayData ? currentDayData[repsKey] : 0;
                      
                      return (
                        <div key={i} style={{ fontSize: '0.9rem', color: item.color }}>
                          Seria {i + 1}: <strong>{item.value} kg</strong> × {reps} powt.
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            />

            {/* Generujemy słupki dynamicznie na podstawie maxSets */}
            {Array.from({ length: maxSets }).map((_, setIndex) => (
              <Bar
                key={setIndex}
                dataKey={`set_${setIndex}`} // To musi pasować do kluczy z transformacji
                name={`Seria ${setIndex + 1}`}
                barSize={16} // Szerokość słupka
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    // Pobieramy kolor cyklicznie z tablicy SET_COLORS
                    fill={SET_COLORS[setIndex % SET_COLORS.length]}
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}