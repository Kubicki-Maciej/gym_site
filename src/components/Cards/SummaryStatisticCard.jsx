import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Paper,
  Divider,
  Stack,
  Skeleton,
} from "@mui/material";
import {
  FitnessCenter,
  TrendingUp,
  EmojiEvents,
  CalendarToday,
  Repeat,
  Scale,
} from "@mui/icons-material";

// --- Mała karta statystyki ---
const StatCard = ({ icon, label, value, color = "#1976d2", subtitle }) => (
  <Card
    elevation={0}
    sx={{
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 3,
      height: "100%",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 4,
      },
    }}
  >
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
        <Box
          sx={{
            bgcolor: `${color}15`,
            borderRadius: 2,
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {React.cloneElement(icon, {
            sx: { color, fontSize: 24 },
          })}
        </Box>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="h4" fontWeight={700} color={color}>
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

// --- Skeleton Loading ---
const LoadingSkeleton = () => (
  <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
    <Stack direction="row" alignItems="center" spacing={2} mb={4}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box>
        <Skeleton variant="text" width={200} height={32} />
        <Skeleton variant="text" width={150} height={20} />
      </Box>
    </Stack>

    <Skeleton variant="rounded" height={100} sx={{ borderRadius: 3, mb: 3 }} />

    <Grid container spacing={2} mb={3}>
      {[1, 2, 3, 4].map(i => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} />
        </Grid>
      ))}
    </Grid>

    <Skeleton variant="rounded" height={150} sx={{ borderRadius: 3 }} />
  </Box>
);

// --- Główny komponent ---
const SummaryStatisticCard = ({ data }) => {
  // Jeśli brak danych - pokaż skeleton
  if (!data) {
    return <LoadingSkeleton />;
  }

  const {
    start_weight,
    last_weight,
    avg_weight,
    progress_kg,
    progress_percentage,
    max,
  } = data;

  // Normalizacja progresu do 100% na pasku
  const normalizedProgress = Math.min(progress_percentage, 100);

  // Formatowanie daty
  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {/* ===== HEADER ===== */}
      <Stack direction="row" alignItems="center" spacing={2} mb={4}>
        <FitnessCenter sx={{ fontSize: 32, color: "primary.main" }} />
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Postęp ćwiczenia
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Twoje statystyki treningowe
          </Typography>
        </Box>
      </Stack>

      {/* ===== PROGRESS BAR SECTION ===== */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body2" fontWeight={600}>
            {start_weight} kg
          </Typography>
          <Chip
            icon={<TrendingUp />}
            label={`+${progress_kg} kg (${progress_percentage}%)`}
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Typography variant="body2" fontWeight={600}>
            {last_weight} kg
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={normalizedProgress}
          sx={{
            height: 12,
            borderRadius: 6,
            bgcolor: "grey.300",
            "& .MuiLinearProgress-bar": {
              borderRadius: 6,
              background: "linear-gradient(90deg, #4caf50, #2196f3)",
            },
          }}
        />

        <Stack direction="row" justifyContent="space-between" mt={0.5}>
          <Typography variant="caption" color="text.secondary">
            Start
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Ostatni trening
          </Typography>
        </Stack>
      </Paper>

      {/* ===== STAT CARDS GRID ===== */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Scale />}
            label="Waga startowa"
            value={`${start_weight} kg`}
            color="#9e9e9e"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<FitnessCenter />}
            label="Ostatnia waga"
            value={`${last_weight} kg`}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingUp />}
            label="Średnia waga"
            value={`${avg_weight} kg`}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingUp />}
            label="Progres"
            value={`+${progress_kg} kg`}
            color="#4caf50"
            subtitle={`${progress_percentage}% wzrostu`}
          />
        </Grid>
      </Grid>

      {/* ===== MAX / REKORD SECTION ===== */}
      {max && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "2px solid",
            borderColor: "#ffd700",
            background: "linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <EmojiEvents sx={{ color: "#ffa000", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700} color="#b8860b">
              Rekord osobisty
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Stack alignItems="center">
                <FitnessCenter sx={{ color: "#ffa000", mb: 0.5 }} />
                <Typography variant="h5" fontWeight={700}>
                  {max.weight} kg
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Waga
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack alignItems="center">
                <Repeat sx={{ color: "#ffa000", mb: 0.5 }} />
                <Typography variant="h5" fontWeight={700}>
                  {max.repeats}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Powtórzenia
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack alignItems="center">
                <CalendarToday sx={{ color: "#ffa000", mb: 0.5 }} />
                <Typography variant="h5" fontWeight={700}>
                  {formatDate(max.date)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Data
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default SummaryStatisticCard;
