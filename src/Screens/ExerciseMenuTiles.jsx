import * as React from "react";
import { Box, Grid, Button, Typography, Paper } from "@mui/material";
import MenuCard from "../components/Cards/MenuCard";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function ExerciseMenuList() {
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
        <MenuCard
          Icon={PlaylistAddCheckIcon}
          text={"Stwórz trening"}
          btnText={"Stwórz trening"}
          colorFullBoolean={true}
          path={"create/trening/"}
        />
        <MenuCard
          Icon={FitnessCenterIcon}
          text={"Stwórz ćwiczenie"}
          btnText={"Stwórz ćwiczenie"}
          colorFullBoolean={true}
          path={"create/exercise"}
        />
        <MenuCard
          Icon={EditIcon}
          text={"Edytuj Cwiczenie"}
          btnText={"Edytuj Cwiczenie"}
          colorFullBoolean={false}
          path={"edit/exercise"}
        />
        <MenuCard
          Icon={EditNoteIcon}
          text={"Edytuj trening"}
          btnText={"Edytuj trening"}
          colorFullBoolean={false}
          path={"edit/trening"}
        />
      </Grid>
    </Box>
  );
}
