import React, { useMemo } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function ProgressMaxChart({ data }){
  // 1. Transformacja danych
  // Musimy spłaszczyć strukturę, aby Recharts mógł ją łatwo odczytać.
  // Dodatkowo obliczamy "Objętość" (Volume) = suma (ciężar * powtórzenia) dla każdej sesji.
  const chartData = useMemo(() => {
    return data.history.map((session) => {
      const totalVolume = session.sets.reduce((acc, set) => {
        return acc + (set.weight * set.repeats);
      }, 0);

      return {
        date: session.date, // Oś X
        maxWeight: session.session_max_weight, // Linia (Oś Y lewa)
        volume: totalVolume, // Słupek (Oś Y prawa)
        setsCount: session.sets.length // Dodatkowe info do tooltipa
      };
    });
  }, [data]);

  return (
    <div style={{ width: '100%', height: 400, padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial' }}>
        Progres: {data.summary.exercise_name}
      </h3>
      
      {/* Podsumowanie nad wykresem */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', fontSize: '0.9rem', color: '#555' }}>
        <span>Sesje: <strong>{data.summary.total_sessions}</strong></span>
        <span>Globalny Max: <strong>{data.summary.global_max_weight} kg</strong></span>
        <span>Łącznie powtórzeń: <strong>{data.summary.total_repeats}</strong></span>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          
          {/* Oś X - Data */}
          <XAxis 
            dataKey="date" 
            scale="point" 
            padding={{ left: 30, right: 30 }} 
            tick={{ fontSize: 12 }}
          />

          {/* Oś Y Lewa - Ciężar (dla Linii) */}
          <YAxis 
            yAxisId="left" 
            label={{ value: 'Ciężar (kg)', angle: -90, position: 'insideLeft' }} 
          />

          {/* Oś Y Prawa - Objętość (dla Słupków) */}
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            label={{ value: 'Objętość (kg)', angle: 90, position: 'insideRight' }} 
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Słupki: Objętość treningowa */}
          <Bar 
            yAxisId="right" 
            dataKey="volume" 
            name="Objętość (Volume)" 
            barSize={20} 
            fill="#82ca9d" 
            radius={[5, 5, 0, 0]}
          />

          {/* Linia: Maksymalny ciężar na sesji */}
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
    </div>
  );
};

// Niestandardowy Tooltip dla lepszej czytelności po najechaniu
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
        <p style={{ margin: 0, color: '#8884d8' }}>
          Max Ciężar: {payload.find(p => p.name === "Max Ciężar")?.value} kg
        </p>
        <p style={{ margin: 0, color: '#82ca9d' }}>
          Objętość: {payload.find(p => p.name === "Objętość (Volume)")?.value} kg
        </p>
      </div>
    );
  }
  return null;
};

