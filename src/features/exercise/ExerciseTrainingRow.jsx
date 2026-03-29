import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import ExerciseTrainingCard from "components/Cards/ExerciseTrainingCard";

export default function ExerciseTrainingRow({ title, list = [], onAdd }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "snap",
    rubberband: true,
    slides: {
      perView: 1.2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 2, spacing: 12 },
      },
      "(min-width: 900px)": {
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 4, spacing: 16 },
      },
    },
  });

  // 🔥 FIX NA ZACINANIE
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [list, instanceRef]);

  if (!list.length) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Box
        ref={sliderRef}
        className="keen-slider"
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {list.map(ex => (
          <Box
            key={ex.id}
            className="keen-slider__slide"
            sx={{
              minWidth: 0,
              height: "100%", // 🔥 równa wysokość
            }}
          >
            <ExerciseTrainingCard exercise={ex} onAdd={onAdd} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
