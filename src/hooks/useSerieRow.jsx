// hooks/useSerieRow.js
import { useState, useRef, useCallback, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { StatusAlertService } from "react-status-alert";
import useTraining from "./useTraining";

export default function useSerieRow(initialSerie, onSerieUpdate) {
  const [serie, setSerie] = useState(initialSerie);
  const saveTimeoutRef = useRef(null);
  const { updateExercise } = useTraining();

  // ✅ Synchronizuj z initialSerie gdy się zmieni z zewnątrz
  useEffect(() => {
    setSerie(initialSerie);
  }, [initialSerie]);

  const updateSerieMutation = useMutation({
    mutationFn: ({ serieId, payload }) => updateExercise(serieId, payload),
    onSuccess: (_, variables) => {
      // ✅ Po udanym zapisie powiadom parent
      if (onSerieUpdate) {
        onSerieUpdate(variables.serieId, variables.payload);
      }
    },
    onError: () => StatusAlertService.showError("❌ Błąd zapisu serii"),
  });

  const updateSerieDebounced = useCallback(
    (field, value) => {
      // Aktualizuj lokalny stan natychmiast
      setSerie(prev => ({ ...prev, [field]: value }));

      if (onSerieUpdate) {
        onSerieUpdate(serie.id, { [field]: value });
      }

      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      saveTimeoutRef.current = setTimeout(() => {
        updateSerieMutation.mutate({
          serieId: serie.id,
          payload: { [field]: value },
        });
      }, 1200);
    },
    [serie.id, updateSerieMutation, onSerieUpdate],
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
