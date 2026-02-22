import {
  Modal,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StudentExerciseItem from "components/Student/StudentExerciseItem";

export default function ModalMuscle({ open, onClose, muscle = [] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: isMobile ? 0 : 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: isMobile ? 0 : 2,
          boxShadow: 24,

          // Responsywne wymiary
          width: isMobile ? "100%" : "auto",
          minWidth: isMobile ? "100%" : 300,
          maxWidth: isMobile ? "100%" : 600,

          // Wysokość
          height: isMobile ? "100%" : "auto",
          maxHeight: isMobile ? "100%" : "90vh",

          // Przewijanie
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* HEADER - sticky */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #eee",
            bgcolor: "background.paper",
            flexShrink: 0,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6">Mięsień: {muscle?.pl_name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Liczba użyć: {muscle?.frequency}
          </Typography>
        </Box>

        {/* CONTENT - scrollable */}
        <Box
          sx={{
            p: 2,
            overflow: "auto",
            flex: 1,
            // Lepsze przewijanie na mobile
            WebkitOverflowScrolling: "touch",
          }}
        >
          {muscle.exercises?.map((exercise, index) =>
            exercise.trainings?.map((training, tIndex) => (
              <StudentExerciseItem
                showName={true}
                key={`${index}-${tIndex}`}
                exercise={{
                  name: exercise.exercise_name,
                  date: training.date,
                  sets: training.sets,
                }}
              />
            )),
          )}
        </Box>
      </Box>
    </Modal>
  );
}
