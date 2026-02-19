import { useUserBodySummary } from "hooks/statistic/useCardStatistic";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import QueryStateHandler from "components/QueryStateHandler/QueryStateHandler";

export default function BodySummaryCard({ userId }) {
  console.log("userId", userId);
  const { data, isLoading, isError, error } = useUserBodySummary(userId);
  console.log("bodySummary");
  console.log(data);

  const ProgressItem = ({ label, dataKey }) => {
    if (!data?.[dataKey]) return null;

    const { min, max, current } = data[dataKey];
    const isUp = current > min;
    const percent = isUp
      ? Math.round(((current - min) / min) * 100)
      : Math.round(((max - current) / max) * 100);

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography variant="body1" sx={{ minWidth: 100 }}>
          {label}:
        </Typography>

        <Typography variant="h6" fontWeight="bold">
          {current}
        </Typography>

        <Chip
          icon={isUp ? <TrendingUp /> : <TrendingDown />}
          label={`${isUp ? "+" : "-"}${percent}%`}
          color={isUp ? "error" : "success"}
          size="small"
        />
      </Box>
    );
  };

  return (
    <QueryStateHandler isLoading={isLoading} isError={isError} error={error}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pomiary ciała
          </Typography>
          <ProgressItem label="Waga" dataKey="weight" />
          <ProgressItem label="Klatka" dataKey="chest" />
          <ProgressItem label="Obwód" dataKey="waist" />
          <ProgressItem label="Biodra" dataKey="hips" />
          <ProgressItem label="Biceps" dataKey="biceps" />
          <ProgressItem label="Łydka" dataKey="calf" />
          <ProgressItem label="Udo" dataKey="thigh" />
        </CardContent>
      </Card>
    </QueryStateHandler>
  );
}

