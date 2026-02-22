import { useMemo } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import BodyMuscle from "./BodyMuscle";
import FolderTabsMui from "components/FolderTabs/TabPanel";
import BodyCard from "./BodyCard";

export default function MuscleVisualizer({
  muscleData,
  warmUp,
  onWarmUpChange,
}) {
  const isLargeScreen = useMediaQuery("(min-width: 1000px)");

  const transformedMuscleData = useMemo(
    () =>
      muscleData.map(muscle => ({
        name: muscle.eng_name,
        muscles: [muscle.eng_name],
        frequency: muscle.usage_count,
        pl_name: muscle.name,
        exercises: muscle.exercises,
      })),
    [muscleData],
  );

  const tabs = useMemo(() => {
    if (isLargeScreen) {
      return [
        {
          label: "Mapa ciała",
          content: (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
              <BodyMuscle muscleData={transformedMuscleData} isFront={true} />
              <BodyMuscle muscleData={transformedMuscleData} isFront={false} />
            </Box>
          ),
        },
        {
          label: "Statystyki",
          content: <BodyCard muscleData={muscleData} />,
        },
      ];
    }
    return [
      {
        label: "Przód",
        content: (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <BodyMuscle muscleData={transformedMuscleData} isFront={true} />
          </Box>
        ),
      },
      {
        label: "Tył",
        content: (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <BodyMuscle muscleData={transformedMuscleData} isFront={false} />
          </Box>
        ),
      },
      {
        label: "Statystyki",
        content: <BodyCard muscleData={muscleData} />,
      },
    ];
  }, [isLargeScreen, transformedMuscleData, muscleData]);

  return (
    <Box sx={{ p: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Zaangażowane mięśnie
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={warmUp}
              onChange={e => onWarmUpChange(e.target.checked ? 1 : 0)}
              size="small"
              sx={{
                color: "#ff9800",
                "&.Mui-checked": {
                  color: "#ff9800",
                },
              }}
            />
          }
          label={
            <Typography variant="body2">Z seriami rozgrzewkowymi?</Typography>
          }
        />
      </Box>

      <FolderTabsMui tabs={tabs} />
    </Box>
  );
}
