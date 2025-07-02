import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Snackbar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SaveIcon from "@mui/icons-material/Save";

export default function TrainingForm() {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddExercise = () => {
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600}>
            Tworzenie treningu
          </Typography>

          <TextField label="Nazwa treningu" variant="outlined" fullWidth />

          <TextField
            label="Komentarz do treningu"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            helperText="Dodaj notatki do treningu, np. cel lub uwagi."
          />

          <TextField
            label="Wyszukaj ćwiczenie do dodania"
            variant="outlined"
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddExercise}
            size="large"
          >
            Dodaj ćwiczenie do treningu
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            size="large"
          >
            Utwórz trening
          </Button>

          <Button
            variant="outlined"
            color="success"
            startIcon={<FitnessCenterIcon />}
            size="large"
          >
            Stwórz nowe ćwiczenie
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Dodano ćwiczenie do treningu"
      />
    </Container>
  );
}
