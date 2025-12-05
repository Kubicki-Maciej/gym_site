import { useState, useEffect } from 'react';
import { useUserContext } from "../User/context";

import useTraining from '../Trening/hooks/useTraining';
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

export default function StudentTrainingsScreen(){
const { selectedUser } = useUserContext();
  const { loading, error, getUserTrainingsInDateRange } = useTraining();

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
  const [endDate, setEndDate] = useState(formatDate(lastDayOfMonth));
  const [trainings, setTrainings] = useState([]);

  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  // Wczytaj treningi
  const loadTrainings = async () => {
    if (selectedUser?.id) {
      const data = await getUserTrainingsInDateRange(selectedUser.id, {
        start_date: startDate,
        end_date: endDate,
      });
      setTrainings(data?.data || data || []);
    }
  };

  useEffect(() => {
    loadTrainings();
  }, [selectedUser?.id]);

  const handleDateChange = () => {
    if (startDate && endDate) {
      loadTrainings();
    }
  };

  const handlePreviousMonth = () => {
    const newEnd = new Date(startDate);
    newEnd.setDate(newEnd.getDate() - 1);
    
    const newStart = new Date(newEnd.getFullYear(), newEnd.getMonth(), 1);
    
    setStartDate(formatDate(newStart));
    setEndDate(formatDate(newEnd));
  };

  const handleNextMonth = () => {
    const newStart = new Date(endDate);
    newStart.setDate(newStart.getDate() + 1);
    
    const newEnd = new Date(newStart.getFullYear(), newStart.getMonth() + 1, 0);
    
    setStartDate(formatDate(newStart));
    setEndDate(formatDate(newEnd));
  };

  useEffect(() => {
    if (startDate && endDate) {
      loadTrainings();
    }
  }, [startDate, endDate]);

  if (!selectedUser) {
    return (
      <Alert severity="info">
        Wybierz studenta, aby zobaczyć jego treningi
      </Alert>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        📅 Treningi - {selectedUser.name}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Data początkowa"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            label="Data końcowa"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            onClick={handleDateChange}
            fullWidth
            sx={{ height: '56px' }}
          >
            Szukaj
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
        <Button variant="outlined" onClick={handlePreviousMonth}>
          ← Poprzedni miesiąc
        </Button>
        <Button variant="outlined" onClick={handleNextMonth}>
          Następny miesiąc →
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
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
            {trainings.map((training) => (
              <ListItem
                key={training.id}
                sx={{
                  mb: 1,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {training.training_name || 'Trening'}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        📅 Data: {new Date(training.training_date).toLocaleDateString('pl-PL')}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ⏰ Czas: {training.training_time || 'Brak informacji'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        💪 Ćwiczenia: {training.exercises_count || 0}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        !loading && (
          <Alert severity="info">
            Brak treningów w wybranym zakresie dat
          </Alert>
        )
      )}
    </Paper>
  );
}