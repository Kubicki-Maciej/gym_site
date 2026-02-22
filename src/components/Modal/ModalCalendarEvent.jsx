import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
  Timer as DurationIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ModalCalendarEvent({ open, onClose, eventData }) {
  const naviagte = useNavigate();
  if (!eventData) return null;

  const { id, title, start, end, extendedProps = {} } = eventData;
  const { userId, duration, email } = extendedProps;

  // Formatowanie daty i czasu
  const formatDate = dateString => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = dateString => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div" fontWeight="bold">
          Szczegóły treningu
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="zamknij">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* Content */}
      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          {/* Użytkownik */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Uczestnik
              </Typography>
              <Typography variant="subtitle1" fontWeight="medium">
                {title || "Brak nazwy"}
              </Typography>
            </Box>
          </Box>

          {/* Data */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <CalendarIcon />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Data
              </Typography>
              <Typography variant="subtitle1" fontWeight="medium">
                {formatDate(start)}
              </Typography>
            </Box>
          </Box>

          {/* Godzina */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "info.main" }}>
              <TimeIcon />
            </Avatar>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Godzina
              </Typography>
              <Typography variant="subtitle1" fontWeight="medium">
                {formatTime(start)} - {formatTime(end)}
              </Typography>
            </Box>
          </Box>

          {/* Czas trwania */}
          {duration && (
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "success.main" }}>
                <DurationIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Czas trwania
                </Typography>
                <Typography variant="subtitle1" fontWeight="medium">
                  {duration} minut
                </Typography>
              </Box>
            </Box>
          )}

          {/* Email (jeśli dostępny) */}
          {email && (
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "warning.main" }}>
                <EmailIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="subtitle1" fontWeight="medium">
                  {email}
                </Typography>
              </Box>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <Divider />

      {/* Actions */}
      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            // Tutaj możesz dodać logikę usuwania
          }}
        >
          Usuń
        </Button>
        <Stack direction="row" spacing={1}>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Zamknij
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              naviagte(`/training/details/${id}`);
            }}
          >
            Przejdź do treningu
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
