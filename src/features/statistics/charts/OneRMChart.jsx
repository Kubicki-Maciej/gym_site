import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const Exercise1RMChart = ({ data, predicted1RM }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="oneRM"
          stroke="#8884d8"
          strokeWidth={2}
          dot
        />

        {/* Predykcja */}
        {predicted1RM && (
          <ReferenceLine
            y={predicted1RM}
            stroke="red"
            strokeDasharray="5 5"
            label="Predykcja 1RM"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Exercise1RMChart;
