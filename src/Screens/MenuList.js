import * as React from "react";
import { Box, Grid, Button, Typography, Paper } from "@mui/material";
import MenuCard from "../components/Cards/MenuCard";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function CreatePanelMui() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="60vh"
      px={2}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Create Your Training Panel
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" mb={4}>
        Select an option below to create new training plans or exercises for
        your clients.
      </Typography>

      <Grid container spacing={4} maxWidth="md" justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <PlaylistAddCheckIcon
              sx={{ fontSize: 50, color: "error.main", mb: 1 }}
            />
            <Typography variant="h6" gutterBottom>
              Create Training
            </Typography>
            <Button variant="contained" color="error" fullWidth>
              Create Training
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <FitnessCenterIcon
              sx={{ fontSize: 50, color: "error.main", mb: 1 }}
            />
            <Typography variant="h6" gutterBottom>
              Stwórz ćwiczenie
            </Typography>
            <Button variant="contained" color="error" fullWidth>
              Create Exercise
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <EditIcon sx={{ fontSize: 50, color: "error.main", mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Edytuj Cwiczenie
            </Typography>
            <Button variant="contained" color="error" fullWidth>
              Edit
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <EditNoteIcon sx={{ fontSize: 50, color: "error.main", mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Edytuj trening
            </Typography>
            <Button variant="contained" color="error" fullWidth>
              Edit
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              "&:hover": {
                boxShadow: 6,
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <HomeIcon sx={{ fontSize: 50, color: "error.main", mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              Go Home
            </Typography>
            <Button variant="outlined" color="error" fullWidth>
              Go Home
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
