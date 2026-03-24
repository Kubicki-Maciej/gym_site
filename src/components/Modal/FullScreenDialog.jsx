import React, { useState } from "react";
import {
  Stack,
  Button,
  Box,
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function FullScreenDialog({ component }) {
  const [openBodyDialog, setOpenBodyDialog] = useState(false);

  const handleOpenBodyDialog = () => setOpenBodyDialog(true);
  const handleCloseBodyDialog = () => setOpenBodyDialog(false);
  return (
    <Dialog
      open={openBodyDialog}
      onClose={handleCloseBodyDialog}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 68, 255, 0.3)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessibilityNewIcon sx={{ color: "#0044ff", fontSize: 32 }} />
          Partie ciała
        </Box>
        <IconButton
          onClick={handleCloseBodyDialog}
          sx={{
            color: "#fff",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.1)",
              transform: "rotate(90deg)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ minHeight: 200 }}>
        <component />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleCloseBodyDialog}
          variant="contained"
          sx={{
            background: "linear-gradient(45deg, #0044ff, #00aaff)",
            "&:hover": {
              background: "linear-gradient(45deg, #0033cc, #0088cc)",
            },
          }}
        >
          Zamknij
        </Button>
      </DialogActions>
    </Dialog>
  );
}
