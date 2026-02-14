import { useState, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { StatusAlertService } from "react-status-alert";
import useTraining from "./useTraining";

export default function useSerieRow(initialSerie) {
  const [serie, setSerie] = useState(initialSerie);
  const saveTimeoutRef = useRef(null);
  const { updateExercise } = useTraining();
  console.log("initial s", initialSerie);

  const updateSerieMutation = useMutation({
    mutationFn: ({ serieId, payload }) => updateExercise(serieId, payload),
    onError: () => StatusAlertService.showError("❌ Błąd zapisu serii"),
  });

  const updateSerieDebounced = useCallback(
    (field, value) => {
      setSerie(prev => ({ ...prev, [field]: value }));

      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      saveTimeoutRef.current = setTimeout(() => {
        updateSerieMutation.mutate({
          serieId: serie.id,
          payload: { [field]: value },
        });
      }, 1200);
    },
    [serie.id, updateSerieMutation],
  );

  const adJustSerie = useCallback(
    (field, delta) => {
      const newValue = Math.max(0, (serie[field] || 0) + delta);
      updateSerieDebounced(field, newValue);
    },
    [serie, updateSerieDebounced],
  );

  return { serie, updateSerieDebounced, adJustSerie, setSerie };
}
