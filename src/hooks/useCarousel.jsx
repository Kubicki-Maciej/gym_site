import { useState } from "react";

export const useCarousel = (items, itemsPerPage = 3) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, items.length - itemsPerPage);

  const goNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const goPrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerPage);

  return {
    visibleItems,
    currentIndex,
    goNext,
    goPrev,
    hasNext: currentIndex < maxIndex,
    hasPrev: currentIndex > 0,
    totalItems: items.length,
  };
};
