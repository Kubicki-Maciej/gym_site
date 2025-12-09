import { useState, useEffect } from "react";
import { useUserContext } from "../User/context";
import useTraining from "../Trening/hooks/useTraining";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
// import StudentTrainingListItem
import StudentTrainingListItem from "./StudentTrainingListItem";

// ✅ FORMAT HELPER
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export default function StudentTrainingsScreen() {
  const { selectedUser } = useUserContext();
  const { loading, error, getUserTrainingsInDateRange } = useTraining();

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
  const [endDate, setEndDate] = useState(formatDate(lastDayOfMonth));
  const [trainings, setTrainings] = useState([]);

  // ✅ LOAD TRAININGS
  useEffect(() => {
    if (!selectedUser?.id || !startDate || !endDate) {
      return;
    }
    loadTrainings();
  }, [selectedUser?.id, startDate, endDate]);

  const loadTrainings = async () => {
    try {
      const data = await getUserTrainingsInDateRange(selectedUser.id, {
        start_date: startDate,
        end_date: endDate,
      });
      setTrainings(data?.data || data || []);
    } catch (err) {
      console.error("Error loading trainings:", err);
    }
  };

  const handleDateChange = () => {
    if (startDate && endDate && startDate <= endDate) {
      loadTrainings();
    }
  };

  const handlePreviousMonth = () => {
    const firstOfCurrentMonth = new Date(startDate + "T00:00:00");
    firstOfCurrentMonth.setDate(1);

    const lastOfPrevMonth = new Date(firstOfCurrentMonth);
    lastOfPrevMonth.setDate(lastOfPrevMonth.getDate() - 1);

    const firstOfPrevMonth = new Date(
      lastOfPrevMonth.getFullYear(),
      lastOfPrevMonth.getMonth(),
      1
    );

    const newStart = formatDate(firstOfPrevMonth);
    const newEnd = formatDate(lastOfPrevMonth);

    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const handleNextMonth = () => {
    const lastOfCurrentMonth = new Date(endDate + "T00:00:00");
    lastOfCurrentMonth.setMonth(lastOfCurrentMonth.getMonth() + 1);
    lastOfCurrentMonth.setDate(0);

    const firstOfNextMonth = new Date(lastOfCurrentMonth);
    firstOfNextMonth.setDate(firstOfNextMonth.getDate() + 1);

    const lastOfNextMonth = new Date(
      firstOfNextMonth.getFullYear(),
      firstOfNextMonth.getMonth() + 1,
      0
    );

    const newStart = formatDate(firstOfNextMonth);
    const newEnd = formatDate(lastOfNextMonth);

    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const handleStartDateChange = e => {
    const newStart = e.target.value;
    setStartDate(newStart);

    if (newStart > endDate) {
      setEndDate(newStart); // Ustaw końcową na tę samą
    }
  };

  const handleEndDateChange = e => {
    const newEnd = e.target.value;

    if (newEnd < startDate) {
      return; // Nic nie rób
    }

    setEndDate(newEnd);
  };

  if (!selectedUser) {
    return (
      <Alert severity="info">
        Wybierz studenta, aby zobaczyć jego treningi
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
        📅 Treningi - {selectedUser.name}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Data początkowa"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            label="Data końcowa"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            inputProps={{
              min: startDate,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            onClick={handleDateChange}
            fullWidth
            sx={{ height: "56px" }}
          >
            Szukaj
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mb: 3, justifyContent: "center" }}>
        <Button variant="outlined" onClick={handlePreviousMonth}>
          ← Poprzedni miesiąc
        </Button>
        <Button variant="outlined" onClick={handleNextMonth}>
          Następny miesiąc →
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && trainings.length > 0 ? (
        <Box>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Znaleziono {trainings.length} treningów
          </Typography>

          <List>
            {trainings.map(training => (
              <StudentTrainingListItem key={training.id} training={training} />
            ))}
          </List>
        </Box>
      ) : (
        !loading && (
          <Alert severity="info">Brak treningów w wybranym zakresie</Alert>
        )
      )}
    </Paper>
  );
}
