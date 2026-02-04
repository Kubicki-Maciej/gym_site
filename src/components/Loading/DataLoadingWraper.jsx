import React from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Typography, Alert, AlertTitle } from "@mui/material";

export default function DataLoadingWrapper({
  isLoading,
  isError,
  error,
  children,
  loadingText = "Ładowanie danych...", // Domyślny tekst
}) {
  // 1. Stan Ładowania
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          width: "100%",
          minHeight: "200px", // Minimalna wysokość, żeby nie skakało
        }}
      >
        <CircularProgress size={40} thickness={4} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2, fontWeight: 500 }}
        >
          {loadingText}
        </Typography>
      </Box>
    );
  }

  // 2. Stan Błędu
  if (isError) {
    return (
      <Box sx={{ padding: 2, width: "100%" }}>
        <Alert severity="error" variant="outlined">
          <AlertTitle>Wystąpił błąd</AlertTitle>
          {error?.message || "Nie udało się pobrać danych."}
        </Alert>
      </Box>
    );
  }

  // 3. Stan Sukcesu (renderuje dzieci)
  return <>{children}</>;
}

DataLoadingWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
  error: PropTypes.object,
  children: PropTypes.node,
  loadingText: PropTypes.string,
};