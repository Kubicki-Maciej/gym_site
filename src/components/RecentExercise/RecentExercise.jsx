import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import useTraining from "../Trening/hooks/useTraining";

export default function RecentExercise({ exerciseId, trainingObject }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [recentExercise, setRecentExercise] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { error, loading, getUserRecentExercise } = useTraining();

  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const res = await getUserRecentExercise(
          trainingObject.user || null,
          exerciseId,
          trainingObject.id
        );
        setRecentExercise(res.exercises_series);
      } catch (e) {
        console.error("Błąd pobierania ćwiczeń:", e);
      }
    };
    fetchAllExercises();
  }, [trainingObject.user, exerciseId, getUserRecentExercise]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (loading) return <CircularProgress size={20} />;
  if (error || !recentExercise.length) return null;

  return (
    <>
      {/* Ikona przycisk */}
      <IconButton
        onClick={handleOpenModal}
        sx={{
          background: "linear-gradient(135deg, #ff9500 0%, #ffb74d 100%)",
          color: "white",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 12px rgba(255, 149, 0, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #ffb74d 0%, #ffc107 100%)",
            boxShadow: "0 6px 16px rgba(255, 149, 0, 0.4)",
            transform: "scale(1.1)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <FitnessCenterIcon />
      </IconButton>

      {/* Modal z treningami */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="xs"
        fullWidth
        // fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
          Historia serii
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={1.5}>
            {recentExercise.map((exercise, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  p: 1.5,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1.5,
                  borderLeft: "4px solid #ff9500",
                }}
              >
                <Chip
                  label={`S${index + 1}`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 149, 0, 0.1)",
                    color: "#ff9500",
                    fontWeight: 600,
                    minWidth: 45,
                  }}
                />

                <Stack direction="row" spacing={3} sx={{ flex: 1 }}>
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: "block", mb: 0.25 }}
                    >
                      Waga
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {exercise.weight}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: "block", mb: 0.25 }}
                    >
                      Powtórzenia
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {exercise.repeats}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(135deg, #ff9500 0%, #ffb74d 100%)",
            }}
          >
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
