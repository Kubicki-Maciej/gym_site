import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
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


const StatCard = ({ icon, label, value, color = "#1976d2", subtitle }) => (
  <Card
    elevation={0}
    sx={{
      border: "1px solid",
      borderColor: "divider",
      borderRadius: 3,
      width: "100%",
      height: "100%",
      minHeight: 140,
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 4,
      },
    }}
  >
    <CardContent
      sx={{
        p: { xs: 1.5, sm: 2 },
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box
          sx={{
            bgcolor: `${color}15`,
            borderRadius: 2,
            p: { xs: 0.75, sm: 1 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 1.5,
            flexShrink: 0,
          }}
        >
          {React.cloneElement(icon, {
            sx: { color, fontSize: { xs: 20, sm: 24 } },
          })}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={500}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            wordBreak: "break-word",
            flexGrow: 1,
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          color={color}
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);

// --- Skeleton Loading ---
const LoadingSkeleton = () => (
  <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, sm: 3 } }}>
    <Stack direction="row" alignItems="center" spacing={2} mb={4}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box>
        <Skeleton variant="text" width={200} height={32} />
        <Skeleton variant="text" width={150} height={20} />
      </Box>
    </Stack>

    <Skeleton variant="rounded" height={100} sx={{ borderRadius: 3, mb: 3 }} />

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },
        gap: 2,
        mb: 3,
      }}
    >
      {[1, 2, 3, 4].map(i => (
        <Skeleton
          key={i}
          variant="rounded"
          height={140}
          sx={{ borderRadius: 3 }}
        />
      ))}
    </Box>

    <Skeleton variant="rounded" height={150} sx={{ borderRadius: 3 }} />
  </Box>
);

// --- Główny komponent ---
const SummaryStatisticCard = ({ data }) => {
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

  const normalizedProgress = Math.min(progress_percentage, 100);

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Dane do kart statystyk
  const statsData = [
    {
      icon: <Scale />,
      label: "Waga startowa",
      value: `${start_weight} kg`,
      color: "#9e9e9e",
    },
    {
      icon: <FitnessCenter />,
      label: "Ostatnia waga",
      value: `${last_weight} kg`,
      color: "#1976d2",
    },
    {
      icon: <TrendingUp />,
      label: "Średnia waga",
      value: `${avg_weight} kg`,
      color: "#ff9800",
    },
    {
      icon: <TrendingUp />,
      label: "Progres",
      value: `+${progress_kg} kg`,
      color: "#4caf50",
      subtitle: `${progress_percentage}% wzrostu`,
    },
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, sm: 3 } }}>
      {/* ===== HEADER ===== */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <FitnessCenter
          sx={{ fontSize: { xs: 28, sm: 32 }, color: "primary.main" }}
        />
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
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
          p: { xs: 2, sm: 3 },
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
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="body2" fontWeight={600}>
            {start_weight} kg
          </Typography>
          <Chip
            icon={<TrendingUp />}
            label={`+${progress_kg} kg (${progress_percentage}%)`}
            color="success"
            size="small"
            sx={{
              fontWeight: 600,
              order: { xs: 3, sm: 0 },
              mt: { xs: 1, sm: 0 },
            }}
          />
          <Typography variant="body2" fontWeight={600}>
            {last_weight} kg
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={normalizedProgress}
          sx={{
            height: { xs: 10, sm: 12 },
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 1.5, sm: 2 },
          mb: 3,
        }}
      >
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Box>

      {/* ===== MAX / REKORD SECTION ===== */}
      {max && (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            border: "2px solid",
            borderColor: "#ffd700",
            background: "linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <EmojiEvents
              sx={{ color: "#ffa000", fontSize: { xs: 24, sm: 28 } }}
            />
            <Typography
              variant="h6"
              fontWeight={700}
              color="#b8860b"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Rekord osobisty
            </Typography>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            <Stack alignItems="center">
              <FitnessCenter
                sx={{
                  color: "#ffa000",
                  mb: 0.5,
                  fontSize: { xs: 20, sm: 24 },
                }}
              />
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" } }}
              >
                {max.weight} kg
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
              >
                Waga
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Repeat
                sx={{
                  color: "#ffa000",
                  mb: 0.5,
                  fontSize: { xs: 20, sm: 24 },
                }}
              />
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" } }}
              >
                {max.repeats}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
              >
                Powtórzenia
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <CalendarToday
                sx={{
                  color: "#ffa000",
                  mb: 0.5,
                  fontSize: { xs: 20, sm: 24 },
                }}
              />
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ fontSize: { xs: "0.9rem", sm: "1.5rem" } }}
              >
                {formatDate(max.date)}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
              >
                Data
              </Typography>
            </Stack>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SummaryStatisticCard;
