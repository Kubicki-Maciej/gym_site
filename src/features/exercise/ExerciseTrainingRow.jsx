import React from "react";
import { Box, Typography } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import ExerciseTrainingCard from "components/Cards/ExerciseTrainingCard";

export default function ExerciseTrainingRow({ title, list = [], onAdd }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "snap",
    slides: {
      perView: 2.5,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 3.5, spacing: 12 },
      },
      "(min-width: 900px)": {
        slides: { perView: 4.1, spacing: 16 },
      },
    },
  });

  React.useEffect(() => {
    instanceRef.current?.update();
  }, [list]);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Box
        ref={sliderRef}
        className="keen-slider"
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {list.map(ex => (
          <Box
            key={ex.id}
            className="keen-slider__slide"
            sx={{
              minWidth: 0,
              maxWidth: "100%",
            }}
          >
            <ExerciseTrainingCard exercise={ex} onAdd={onAdd} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
