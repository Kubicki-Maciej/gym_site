import React from "react";
import { Stack, Tooltip, Box } from "@mui/material";
import useGetLastSevenDayTrainings from "../hooks/useGetLastSevenDayTrainings";
import { useNavigate } from "react-router-dom";

const PRESETS = {
  pl: {
    letters: ["P", "W", "Ś", "C", "P", "S", "N"],
    full: [
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
      "Niedziela",
    ],
  },
  en: {
    letters: ["M", "T", "W", "T", "F", "S", "S"],
    full: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
};

const SIZE = { sm: 20, md: 36, lg: 44 };

export default function WeekdayInitialsStrip({
  locale = "pl",
  startOnMonday = true,
  size = "sm", // "sm" | "md" | "lg" lub liczba (px)
  letters, // opcjonalnie własne literki, np. ["Pn","Wt",...]
  tooltips = true,
  squareSx, // dodatkowe style dla kwadracików
  containerSx, // dodatkowe style dla kontenera
  trainingList,
}) {
  const navigate = useNavigate();

  const goToTraining = id => navigate(`/training/details/${id}`);

  const { getThisWeekTrainings, getListToWeekDayInitialsStrip, getTime } =
    useGetLastSevenDayTrainings();
  if (!trainingList) return;

  const listOfCurrentWeekTraining = getListToWeekDayInitialsStrip(trainingList);
  const preset = PRESETS[locale] ?? PRESETS.pl;
  const L = typeof size === "number" ? size : SIZE[size] ?? SIZE.md;
  const lettersArr = letters ?? preset.letters;

  const order = startOnMonday ? [0, 1, 2, 3, 4, 5, 6] : [6, 0, 1, 2, 3, 4, 5];

  return (
    <Stack direction="row" spacing={1} sx={containerSx}>
      {order.map(i => {
        const tile = (
          <Box
            onClick={() => goToTraining(listOfCurrentWeekTraining[i].object.id)}
            key={i}
            sx={{
              width: L,
              height: L,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 12,
              borderRadius: 1,
              bgcolor: listOfCurrentWeekTraining[i].object ? "lightGreen" : "",
              border: "1px solid",
              borderColor: "divider",
              color: "text.primary",
              boxShadow: 0,
              ...squareSx,
            }}
          >
            {lettersArr[i]}
          </Box>
        );
        return tooltips ? (
          <Tooltip
            key={i}
            title={getTime(listOfCurrentWeekTraining[i].object.training_date)}
            arrow
          >
            {tile}
          </Tooltip>
        ) : (
          tile
        );
      })}
    </Stack>
  );
}
