// src/features/students/components/StudentCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { PersonAdd, PersonRemove } from "@mui/icons-material";

export const StudentCard = ({
  student,
  isAdded = false,
  onAdd,
  onRemove,
  loading = false,
}) => {
  const fullName =
    `${student.first_name} ${student.last_name}`.trim() || student.email;

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3">
          {fullName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<PersonAdd />}
          onClick={() => onAdd(student.id)}
          disabled={loading}
        >
          Dodaj
        </Button>
      </CardActions>
    </Card>
  );
};
