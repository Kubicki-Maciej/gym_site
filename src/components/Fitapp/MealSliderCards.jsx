import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MealCard from "./MealCard";

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
    return <div>Brak posiłków</div>;
  }

  const maxIdx = instanceRef.current?.track.details?.maxIdx ?? 0;

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {filteredMeals.map(meal => (
          <div key={meal.id} className="keen-slider__slide flex">
            <MealCard name={meal.name} onClick={() => onMealClick(meal)} />
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
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(maxIdx + 1).keys()].map(idx => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === idx ? "bg-black scale-110" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Arrow({ left, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute top-1/2 -translate-y-1/2 z-10
        w-10 h-10 rounded-full bg-white shadow-md
        flex items-center justify-center
        transition
        ${left ? "left-2" : "right-2"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}
      `}
      aria-label={left ? "Previous slide" : "Next slide"}
    >
      {left ? "←" : "→"}
    </button>
  );
}
