import { useMemo } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import BodyMuscle from "./BodyMuscle";
import FolderTabsMui from "components/FolderTabs/TabPanel";
import BodyCard from "./BodyCard";

export default function MuscleVisualizer({ muscleData }) {
  const isLargeScreen = useMediaQuery("(min-width: 1000px)");

  const data = muscleData || [];

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
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}
      >
        Mapa mięśni
      </Typography>
      <FolderTabsMui tabs={tabs} />
    </Box>
  );
}
