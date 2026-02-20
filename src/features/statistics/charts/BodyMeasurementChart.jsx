import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function BodyMeasurementChart({ data = [], field, label }) {
  if (!Array.isArray(data) || data.length === 0) {
    return null; // albo Skeleton / placeholder
  }

  const safeData = [...data].reverse();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={safeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={field} stroke="#1976d2" dot />
      </LineChart>
    </ResponsiveContainer>
  );
}
