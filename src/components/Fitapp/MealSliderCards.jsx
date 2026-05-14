import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MealCard from "./MealCard";

// Importy z MUI
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function MealSliderCards({ filteredMeals, onMealClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.2, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.2, spacing: 20 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 4.2, spacing: 24 },
      },
    },
  });

  if (!filteredMeals?.length) {
    return <Typography sx={{ p: 2 }}>Brak posiłków</Typography>;
  }

  const maxIdx = instanceRef.current?.track.details?.maxIdx ?? 0;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Container na Slider */}
      <div ref={sliderRef} className="keen-slider">
        {filteredMeals.map(meal => (
          // Usunąłem klasę 'flex' z głównego elementu slajdu (wymaganie Keen Slidera)
          <div key={meal.id} className="keen-slider__slide">
            {/* Flex przeniesiony do wewnętrznego Boxa */}
            <Box sx={{ display: "flex", height: "100%" }}>
              <MealCard name={meal.name} onClick={() => onMealClick(meal)} />
            </Box>
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={e => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={e => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            disabled={currentSlide === maxIdx}
          />
        </>
      )}

      {loaded && instanceRef.current && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 2,
          }}
        >
          {[...Array(maxIdx + 1).keys()].map(idx => (
            <Box
              key={idx}
              component="button"
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              aria-label={`Przejdź do slajdu ${idx + 1}`}
              sx={{
                width: 12,
                height: 12,
                padding: 0,
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor:
                  currentSlide === idx ? "primary.main" : "grey.300",
                transform: currentSlide === idx ? "scale(1.2)" : "scale(1)",
                "&:hover": {
                  backgroundColor:
                    currentSlide === idx ? "primary.dark" : "grey.400",
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

// Komponent Strzałki zaadaptowany do MUI
function Arrow({ left, onClick, disabled }) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={left ? "Poprzedni slajd" : "Następny slajd"}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        backgroundColor: "background.paper",
        boxShadow: 2, // Ekwiwalent shadow-md
        ...(left ? { left: 8 } : { right: 8 }), // Pozycja w lewo lub prawo
        "&:hover": {
          backgroundColor: "grey.100", // Ekwiwalent hover:bg-gray-100
        },
        "&.Mui-disabled": {
          backgroundColor: "background.paper",
          opacity: 0.4,
        },
      }}
    >
      {left ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
}
