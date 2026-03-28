import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useCreateUserTraining } from "hooks/Training/useCreateUserTraining";

export default function CreateTrainingButton({
  userId,
  selectedDate,
  onSuccess,
}) {
  const {
    mutate: createTraining,
    isPending,
    isError,
    error,
  } = useCreateUserTraining();

  const handleCreateTraining = () => {
    const trainingDateTime = new Date(selectedDate);
    trainingDateTime.setHours(10, 0, 0, 0);

    const payload = {
      user: userId,
      training_date: trainingDateTime.toISOString(),
      created_by: userId,
      duration: 60,
    };

    createTraining(payload, {
      onSuccess: response => {
        console.log("Trening utworzony:", response);
        if (onSuccess) {
          onSuccess(response.data);
        }
      },
      onError: err => {
        console.error("Błąd tworzenia treningu:", err);
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        gap: 2,
      }}
    >
      <p>Brak twoich treningów tego dnia</p>

      <Button
        variant="contained"
        color="primary"
        startIcon={
          isPending ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <AddIcon />
          )
        }
        onClick={handleCreateTraining}
        disabled={isPending || !selectedDate}
      >
        {isPending ? "Tworzenie..." : "Stwórz trening"}
      </Button>

      {isError && (
        <Box sx={{ color: "error.main", mt: 1 }}>
          Błąd:{" "}
          {error?.response?.data?.detail ||
            error?.message ||
            "Nie udało się utworzyć treningu"}
        </Box>
      )}
    </Box>
  );
}
