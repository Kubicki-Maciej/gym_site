import React from "react";
import { Card, CardContent, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ExerciseCard = ({ name, onRemove }) => (
  <Card
    sx={{
      position: "relative",
      width: 200,
      aspectRatio: "4 / 3",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      m: 1,
    }}
    elevation={3}
  >
    <IconButton
      size="small"
      onClick={onRemove}
      sx={{ position: "absolute", top: 8, right: 8 }}
      aria-label="Usuń ćwiczenie"
    >
      <CloseIcon />
    </IconButton>
    <CardContent>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" align="center">
          {name}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default ExerciseCard;
