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
  Typography,
  Paper,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import StudentTrainingListItem from "./StudentTrainingListItem";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonthName(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("pl-PL", { month: "long", year: "numeric" });
}

export default function StudentTrainingsScreen({ client = false }) {
  const { selectedUser, user } = useUserContext();
  const { loading, error, getUserTrainingsInDateRange } = useTraining();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  formatDate(firstDayOfMonth);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
  const [endDate, setEndDate] = useState(formatDate(lastDayOfMonth));
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    if (client) {
      if (!user?.id || !startDate || !endDate) {
        return;
      }
      loadTrainings(user.id);
    } else {
      if (!selectedUser?.id || !startDate || !endDate) {
        return;
      }
      loadTrainings(selectedUser.id);
    }
  }, [selectedUser?.id, , startDate, endDate]);

  const loadTrainings = async id => {
    try {
      const data = await getUserTrainingsInDateRange(id, {
        start_date: startDate,
        end_date: endDate,
      });
      setTrainings(data?.data || data || []);
    } catch (err) {
      console.error("Error loading trainings:", err);
    }
  };

  const handlePreviousMonth = () => {
    const firstOfCurrentMonth = new Date(endDate + "T00:00:00");
    firstOfCurrentMonth.setDate(1);

    const lastOfPrevMonth = new Date(firstOfCurrentMonth);
    lastOfPrevMonth.setDate(lastOfPrevMonth.getDate() - 1);

    const firstOfPrevMonth = new Date(
      lastOfPrevMonth.getFullYear(),
      lastOfPrevMonth.getMonth(),
      1
    );

    setStartDate(formatDate(firstOfPrevMonth));
    setEndDate(formatDate(lastOfPrevMonth));
  };

  const handleNextMonth = () => {
    const lastOfCurrentMonth = new Date(startDate + "T00:00:00");
    lastOfCurrentMonth.setMonth(lastOfCurrentMonth.getMonth() + 1);
    lastOfCurrentMonth.setDate(0);

    const firstOfNextMonth = new Date(lastOfCurrentMonth);
    firstOfNextMonth.setDate(firstOfNextMonth.getDate() + 1);

    const lastOfNextMonth = new Date(
      firstOfNextMonth.getFullYear(),
      firstOfNextMonth.getMonth() + 1,
      0
    );

    setStartDate(formatDate(firstOfNextMonth));
    setEndDate(formatDate(lastOfNextMonth));
  };

  const handleStartDateChange = e => {
    const newStart = e.target.value;
    setStartDate(newStart);
    if (newStart > endDate) {
      setEndDate(newStart);
    }
  };

  const handleEndDateChange = e => {
    const newEnd = e.target.value;
    if (newEnd >= startDate) {
      setEndDate(newEnd);
    }
  };
  if (client) {
  } else {
    if (!selectedUser) {
      return (
        <Alert severity="info" sx={{ m: 1 }}>
          Wybierz studenta, aby zobaczyć jego treningi
        </Alert>
      );
    }
  }

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2, md: 3 },
        mx: { xs: 0.5, sm: 1 },
        my: 1,
      }}
    >
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: { xs: "1rem", sm: "1.25rem" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        📅 Treningi - {selectedUser ? selectedUser.name : user.first_name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 1, sm: 2 },
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        {isMobile ? (
          <>
            <IconButton
              onClick={handlePreviousMonth}
              color="primary"
              size="large"
              sx={{
                border: 1,
                borderColor: "primary.main",
              }}
            >
              <NavigateBefore />
            </IconButton>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "medium",
                minWidth: 140,
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              {getMonthName(startDate)}
            </Typography>

            <IconButton
              onClick={handleNextMonth}
              color="primary"
              size="large"
              sx={{
                border: 1,
                borderColor: "primary.main",
              }}
            >
              <NavigateNext />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={handlePreviousMonth}
              startIcon={<ChevronLeft />}
            >
              Poprzedni miesiąc
            </Button>

            <Typography
              variant="body1"
              sx={{
                fontWeight: "medium",
                px: 2,
                textTransform: "capitalize",
              }}
            >
              {getMonthName(startDate)}
            </Typography>

            <Button
              variant="outlined"
              onClick={handleNextMonth}
              endIcon={<ChevronRight />}
            >
              Następny miesiąc
            </Button>
          </>
        )}
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1.5, sm: 2 }}
        sx={{ mb: 2 }}
        justifyContent="center"
      >
        <TextField
          label="Od"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          InputLabelProps={{ shrink: true }}
          size={isMobile ? "small" : "medium"}
          sx={{
            minWidth: { xs: "100%", sm: 180 },
            maxWidth: { sm: 200 },
          }}
        />

        <TextField
          label="Do"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          InputLabelProps={{ shrink: true }}
          size={isMobile ? "small" : "medium"}
          inputProps={{ min: startDate }}
          sx={{
            minWidth: { xs: "100%", sm: 180 },
            maxWidth: { sm: 200 },
          }}
        />
      </Stack>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress size={isMobile ? 30 : 40} />
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
          }}
        >
          {error}
        </Alert>
      )}

      {!loading && trainings.length > 0 ? (
        <Box>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              mb: 1.5,
              textAlign: { xs: "center", sm: "left" },
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Znaleziono {trainings.length} treningów
          </Typography>

          <List
            sx={{
              p: 0,
              "& .MuiListItem-root": {
                px: { xs: 0.5, sm: 2 },
              },
            }}
          >
            {trainings.map(training => (
              <StudentTrainingListItem key={training.id} training={training} />
            ))}
          </List>
        </Box>
      ) : (
        !loading && (
          <Alert
            severity="info"
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            Brak treningów w wybranym zakresie
          </Alert>
        )
      )}
    </Paper>
  );
}
