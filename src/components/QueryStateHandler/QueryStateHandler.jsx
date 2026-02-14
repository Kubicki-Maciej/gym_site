import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SnackbarAlert from "../Alerts/SnackbarAlert";

export default function QueryStateHandler({
  isLoading,
  isError,
  error,
  children,
}) {
  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight={200}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      {isError && (
        <SnackbarAlert
          open={true}
          severity="error"
          message={error?.message || "Wystąpił nieoczekiwany błąd"}
        />
      )}

      {!isError && children}
    </>
  );
}
