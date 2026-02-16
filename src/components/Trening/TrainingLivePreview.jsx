// TrainingLivePreview.jsx

import {
  Paper,
  Typography,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export default function TrainingLivePreview({ name, exercises }) {
  const hasContent = name.trim() || exercises.length > 0;

  if (!hasContent) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FitnessCenterIcon sx={{ fontSize: 48, opacity: 0.2, mb: 1 }} />
        <Typography color="text.secondary">
          Zacznij pisać żeby zobaczyć podgląd
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, height: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2, opacity: 0.6 }}>
        👁️ Podgląd
      </Typography>

      {/* Nazwa */}
      {name.trim() && (
        <Typography variant="h5" color="primary" gutterBottom>
          {name}
        </Typography>
      )}

      {exercises.length > 0 && (
        <>
          <Divider sx={{ my: 1.5 }} />

          <List dense disablePadding>
            {exercises.map((ex, i) => (
              <ListItem key={i} disableGutters sx={{ py: 0.3 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Chip
                    label={i + 1}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ width: 24, height: 24, fontSize: "0.75rem" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={ex}
                  primaryTypographyProps={{ fontSize: "0.9rem" }}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1.5 }} />

          <Stack direction="row" spacing={1}>
            <Chip
              icon={<FitnessCenterIcon />}
              label={`${exercises.length} ćwiczeń`}
              color="primary"
              size="small"
              variant="outlined"
            />
          </Stack>
        </>
      )}
    </Paper>
  );
}
